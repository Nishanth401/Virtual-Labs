"use client";

import React, { useState } from "react";
import { RecursionVisualizerPanel } from "@/components/visualizer/recursion/recursion-visualizer-panel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, Sparkles, Layers, Cpu, Play, Plus, Trash2, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CustomRecursionVisualizerPage() {
  const [returnType, setReturnType] = useState("int");
  const [functionName, setFunctionName] = useState("factorial");
  const [parameters, setParameters] = useState([
    { id: 1, type: "int", name: "n" }
  ]);
  const [codeBody, setCodeBody] = useState(
    `if (n <= 1) {\n    return 1;\n}\nreturn n * factorial(n - 1);`
  );
  const [functionCall, setFunctionCall] = useState("factorial(4)");

  const [activeGeneratedCode, setActiveGeneratedCode] = useState(
    `public static int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}`
  );
  const [activeCall, setActiveCall] = useState("factorial(4)");
  const [key, setKey] = useState(0);

  const addParameter = () => {
    setParameters([
      ...parameters,
      { id: Date.now(), type: "int", name: `param${parameters.length + 1}` }
    ]);
  };

  const removeParameter = (id: number) => {
    setParameters(parameters.filter((p) => p.id !== id));
  };

  const updateParameter = (id: number, field: "type" | "name", val: string) => {
    setParameters(parameters.map((p) => (p.id === id ? { ...p, [field]: val } : p)));
  };

  const handleApplyCustomCode = () => {
    const paramsStr = parameters.map((p) => `${p.type} ${p.name}`).join(", ");
    const fullCode = `public static ${returnType} ${functionName}(${paramsStr}) {\n${codeBody}\n}`;
    setActiveGeneratedCode(fullCode);
    setActiveCall(functionCall);
    setKey((prev) => prev + 1);
  };

  const loadPreset = (preset: {
    ret: string;
    name: string;
    params: { id: number; type: string; name: string }[];
    body: string;
    call: string;
  }) => {
    setReturnType(preset.ret);
    setFunctionName(preset.name);
    setParameters(preset.params);
    setCodeBody(preset.body);
    setFunctionCall(preset.call);

    const paramsStr = preset.params.map((p) => `${p.type} ${p.name}`).join(", ");
    const fullCode = `public static ${preset.ret} ${preset.name}(${paramsStr}) {\n${preset.body}\n}`;
    setActiveGeneratedCode(fullCode);
    setActiveCall(preset.call);
    setKey((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto space-y-6 py-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs uppercase tracking-wider bg-[#1e88e5]/10 text-[#1e88e5] border-[#1e88e5]/30">
            Custom Algorithm &amp; Method Studio
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Recursion Tree &amp; Call Stack
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
            Java Runtime AST Parser
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading text-foreground">
          Custom Recursion &amp; Algorithm Visualizer
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Build and execute custom recursive Java algorithms, inspect step-by-step tree branching, and observe JVM stack frames pushing and popping in real-time.
        </p>
      </div>

      {/* Preset Quick Selectors */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground mr-1">Quick Presets:</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            loadPreset({
              ret: "int",
              name: "factorial",
              params: [{ id: 1, type: "int", name: "n" }],
              body: "if (n <= 1) return 1;\nreturn n * factorial(n - 1);",
              call: "factorial(4)"
            })
          }
          className="text-xs h-8 rounded-xl"
        >
          Factorial (n!)
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            loadPreset({
              ret: "int",
              name: "fib",
              params: [{ id: 1, type: "int", name: "n" }],
              body: "if (n <= 1) return n;\nreturn fib(n - 1) + fib(n - 2);",
              call: "fib(4)"
            })
          }
          className="text-xs h-8 rounded-xl"
        >
          Fibonacci Tree
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            loadPreset({
              ret: "int",
              name: "power",
              params: [
                { id: 1, type: "int", name: "base" },
                { id: 2, type: "int", name: "exp" }
              ],
              body: "if (exp == 0) return 1;\nreturn base * power(base, exp - 1);",
              call: "power(2, 4)"
            })
          }
          className="text-xs h-8 rounded-xl"
        >
          Power (X^N)
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            loadPreset({
              ret: "int",
              name: "sumDigits",
              params: [{ id: 1, type: "int", name: "n" }],
              body: "if (n == 0) return 0;\nreturn (n % 10) + sumDigits(n / 10);",
              call: "sumDigits(1234)"
            })
          }
          className="text-xs h-8 rounded-xl"
        >
          Sum of Digits
        </Button>
      </div>

      {/* Interactive Method Signature Builder */}
      <Card className="border-border/80 bg-card p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-[#1e88e5]" />
            <h3 className="text-sm font-bold text-foreground">Custom Java Method Signature Builder</h3>
          </div>
          <Button
            size="sm"
            onClick={handleApplyCustomCode}
            className="bg-[#1e88e5] hover:bg-[#1976d2] text-white text-xs font-bold gap-1.5 rounded-xl shadow-md"
          >
            <Play className="h-3.5 w-3.5" />
            Build &amp; Run Visualizer
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <Label className="text-[10px] font-mono uppercase font-bold text-muted-foreground">
              Return Type
            </Label>
            <Input
              value={returnType}
              onChange={(e) => setReturnType(e.target.value)}
              className="font-mono text-xs h-9 bg-muted/30"
              placeholder="e.g. int"
            />
          </div>

          <div className="sm:col-span-3 space-y-1.5">
            <Label className="text-[10px] font-mono uppercase font-bold text-muted-foreground">
              Method Name
            </Label>
            <Input
              value={functionName}
              onChange={(e) => setFunctionName(e.target.value)}
              className="font-mono text-xs h-9 bg-muted/30"
              placeholder="e.g. factorial"
            />
          </div>

          <div className="sm:col-span-7 space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] font-mono uppercase font-bold text-muted-foreground">
                Parameters
              </Label>
              <button
                type="button"
                onClick={addParameter}
                className="text-[10px] font-mono font-bold text-[#1e88e5] hover:underline flex items-center gap-1"
              >
                <Plus className="h-3 w-3" /> Add Param
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {parameters.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-1 p-1 rounded-xl bg-muted/40 border border-border/80"
                >
                  <Input
                    value={p.type}
                    onChange={(e) => updateParameter(p.id, "type", e.target.value)}
                    className="w-16 h-7 text-xs font-mono bg-card px-2 text-center"
                  />
                  <Input
                    value={p.name}
                    onChange={(e) => updateParameter(p.id, "name", e.target.value)}
                    className="w-20 h-7 text-xs font-mono bg-card px-2"
                  />
                  {parameters.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParameter(p.id)}
                      className="p-1 text-muted-foreground hover:text-rose-500"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Function Body Editor */}
        <div className="space-y-1.5">
          <Label className="text-[10px] font-mono uppercase font-bold text-muted-foreground">
            Method Body (Java Recursive Implementation)
          </Label>
          <Textarea
            value={codeBody}
            onChange={(e) => setCodeBody(e.target.value)}
            rows={5}
            className="font-mono text-xs bg-slate-950 text-slate-100 p-3 rounded-xl border-slate-800 leading-relaxed shadow-inner"
            spellCheck={false}
          />
        </div>

        {/* Function Call Input */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="w-full sm:w-80 space-y-1">
            <Label className="text-[10px] font-mono uppercase font-bold text-muted-foreground">
              Initial Invocation Call
            </Label>
            <Input
              value={functionCall}
              onChange={(e) => setFunctionCall(e.target.value)}
              className="font-mono text-xs h-9 bg-muted/30"
              placeholder="e.g. factorial(4)"
            />
          </div>
          <div className="pt-4 sm:pt-5 w-full sm:w-auto">
            <Button
              onClick={handleApplyCustomCode}
              className="w-full sm:w-auto bg-[#1e88e5] hover:bg-[#1976d2] text-white text-xs font-bold gap-1.5 rounded-xl shadow-md h-9"
            >
              <Play className="h-3.5 w-3.5" />
              Execute Custom Algorithm
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Execution Studio Panel */}
      <RecursionVisualizerPanel
        key={key}
        initialCode={activeGeneratedCode}
        functionName={functionName}
        sampleCall={activeCall}
        description={`Interactive simulation of ${functionName} with dynamic AST tracing, recursion tree visualization, and JVM call stack memory frames.`}
      />
    </div>
  );
}
