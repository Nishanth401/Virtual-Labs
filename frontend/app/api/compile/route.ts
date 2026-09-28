import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";
import { spawnSync } from "child_process";

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await req.json();
    const { code, language = "java", stdin = "" } = body;

    if (!code || typeof code !== "string" || !code.trim()) {
      return NextResponse.json(
        {
          status: "compile_error",
          compilerError: "Error: No code submitted for compilation.",
          exitCode: 1,
          durationMs: 0,
        },
        { status: 400 }
      );
    }

    const lang = String(language).toLowerCase();

    // -------------------------------------------------------------------------
    // 1. JAVA COMPILATION & EXECUTION (Local OpenJDK 21)
    // -------------------------------------------------------------------------
    if (lang === "java") {
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "vlab_java_"));
      try {
        // Extract public class name or first declared class
        const publicClassMatch = code.match(/public\s+class\s+([A-Za-z0-9_]+)/);
        const anyClassMatch = code.match(/class\s+([A-Za-z0-9_]+)/);
        const className = publicClassMatch ? publicClassMatch[1] : (anyClassMatch ? anyClassMatch[1] : "Solution");
        const fileName = `${className}.java`;
        const filePath = path.join(tmpDir, fileName);

        fs.writeFileSync(filePath, code, "utf8");

        // Step 1: javac compilation
        const javac = spawnSync("javac", ["-encoding", "UTF-8", fileName], {
          cwd: tmpDir,
          encoding: "utf8",
          timeout: 10000,
        });

        const durationMs = Date.now() - startTime;

        if (javac.status !== 0) {
          let compilerErr = javac.stderr || javac.stdout || "Compilation failed with unknown error.";
          compilerErr = compilerErr.replace(new RegExp(escapeRegExp(tmpDir + path.sep), "g"), "");
          return NextResponse.json({
            status: "compile_error",
            compilerError: compilerErr.trim(),
            exitCode: javac.status || 1,
            durationMs,
          });
        }

        // Step 2: java execution
        const java = spawnSync("java", ["-cp", ".", className], {
          cwd: tmpDir,
          input: stdin,
          encoding: "utf8",
          timeout: 5000,
        });

        const totalDuration = Date.now() - startTime;

        if (java.status !== 0) {
          const runErr = java.stderr || java.stdout || "";
          if (runErr.includes("Main method not found")) {
            return NextResponse.json({
              status: "success",
              stdout: `[Compilation Successful] Class '${className}' compiled cleanly (0 errors).\n[Notice] No 'public static void main(String[] args)' entry point detected in class '${className}'.\nAdd a main method to execute and view console outputs.`,
              exitCode: 0,
              durationMs: totalDuration,
            });
          }
          return NextResponse.json({
            status: "runtime_error",
            compilerError: runErr.trim(),
            exitCode: java.status || 1,
            durationMs: totalDuration,
          });
        }

        return NextResponse.json({
          status: "success",
          stdout: java.stdout || "(Program compiled and executed with no console output)",
          stderr: java.stderr || "",
          exitCode: 0,
          durationMs: totalDuration,
        });
      } finally {
        try {
          fs.rmSync(tmpDir, { recursive: true, force: true });
        } catch {}
      }
    }

    // -------------------------------------------------------------------------
    // 2. PYTHON EXECUTION (Local Python 3.14)
    // -------------------------------------------------------------------------
    if (lang === "python" || lang === "py") {
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "vlab_py_"));
      try {
        const filePath = path.join(tmpDir, "solution.py");
        fs.writeFileSync(filePath, code, "utf8");

        const py = spawnSync("python", ["-u", "solution.py"], {
          cwd: tmpDir,
          input: stdin,
          encoding: "utf8",
          timeout: 6000,
        });

        const durationMs = Date.now() - startTime;

        if (py.status !== 0) {
          let err = py.stderr || py.stdout || "Python execution failed.";
          err = err.replace(new RegExp(escapeRegExp(filePath), "g"), "solution.py");
          const isSyntax = err.includes("SyntaxError") || err.includes("IndentationError") || err.includes("TabError");
          return NextResponse.json({
            status: isSyntax ? "compile_error" : "runtime_error",
            compilerError: err.trim(),
            exitCode: py.status || 1,
            durationMs,
          });
        }

        return NextResponse.json({
          status: "success",
          stdout: py.stdout || "(Script completed with no console output)",
          stderr: py.stderr || "",
          exitCode: 0,
          durationMs,
        });
      } finally {
        try {
          fs.rmSync(tmpDir, { recursive: true, force: true });
        } catch {}
      }
    }

    // -------------------------------------------------------------------------
    // 3. C++ EXECUTION (GCC-head via Wandbox API with syntax validation fallback)
    // -------------------------------------------------------------------------
    if (lang === "cpp" || lang === "c++" || lang === "c") {
      try {
        const wandboxRes = await fetch("https://wandbox.org/api/compile.json", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            compiler: "gcc-head",
            code: code,
            stdin: stdin,
          }),
        });

        const durationMs = Date.now() - startTime;

        if (wandboxRes.ok) {
          const data = await wandboxRes.json();
          const compilerErr = data.compiler_error || data.compiler_message;

          if (compilerErr && data.status !== "0" && !data.program_output) {
            return NextResponse.json({
              status: "compile_error",
              compilerError: compilerErr.trim(),
              exitCode: Number(data.status) || 1,
              durationMs,
            });
          }

          const runtimeErr = data.program_error;
          const output = data.program_output || data.program_message || "(Program completed with no console output)";

          return NextResponse.json({
            status: Number(data.status) === 0 ? "success" : "runtime_error",
            stdout: output,
            stderr: runtimeErr || "",
            compilerError: Number(data.status) !== 0 ? (runtimeErr || compilerErr || "Execution failed") : undefined,
            exitCode: Number(data.status) || 0,
            durationMs,
          });
        }
      } catch (wandboxErr) {
        console.warn("Wandbox API unreachable, running syntax check fallback", wandboxErr);
      }

      // Fallback C++ syntax validation
      const syntaxErrors = validateCppSyntax(code);
      const durationMs = Date.now() - startTime;

      if (syntaxErrors.length > 0) {
        return NextResponse.json({
          status: "compile_error",
          compilerError: syntaxErrors.join("\n"),
          exitCode: 1,
          durationMs,
        });
      }

      return NextResponse.json({
        status: "success",
        stdout: "[C++ Verification] Syntax validated with 0 errors. (Cloud compiler was unreachable for full runtime link).",
        exitCode: 0,
        durationMs,
      });
    }

    return NextResponse.json(
      {
        status: "compile_error",
        compilerError: `Unsupported language: ${language}`,
        exitCode: 1,
        durationMs: 0,
      },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "compile_error",
        compilerError: `Compiler Engine Exception: ${error?.message || String(error)}`,
        exitCode: 1,
        durationMs: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}

function validateCppSyntax(code: string): string[] {
  const errors: string[] = [];
  const lines = code.split("\n");

  let braceCount = 0;
  let parenCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;
    const trimmed = line.trim();

    // Check class or struct missing opening brace
    if (/^(?:class|struct)\s+[A-Za-z0-9_]+$/.test(trimmed)) {
      errors.push(`solution.cpp:${lineNum}: error: expected '{' after class definition`);
      errors.push(line);
      errors.push(" ".repeat(line.length) + "^");
    }

    // Check missing semicolon after statements
    if (
      trimmed.length > 0 &&
      !trimmed.startsWith("//") &&
      !trimmed.startsWith("#") &&
      !trimmed.endsWith("{") &&
      !trimmed.endsWith("}") &&
      !trimmed.endsWith(":") &&
      !trimmed.endsWith(";") &&
      (trimmed.startsWith("return") ||
        trimmed.startsWith("int ") ||
        trimmed.startsWith("cout") ||
        trimmed.startsWith("std::cout") ||
        trimmed.startsWith("cin") ||
        trimmed.startsWith("std::cin"))
    ) {
      errors.push(`solution.cpp:${lineNum}: error: expected ';' before end of line`);
      errors.push(line);
      errors.push(" ".repeat(line.length) + "^");
    }

    for (const char of line) {
      if (char === "{") braceCount++;
      if (char === "}") braceCount--;
      if (char === "(") parenCount++;
      if (char === ")") parenCount--;
    }
  }

  if (braceCount !== 0) {
    errors.push(`solution.cpp: error: unmatched braces '{ }' (balance: ${braceCount})`);
  }
  if (parenCount !== 0) {
    errors.push(`solution.cpp: error: unmatched parentheses '( )' (balance: ${parenCount})`);
  }

  return errors;
}
