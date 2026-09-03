"use client";

import React, { useState, useEffect } from "react";
import { RecursionVisualizerPanel } from "@/components/visualizer/recursion/recursion-visualizer-panel";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, Sparkles, Layers, Cpu, Play, Plus, Trash2, BookOpen, Terminal } from "lucide-react";
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

  // Load saved recursion state from localStorage safely
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dsa_custom_recursion_state");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.ret) setReturnType(parsed.ret);
        if (parsed.name) setFunctionName(parsed.name);
        if (parsed.params) setParameters(parsed.params);
        if (parsed.body) setCodeBody(parsed.body);
        if (parsed.call) setFunctionCall(parsed.call);
        if (parsed.activeCode) setActiveGeneratedCode(parsed.activeCode);
        if (parsed.activeCall) setActiveCall(parsed.activeCall);
      }
    } catch (e) {
      console.warn("LocalStorage load error:", e);
    }
  }, []);

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
    const fullCode = `public static ${returnType} ${functionName}(${paramsStr}) {\n${codeBody}\n}\n\n${functionCall};`;
    setActiveGeneratedCode(fullCode);
    setActiveCall(functionCall);
    setKey((prev) => prev + 1);

    // Persist to localStorage
    try {
      localStorage.setItem("dsa_custom_recursion_state", JSON.stringify({
        ret: returnType,
        name: functionName,
        params: parameters,
        body: codeBody,
        call: functionCall,
        activeCode: fullCode,
        activeCall: functionCall
      }));

      const compSaved = localStorage.getItem("dsa_master_completed_topics");
      const compParsed = compSaved ? JSON.parse(compSaved) : {};
      compParsed["custom-recursion"] = true;
      localStorage.setItem("dsa_master_completed_topics", JSON.stringify(compParsed));
      window.dispatchEvent(new Event("storage"));
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }
  };

  return (
    <div className="container mx-auto space-y-6 py-6 max-w-7xl">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30">
            Recursion Visualizer Studio
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Dynamic SVG Tree &amp; JVM Call Stack
          </Badge>
          <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            Multi-Language AST Runner (Java, Python, C++, JS)
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading text-foreground">
          Custom Recursion &amp; Backtracking Visualizer
        </h1>
        <p className="text-muted-foreground text-sm max-w-3xl mt-1">
          Explore recursive branching in real-time. Watch SVG trees expand, monitor LIFO call stack frames with return values, and step through algorithms across Java, Python, C++, and JavaScript.
        </p>
      </div>

      {/* Main Execution Studio Panel */}
      <RecursionVisualizerPanel
        key={key}
        initialCode={activeGeneratedCode}
        functionName={functionName}
        sampleCall={activeCall}
        description={`Interactive simulation of ${functionName} with dynamic AST tracing, recursion tree visualization, and JVM call stack memory frames.`}
      />

      {/* Custom Method Signature Builder Accordion / Card */}
      <Card className="border-border/80 bg-card p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-blue-500" />
            <h3 className="text-sm font-bold text-foreground">Custom Java / C++ Signature Builder</h3>
          </div>
          <Button
            size="sm"
            onClick={handleApplyCustomCode}
            className="bg-primary text-primary-foreground text-xs font-bold gap-1.5 rounded-xl shadow-xs"
          >
            <Play className="h-3.5 w-3.5" />
            Transpile &amp; Load into Studio
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
              className="font-mono text-xs h-9 bg-muted/30 rounded-xl"
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
              className="font-mono text-xs h-9 bg-muted/30 rounded-xl"
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
                className="text-[10px] font-mono font-bold text-blue-500 hover:underline flex items-center gap-1"
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
                    className="w-16 h-7 text-xs font-mono bg-card px-2 text-center rounded-lg"
                  />
                  <Input
                    value={p.name}
                    onChange={(e) => updateParameter(p.id, "name", e.target.value)}
                    className="w-20 h-7 text-xs font-mono bg-card px-2 rounded-lg"
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
            Method Body (Recursive Logic)
          </Label>
          <Textarea
            value={codeBody}
            onChange={(e) => setCodeBody(e.target.value)}
            rows={4}
            className="font-mono text-xs bg-slate-950 text-slate-100 p-3 rounded-xl border-slate-800 leading-relaxed shadow-inner"
            spellCheck={false}
          />
        </div>

        {/* Function Call Input */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="w-full sm:w-80 space-y-1">
            <Label className="text-[10px] font-mono uppercase font-bold text-muted-foreground">
              Invocation Call
            </Label>
            <Input
              value={functionCall}
              onChange={(e) => setFunctionCall(e.target.value)}
              className="font-mono text-xs h-9 bg-muted/30 rounded-xl"
              placeholder="e.g. factorial(4)"
            />
          </div>
          <div className="pt-4 sm:pt-5 w-full sm:w-auto">
            <Button
              onClick={handleApplyCustomCode}
              className="w-full sm:w-auto bg-primary text-primary-foreground text-xs font-bold gap-1.5 rounded-xl shadow-xs h-9"
            >
              <Play className="h-3.5 w-3.5" />
              Apply &amp; Run
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
