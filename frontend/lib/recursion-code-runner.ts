/**
 * recursion-code-runner.ts
 *
 * Runs recursive Java/JS code locally in the browser to produce step-by-step
 * CallStack frames and RecursionTree node hierarchies.
 */

export interface StepCall {
  type: 'call';
  nodeId: number;
  parentId: number | null;
  label: string;
  params: Record<string, any>;
  isBaseCase: boolean;
}

export interface StepReturn {
  type: 'return';
  nodeId: number;
  value: any;
  isBaseCase: boolean;
}

export type ExecutionStep = StepCall | StepReturn;

export interface ExecutionResult {
  steps: ExecutionStep[];
  funcName: string;
  invocation: string;
}

function transpileCStyle(code: string): string {
  let r = code;

  // STEP 1: Remove comments and compiler directives
  r = r.replace(/#\s*include\s*[<"][^"'>\n]*[>"]\s*/g, '');
  r = r.replace(/#\s*define\s+[^\n]*/g, '');
  r = r.replace(/#\s*pragma\s+[^\n]*/g, '');
  r = r.replace(/\/\/.*$/gm, '');
  r = r.replace(/\/\*[\s\S]*?\*\//g, '');

  // STEP 2: Remove class / struct wrappers
  r = r.replace(/(?:public\s+)?(?:class|interface|struct)\s+\w+(?:\s*implements\s+[^{]*)?(?:\s*extends\s+[^{]*)?\s*\{/g, '');
  {
    const opens = (r.match(/\{/g) || []).length;
    const closes = (r.match(/\}/g) || []).length;
    let extraTrailing = Math.max(0, closes - opens);
    while (extraTrailing > 0 && /\}\s*$/.test(r)) {
      r = r.replace(/\}\s*$/, '');
      extraTrailing--;
    }
  }

  // STEP 3: Remove access modifiers & qualifiers
  r = r.replace(/\b(public|private|protected)\s*:/g, '');
  r = r.replace(/\b(public|private|protected|static|final|synchronized|volatile|transient|inline|virtual|override|explicit|constexpr)\s+/g, ' ');

  // STEP 3.5: Strip Java Generics (e.g. List<Integer> -> List, Map<String, Integer> -> Map)
  let prev;
  do {
    prev = r;
    r = r.replace(/\b([A-Za-z_]\w*)\s*<[^<>]*>/g, '$1');
  } while (r !== prev);

  // STEP 4: Convert Java Type Casts: e.g. (int) x, (double) x, (Integer) x, (char) x
  const typeCastRegex = /\(\s*(?:int|long|double|float|boolean|bool|char|byte|short|Integer|Long|Double|Float|Boolean|Character|String|Object)\s*(?:\[\s*\]\s*)*\)\s*/g;
  r = r.replace(typeCastRegex, '');

  // STEP 5: Convert Java Enhanced for loops: for (int num : arr) -> for (var num of arr)
  r = r.replace(/\bfor\s*\(\s*(?:[A-Za-z_]\w*(?:\[\s*\]\s*)*\s+)+([A-Za-z_]\w*)\s*:\s*([^)]+)\)/g, 'for (var $1 of $2)');

  // STEP 6: Convert Method Declarations to JS functions
  const returnTypePattern = `(?:void|int|long(?:\\s+long)?|double|float|boolean|bool|char|byte|short|Integer|Long|Double|Float|Boolean|Character|Byte|Short|String|Object|[A-Z]\\w*)(?:\\s*\\[\\s*\\])*`;
  r = r.replace(
    new RegExp(`\\b${returnTypePattern}\\s+([A-Za-z_]\\w*)\\s*\\(([^)]*)\\)\\s*\\{`, 'g'),
    (match, funcName, rawParams) => {
      if (/^(?:if|for|while|switch|catch)\b/.test(funcName)) return match;
      return `function ${funcName}(${rawParams}) {`;
    }
  );

  // STEP 7: Clean parameters in all function definitions
  // In `function funcName(int a, int[] b, String c)` -> `function funcName(a, b, c)`
  r = r.replace(/function\s+([A-Za-z_]\w*)\s*\(([^)]*)\)/g, (_match, funcName, params) => {
    const cleanedParams = params
      .split(',')
      .map((p: string) => {
        let cleaned = p.trim();
        if (!cleaned) return '';
        // Remove default values if any: `int x = 5` -> `int x`
        cleaned = cleaned.split('=')[0].trim();
        // Remove array brackets: `int[] arr` -> `int arr`
        cleaned = cleaned.replace(/\[\s*\]/g, '').trim();
        // Get the identifier at the end
        const parts = cleaned.split(/\s+/);
        return parts[parts.length - 1];
      })
      .filter((p: string) => p.length > 0 && p !== ',')
      .join(', ');
    return `function ${funcName}(${cleanedParams})`;
  });

  // STEP 8: Convert Array Literals & Instantiations
  r = r.replace(/new\s+[A-Za-z_]\w*\s*\[\s*\]\s*\{\s*([^}]*)\s*\}/g, '[$1]');
  r = r.replace(/\[\s*\]\s*\{\s*([^}]*)\s*\}/g, '[$1]');
  r = r.replace(/=\s*\{([^}]*)\}\s*;/g, '= [$1];');
  r = r.replace(/\bnew\s+(?:int|long|double|float|char|boolean|String)\s*\[\s*([^\]]+)\s*\]/g, 'new Array($1).fill(0)');

  // STEP 9: Clean variable declarations (without consuming braces)
  const valTypePattern = `(?:int|long(?:\\s+long)?|double|float|boolean|bool|char|byte|short|Integer|Long|Double|Float|Boolean|Character|Byte|Short|String|Object|var|[A-Z]\\w*)(?:\\s*\\[\\s*\\])*`;
  
  // for (int i = 0; ...) -> for (var i = 0; ...)
  r = r.replace(new RegExp(`\\bfor\\s*\\(\\s*${valTypePattern}\\s+([A-Za-z_]\\w*)\\s*=`, 'g'), 'for (var $1 =');

  // Type declaration statements: `int num = ...;`, `int num;`, `int[] num = ...;`
  r = r.replace(new RegExp(`\\b${valTypePattern}\\s+([A-Za-z_]\\w*(?:\\s*=[^;,]+)?(?:\\s*,\\s*[A-Za-z_]\\w*(?:\\s*=[^;,]+)?)*)\\s*;`, 'g'), 'var $1;');

  // STEP 10: Common Java Constants & Methods
  r = r.replace(/\bInteger\.MAX_VALUE\b/g, '2147483647');
  r = r.replace(/\bInteger\.MIN_VALUE\b/g, '-2147483648');
  r = r.replace(/\bDouble\.POSITIVE_INFINITY\b/g, 'Infinity');
  r = r.replace(/\bDouble\.NEGATIVE_INFINITY\b/g, '-Infinity');
  r = r.replace(/\.length\s*\(\s*\)/g, '.length');
  r = r.replace(/\.size\s*\(\s*\)/g, '.length');
  r = r.replace(/System\.out\.println\s*\(/g, 'console.log(');
  r = r.replace(/System\.out\.print\s*\(/g, 'console.log(');

  return r;
}

const IGNORED = new Set([
  'println','print','printf','log','warn','error','console','System','out','err','main','Main',
  'Math','parseInt','parseFloat','Number','String','Boolean','Array','Object','JSON','Date',
]);

function getDefinedFunctionNames(jsCode: string): string[] {
  const names: string[] = [];
  const patterns = [
    /\bfunction\s+([A-Za-z_]\w*)\s*\(/g,
    /\b(?:const|let|var)\s+([A-Za-z_]\w*)\s*=\s*(?:async\s*)?\(/g,
  ];

  for (const pat of patterns) {
    const re = new RegExp(pat.source, 'g');
    let m;
    while ((m = re.exec(jsCode)) !== null) {
      const n = m[1];
      if (n && !IGNORED.has(n) && n.length > 1 && !names.includes(n)) names.push(n);
    }
  }

  return names;
}

function detectInvocation(jsCode: string, definedNames: string[]): { name: string; invocation: string } | null {
  const lines = jsCode.split('\n');

  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i].trim();
    if (!line || line.startsWith('//') || line.startsWith('function') || line.startsWith('return') || line.startsWith('var') || line.startsWith('let') || line.startsWith('const')) continue;

    for (const name of definedNames) {
      const reg = new RegExp(`^\\s*${name}\\s*\\(`);
      const m = line.match(reg);
      if (m && !line.includes('{') && !line.includes('}')) {
        return { name, invocation: line.replace(/;$/, '') };
      }
    }
  }

  return null;
}

function executeWithTracing(jsCode: string, definedNames: string[], entry: { name: string; invocation: string }): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  let nodeId = 0;
  const stack: number[] = [];

  let normalized = jsCode
    .replace(/\bconst\s+([A-Za-z_]\w*)\s*=/g, 'var $1 =')
    .replace(/\blet\s+([A-Za-z_]\w*)\s*=/g, 'var $1 =');

  const makeTraced = (fnName: string, fn: Function) => {
    return function (this: any, ...args: any[]) {
      const id = nodeId++;
      const parentId = stack.length ? stack[stack.length - 1] : null;

      const clone = (v: any): any => {
        if (v === null || typeof v !== 'object') return v;
        if (Array.isArray(v)) return v.map(clone);
        return { ...v };
      };

      const formatArg = (a: any): string => {
        if (Array.isArray(a)) {
          if (a.length <= 3) return `[${a.join(',')}]`;
          return `[${a.slice(0, 2).join(',')},..]`;
        }
        if (typeof a === 'object' && a !== null) return JSON.stringify(a);
        return String(a);
      };

      const simpleFnName = fnName.replace(/^recursive([A-Z])/, (_m, c) => c.toLowerCase());
      const label = `${simpleFnName}(${args.map(formatArg).join(', ')})`;

      const params: Record<string, any> = {};
      args.forEach((a, i) => { params[`arg${i}`] = clone(a); });

      stack.push(id);
      const callIdx = steps.length;
      steps.push({ type: 'call', nodeId: id, parentId, label, params, isBaseCase: false });

      const result = fn.apply(this, args);

      stack.pop();

      const hasDirectChild = steps.slice(callIdx + 1).some(s => s.type === 'call' && s.parentId === id);
      if (!hasDirectChild) (steps[callIdx] as StepCall).isBaseCase = true;

      steps.push({ type: 'return', nodeId: id, value: result, isBaseCase: !hasDirectChild });
      return result;
    };
  };

  const MAX_CALLS = 300;
  const guardedTrace = (name: string, fn: Function) => {
    const traced = makeTraced(name, fn);
    return function (this: any, ...args: any[]) {
      if (nodeId > MAX_CALLS) throw new Error(`Recursion exceeded ${MAX_CALLS} calls limit.`);
      return traced.apply(this, args);
    };
  };

  const tracedAssignments = definedNames
    .map((n) => `${n} = __trace(${JSON.stringify(n)}, ${n});`)
    .join('\n');

  const sandboxCode = `
    if (!Array.prototype.add) { Array.prototype.add = function(item) { this.push(item); return true; }; }
    if (!Array.prototype.size) { Array.prototype.size = function() { return this.length; }; }
    if (!Array.prototype.isEmpty) { Array.prototype.isEmpty = function() { return this.length === 0; }; }

    ${normalized}
    ${tracedAssignments}
    return (${entry.invocation});
  `;

  new Function('__trace', 'console', sandboxCode)(guardedTrace, {
    log: () => {},
    warn: () => {},
    error: () => {},
  });

  return steps;
}

function cleanCallString(call: string): string {
  let c = call.trim().replace(/;$/, '');
  // Replace new int[]{1, 2, 3} with [1, 2, 3]
  c = c.replace(/new\s+(?:[A-Za-z0-9_]+)\s*\[\s*\]\s*\{([^}]*)\}/g, '[$1]');
  c = c.replace(/\{([^}]*)\}/g, '[$1]');
  return c;
}

export function runRecursiveCodeLocally(code: string, language: "java" | "javascript" = "java", customCall?: string): ExecutionResult {
  let jsCode = transpileCStyle(code);

  const definedNames = getDefinedFunctionNames(jsCode);
  if (!definedNames.length) {
    throw new Error("Could not detect the recursive function in the code.");
  }

  let entry: { name: string; invocation: string } | null = null;
  if (customCall && customCall.trim()) {
    const callMatch = customCall.trim().match(/^([A-Za-z_]\w*)\s*\(/);
    const fnName = callMatch && definedNames.includes(callMatch[1]) ? callMatch[1] : definedNames[0];
    entry = { name: fnName, invocation: cleanCallString(customCall) };
  } else {
    entry = detectInvocation(jsCode, definedNames);
    if (!entry) {
      entry = { name: definedNames[0], invocation: `${definedNames[0]}(4)` };
    }
  }

  const steps = executeWithTracing(jsCode, definedNames, entry);
  return { steps, funcName: entry.name, invocation: entry.invocation };
}
