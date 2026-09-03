/**
 * code-runner-engine.ts
 *
 * Client-side recursive execution engine derived from Recursion_Visualizer-main.
 * Runs 100% offline in browser without API keys.
 * Supports: Java, Python, C, C++, JavaScript
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

// ─── Transpilers ─────────────────────────────────────────────────────────────

export function transpileCStyle(code: string): string {
  let r = code;

  // STEP 1: Comments and directives
  r = r.replace(/#\s*include\s*[<"][^"'>\n]*[>"]\s*/g, '');
  r = r.replace(/#\s*define\s+[^\n]*/g, '');
  r = r.replace(/#\s*pragma\s+[^\n]*/g, '');
  r = r.replace(/\/\/.*$/gm, '');
  r = r.replace(/\/\*[\s\S]*?\*\//g, '');

  // STEP 2: Remove class / interface / struct wrappers
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

  // STEP 3: Remove access modifiers & keywords
  r = r.replace(/\b(public|private|protected)\s*:/g, '');
  r = r.replace(/\b(public|private|protected|static|final|synchronized|volatile|transient|inline|virtual|override|explicit|constexpr)\s+/g, ' ');

  // Strip generics safely
  let prev = '';
  do {
    prev = r;
    r = r.replace(/\b([A-Z]\w*)\s*<[^<>]*>/g, '$1');
  } while (r !== prev);

  // STEP 4: Convert Java / C method declarations to JS functions
  r = r.replace(
    /\b(?:[A-Z]\w*|int|long\s+long|long|double|float|boolean|bool|char|void|auto|size_t|unsigned(?:\s+int)?|unsigned\s+long|String|string)\s+(?:\[\]\s*)*([A-Za-z_]\w*)\s*\(/g,
    'function $1('
  );

  // Constants
  r = r.replace(/\bInteger\.MAX_VALUE\b/g, '2147483647');
  r = r.replace(/\bInteger\.MIN_VALUE\b/g, '-2147483648');
  r = r.replace(/\bDouble\.POSITIVE_INFINITY\b/g, 'Infinity');
  r = r.replace(/\bDouble\.NEGATIVE_INFINITY\b/g, '-Infinity');

  // Java Arrays helper
  r = r.replace(/\bArrays\.copyOfRange\s*\(\s*([^,]+),\s*([^,]+),\s*([^)]+)\s*\)/g, '$1.slice($2, $3)');

  // Clean params
  r = r.replace(/function\s+(\w+)\s*\(([^)]*)\)/g, (_match, funcName, params) => {
    const cleanedParams = params
      .split(',')
      .map((p: string) => {
        let cleaned = p.trim();
        if (!cleaned) return '';
        cleaned = cleaned.split('=')[0].trim();
        cleaned = cleaned.replace(/\[\s*\]/g, '').trim();
        const parts = cleaned.split(/\s+/);
        return parts[parts.length - 1];
      })
      .filter((p: string) => p.length > 0 && p !== ',')
      .join(', ');
    return `function ${funcName}(${cleanedParams})`;
  });

  // Collections instantiations
  r = r.replace(/\bnew\s+(?:ArrayList|LinkedList|HashSet|Stack|ArrayDeque|Vector)\s*\(\s*([^)]+)\s*\)/g, '[...$1]');
  r = r.replace(/\bnew\s+(?:ArrayList|LinkedList|HashSet|Stack|ArrayDeque|Vector)\s*\(\s*\)/g, '[]');
  r = r.replace(/\bnew\s+boolean\s*\[\s*([^\]]+)\s*\]/g, 'new Array($1).fill(false)');
  r = r.replace(/\bnew\s+(?:int|long|double|float|char)\s*\[\s*([^\]]+)\s*\]/g, 'new Array($1).fill(0)');
  r = r.replace(/\bnew\s+(?:String|string)\s*\[\s*([^\]]+)\s*\]/g, 'new Array($1).fill("")');

  // Array literals: new int[]{1,2,3} -> [1,2,3]
  r = r.replace(/new\s+(?:[A-Z]\w*|int|long|double|float|boolean|bool|char|String|string|auto)\s*(?:\[\s*\])+\s*\{([^}]*)\}/g, '[$1]');
  r = r.replace(/=\s*\{([^}]*)\}\s*;/g, '= [$1];');

  // Variables declarations
  const javaTypes = 'List|ArrayList|LinkedList|Set|HashSet|Map|HashMap|Stack|Queue|Deque|ArrayDeque|Vector|int|long|double|float|boolean|bool|char|void|auto|size_t|unsigned|String|string';
  r = r.replace(new RegExp(`\\b(?:${javaTypes})(?:\\s*\\[\\s*\\])*\\s+([A-Za-z_]\\w*)\\s*=`, 'g'), 'var $1 =');
  r = r.replace(new RegExp(`\\b(?:${javaTypes})(?:\\s*\\[\\s*\\])*\\s+([A-Za-z_]\\w*)\\s*;`, 'g'), 'var $1;');
  r = r.replace(/\bfor\s*\(\s*(?:${javaTypes})\s+(\w+)\s*=/g, 'for (var $1 =');

  // Type casts
  r = r.replace(/\(\s*(int|long|double|float|char|unsigned)\s*\)\s*/g, '');

  // String methods
  r = r.replace(/\.length\s*\(\s*\)/g, '.length');
  r = r.replace(/\.toCharArray\s*\(\s*\)/g, '.split("")');

  // IO
  r = r.replace(/System\.out\.println\s*\(/g, 'console.log(');
  r = r.replace(/System\.out\.print\s*\(/g, 'console.log(');

  // Keywords
  r = r.replace(/\bnullptr\b/g, 'null');

  return r;
}

export function transpilePython(code: string): string {
  const rawLines = code.split('\n');
  const out: string[] = [];
  const indentStack: number[] = [-1];

  const toJS = (expr: string) =>
    expr
      .replace(/\bTrue\b/g, 'true')
      .replace(/\bFalse\b/g, 'false')
      .replace(/\bNone\b/g, 'null')
      .replace(/\band\b/g, '&&')
      .replace(/\bor\b/g, '||')
      .replace(/\bnot\s+/g, '!')
      .replace(/\blen\s*\(/g, '__len(')
      .replace(/\bprint\s*\(/g, 'console.log(');

  for (let i = 0; i < rawLines.length; i++) {
    const raw = rawLines[i];
    const trimmed = raw.trimStart();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const indent = raw.length - trimmed.length;

    while (indent <= indentStack[indentStack.length - 1]) {
      indentStack.pop();
      out.push(' '.repeat(indentStack[indentStack.length - 1] + 1) + '}');
    }

    const pad = ' '.repeat(indent);

    if (/^def\s/.test(trimmed)) {
      const m = trimmed.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:/);
      if (m) {
        out.push(`${pad}function ${m[1]}(${m[2]}) {`);
        indentStack.push(indent);
        continue;
      }
    }

    if (/^if\s/.test(trimmed)) {
      const cond = toJS(trimmed.replace(/^if\s+(.+)\s*:\s*$/, '$1'));
      out.push(`${pad}if (${cond}) {`);
      indentStack.push(indent);
      continue;
    }
    if (/^elif\s/.test(trimmed)) {
      if (indent <= indentStack[indentStack.length - 1]) {
        indentStack.pop();
        out.push(' '.repeat(indent) + '} else if (' + toJS(trimmed.replace(/^elif\s+(.+)\s*:\s*$/, '$1')) + ') {');
      } else {
        out.push(`${pad}} else if (${toJS(trimmed.replace(/^elif\s+(.+)\s*:\s*$/, '$1'))}) {`);
      }
      indentStack.push(indent);
      continue;
    }
    if (/^else\s*:/.test(trimmed)) {
      out.push(`${pad}} else {`);
      indentStack.push(indent);
      continue;
    }

    if (/^return\b/.test(trimmed)) {
      const val = toJS(trimmed.replace(/^return\s*/, '').replace(/\s*$/, ''));
      out.push(`${pad}return ${val};`);
      continue;
    }

    let stmt = toJS(trimmed);
    if (!stmt.endsWith(';') && !stmt.endsWith('{') && !stmt.endsWith('}')) stmt += ';';
    out.push(pad + stmt);
  }

  while (indentStack.length > 1) {
    indentStack.pop();
    out.push('}');
  }

  out.unshift('function __len(a) { return a === null ? 0 : (a.length !== undefined ? a.length : 0); }');
  return out.join('\n');
}

export function transpileToJS(code: string, language: string): string {
  switch (language.toLowerCase()) {
    case 'javascript':
    case 'js':
      return code;
    case 'python':
    case 'py':
      return transpilePython(code);
    case 'java':
    case 'cpp':
    case 'c':
      return transpileCStyle(code);
    default:
      return code;
  }
}

// ─── Function & Invocation Detection ─────────────────────────────────────────

const IGNORED = new Set([
  'println','print','printf','fprintf','sprintf','scanf','log','warn','error',
  'console','System','out','err','main','Main','setup','init','run','start',
  'Math','parseInt','parseFloat','Number','String','Boolean','Array','Object',
  'JSON','Date','Promise','Map','Set','setTimeout','setInterval','fetch',
  'assert','expect','describe','it','test','len','range','list','dict','tuple',
  '__len','sorted','reversed','enumerate','zip'
]);

function getDefinedFunctionNames(jsCode: string): string[] {
  const names: string[] = [];
  const patterns = [
    /\bfunction\s+([A-Za-z_]\w*)\s*\(/g,
    /\b(?:const|let|var)\s+([A-Za-z_]\w*)\s*=\s*(?:async\s*)?\(/g,
    /\b(?:const|let|var)\s+([A-Za-z_]\w*)\s*=\s*(?:async\s*)?function\b/g,
  ];

  for (const pat of patterns) {
    let m;
    while ((m = pat.exec(jsCode)) !== null) {
      const n = m[1];
      if (n && !IGNORED.has(n) && n.length > 1 && !names.includes(n)) names.push(n);
    }
  }

  return names;
}

function detectInvocation(jsCode: string, definedNames: string[]): { name: string; invocation: string } | null {
  const lines = jsCode.split('\n');

  for (let i = lines.length - 1; i >= 0; i--) {
    const text = lines[i].trim();
    if (!text || text.startsWith('//') || text.startsWith('#') || text.startsWith('/*')) continue;
    if (/\breturn\b/.test(text) || /\bfunction\b/.test(text)) continue;

    for (const name of definedNames) {
      const reg = new RegExp(`\\b${name}\\s*\\(`);
      const m = text.match(reg);
      if (m && m.index !== undefined) {
        const start = m.index + m[0].length - 1;
        let depth = 0;
        let end = -1;
        for (let j = start; j < text.length; j++) {
          if (text[j] === '(') depth++;
          else if (text[j] === ')') depth--;
          if (depth === 0) {
            end = j;
            break;
          }
        }
        if (end !== -1) {
          return { name, invocation: text.substring(m.index, end + 1) };
        }
      }
    }
  }
  return null;
}

function getParamNames(jsCode: string, funcName: string): string[] {
  const patterns = [
    new RegExp(`function\\s+${funcName}\\s*\\(([^)]*)\\)`),
    new RegExp(`(?:const|let|var)\\s+${funcName}\\s*=\\s*(?:async\\s*)?\\(([^)]*)\\)`),
  ];
  for (const pat of patterns) {
    const m = jsCode.match(pat);
    if (m) return m[1].split(',').map((p: string) => p.trim().replace(/\s*=.*/, '')).filter(Boolean);
  }
  return [];
}

// ─── Execution with Tracing ──────────────────────────────────────────────────

function executeWithTracing(jsCode: string, definedNames: string[], entry: { name: string; invocation: string }): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  let nodeId = 0;
  const stack: number[] = [];

  let normalized = jsCode
    .replace(/\bconst\s+([A-Za-z_]\w*)\s*=/g, 'var $1 =')
    .replace(/\blet\s+([A-Za-z_]\w*)\s*=/g, 'var $1 =');

  const paramNamesByFunc = new Map<string, string[]>();
  for (const n of definedNames) paramNamesByFunc.set(n, getParamNames(normalized, n));

  const makeTraced = (fnName: string, fn: any) => {
    const pnames = paramNamesByFunc.get(fnName) ?? [];
    return function (this: any, ...args: any[]) {
      const id = nodeId++;
      const parentId = stack.length ? stack[stack.length - 1] : null;

      const clone = (v: any) => {
        if (v === null || typeof v !== 'object') return v;
        if (Array.isArray(v)) return v.map(clone);
        return { ...v };
      };

      const label = `${fnName}(${args.map((a: any) => {
        if (Array.isArray(a)) return '[' + a.join(',') + ']';
        return JSON.stringify(a);
      }).join(', ')})`;

      const params: Record<string, any> = {};
      pnames.forEach((name, i) => { if (args[i] !== undefined) params[name] = clone(args[i]); });
      if (pnames.length === 0) args.forEach((a, i) => { params[`arg${i}`] = clone(a); });

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

  const MAX_CALLS = 600;
  const guardedTrace = (name: string, fn: any) => {
    const traced = makeTraced(name, fn);
    return function (this: any, ...args: any[]) {
      if (nodeId > MAX_CALLS) throw new Error(`Recursion exceeded limit of ${MAX_CALLS} frames. Please reduce input size.`);
      return traced.apply(this, args);
    };
  };

  const tracedAssignments = definedNames
    .map((n) => `${n} = __trace(${JSON.stringify(n)}, ${n});`)
    .join('\n');

  const sandboxCode = `
    if (!Array.prototype.add) { Array.prototype.add = function(item) { this.push(item); return true; }; }
    if (!Array.prototype.size) { Array.prototype.size = function() { return this.length; }; }
    if (!Array.prototype.remove) { Array.prototype.remove = function(index) { return this.splice(index, 1)[0]; }; }
    if (!Array.prototype.get) { Array.prototype.get = function(index) { return this[index]; }; }
    if (!Array.prototype.set) { Array.prototype.set = function(index, val) { const old = this[index]; this[index] = val; return old; }; }
    if (!Array.prototype.isEmpty) { Array.prototype.isEmpty = function() { return this.length === 0; }; }

    ${normalized}
    ${tracedAssignments}
    return (${entry.invocation});
  `;

  // Run in sandboxed Function constructor
  new Function('__trace', 'console', sandboxCode)(guardedTrace, {
    log: () => {},
    warn: () => {},
    error: () => {},
  });

  if (steps.length === 0) {
    throw new Error(`No recursive execution steps recorded. Make sure your code contains a function call (e.g. ${entry.name}(5);)`);
  }

  return steps;
}

export function runCodeLocally(code: string, language: string = 'java', customCall?: string): ExecutionResult {
  let sourceToTranspile = code;
  if (customCall && !sourceToTranspile.includes(customCall)) {
    sourceToTranspile = `${code}\n${customCall};`;
  }

  const jsCode = transpileToJS(sourceToTranspile, language);
  const definedNames = getDefinedFunctionNames(jsCode);

  if (!definedNames.length) {
    throw new Error(
      'Could not detect recursive function name.\n' +
      'Please ensure your code defines a recursive function (e.g. function factorial(n) { ... }).'
    );
  }

  let entry = detectInvocation(jsCode, definedNames);
  if (!entry?.invocation && customCall) {
    entry = { name: definedNames[0], invocation: customCall };
  }

  if (!entry?.invocation) {
    throw new Error(
      `Found function "${definedNames[0]}", but could not find invocation call.\n` +
      `Add a call at the bottom like: ${definedNames[0]}(4);`
    );
  }

  const steps = executeWithTracing(jsCode, definedNames, entry);
  return { steps, funcName: entry.name, invocation: entry.invocation };
}

// ─── Preset Simulators ────────────────────────────────────────────────────────

export const PRESET_SIMULATORS: Record<string, (input: any) => ExecutionStep[]> = {
  factorial: (n: number) => {
    const steps: ExecutionStep[] = [];
    const simulate = (val: number, nodeId: number, parentId: number | null) => {
      const isBase = val <= 1;
      steps.push({ type: 'call', nodeId, parentId, label: `factorial(${val})`, params: { n: val }, isBaseCase: isBase });
      if (isBase) {
        steps.push({ type: 'return', nodeId, value: 1, isBaseCase: true });
        return 1;
      }
      const childId = steps.length;
      const r = simulate(val - 1, childId, nodeId);
      const result = val * r;
      steps.push({ type: 'return', nodeId, value: result, isBaseCase: false });
      return result;
    };
    simulate(n, 0, null);
    return steps;
  },

  fibonacci: (n: number) => {
    const steps: ExecutionStep[] = [];
    let counter = 0;
    const simulate = (val: number, parentId: number | null = null): { id: number; result: number } => {
      const id = counter++;
      const isBase = val <= 1;
      steps.push({ type: 'call', nodeId: id, parentId, label: `fib(${val})`, params: { n: val }, isBaseCase: isBase });
      if (val <= 0) {
        steps.push({ type: 'return', nodeId: id, value: 0, isBaseCase: true });
        return { id, result: 0 };
      }
      if (val === 1) {
        steps.push({ type: 'return', nodeId: id, value: 1, isBaseCase: true });
        return { id, result: 1 };
      }
      const l = simulate(val - 1, id);
      const r = simulate(val - 2, id);
      const result = l.result + r.result;
      steps.push({ type: 'return', nodeId: id, value: result, isBaseCase: false });
      return { id, result };
    };
    simulate(n);
    return steps;
  },

  binarySearch: ({ arr, target, low, high }: { arr: number[]; target: number; low: number; high: number }) => {
    const steps: ExecutionStep[] = [];
    let counter = 0;
    const simulate = (lo: number, hi: number, parentId: number | null = null): { id: number; result: number } => {
      const id = counter++;
      const isBase = lo > hi;
      steps.push({ type: 'call', nodeId: id, parentId, label: `search(${lo},${hi})`, params: { low: lo, high: hi }, isBaseCase: isBase });
      if (lo > hi) {
        steps.push({ type: 'return', nodeId: id, value: -1, isBaseCase: true });
        return { id, result: -1 };
      }
      const mid = Math.floor((lo + hi) / 2);
      if (arr[mid] === target) {
        steps.push({ type: 'return', nodeId: id, value: mid, isBaseCase: true });
        return { id, result: mid };
      }
      const child = arr[mid] > target ? simulate(lo, mid - 1, id) : simulate(mid + 1, hi, id);
      steps.push({ type: 'return', nodeId: id, value: child.result, isBaseCase: false });
      return { id, result: child.result };
    };
    simulate(low, high);
    return steps;
  },

  sumArray: ({ arr, index }: { arr: number[]; index: number }) => {
    const steps: ExecutionStep[] = [];
    let counter = 0;
    const simulate = (idx: number, parentId: number | null = null): { id: number; result: number } => {
      const id = counter++;
      const isBase = idx >= arr.length;
      steps.push({ type: 'call', nodeId: id, parentId, label: `sum(${idx})`, params: { index: idx, value: arr[idx] }, isBaseCase: isBase });
      if (isBase) {
        steps.push({ type: 'return', nodeId: id, value: 0, isBaseCase: true });
        return { id, result: 0 };
      }
      const child = simulate(idx + 1, id);
      const result = arr[idx] + child.result;
      steps.push({ type: 'return', nodeId: id, value: result, isBaseCase: false });
      return { id, result };
    };
    simulate(index);
    return steps;
  },

  power: ({ base, exp }: { base: number; exp: number }) => {
    const steps: ExecutionStep[] = [];
    let counter = 0;
    const simulate = (e: number, parentId: number | null = null): { id: number; result: number } => {
      const id = counter++;
      const isBase = e === 0;
      steps.push({ type: 'call', nodeId: id, parentId, label: `power(${base},${e})`, params: { base, exp: e }, isBaseCase: isBase });
      if (isBase) {
        steps.push({ type: 'return', nodeId: id, value: 1, isBaseCase: true });
        return { id, result: 1 };
      }
      const child = simulate(e - 1, id);
      const result = base * child.result;
      steps.push({ type: 'return', nodeId: id, value: result, isBaseCase: false });
      return { id, result };
    };
    simulate(exp);
    return steps;
  },

  mergeSort: ({ arr }: { arr: number[] }) => {
    const steps: ExecutionStep[] = [];
    let counter = 0;
    const simulate = (subArr: number[], parentId: number | null = null): { id: number; result: number[] } => {
      const id = counter++;
      const isBase = subArr.length <= 1;
      steps.push({
        type: 'call',
        nodeId: id,
        parentId,
        label: `mergeSort([${subArr.join(',')}])`,
        params: { arr: [...subArr] },
        isBaseCase: isBase,
      });
      if (isBase) {
        steps.push({ type: 'return', nodeId: id, value: [...subArr], isBaseCase: true });
        return { id, result: [...subArr] };
      }
      const mid = Math.floor(subArr.length / 2);
      const leftChild = simulate(subArr.slice(0, mid), id);
      const rightChild = simulate(subArr.slice(mid), id);

      const merged: number[] = [];
      let i = 0, j = 0;
      const l = leftChild.result, r = rightChild.result;
      while (i < l.length && j < r.length) {
        if (l[i] <= r[j]) merged.push(l[i++]);
        else merged.push(r[j++]);
      }
      while (i < l.length) merged.push(l[i++]);
      while (j < r.length) merged.push(r[j++]);

      steps.push({ type: 'return', nodeId: id, value: merged, isBaseCase: false });
      return { id, result: merged };
    };
    simulate(arr);
    return steps;
  }
};

// ─── Preset Catalog ──────────────────────────────────────────────────────────

export const RECURSION_EXAMPLES = [
  {
    id: 'factorial',
    name: 'Factorial (n!)',
    difficulty: 'Beginner',
    description: 'Calculate n! = n × (n-1) × ... × 1 with single linear unwinding.',
    time: 'O(n)',
    space: 'O(n)',
    defaultCall: 'factorial(4)',
    codeJava: `public static int factorial(int n) {\n  if (n <= 1) return 1; // Base case\n  return n * factorial(n - 1); // Recur\n}\n\nfactorial(4);`,
    codePython: `def factorial(n):\n  if n <= 1:\n    return 1\n  return n * factorial(n - 1)\n\nfactorial(4)`,
    codeCpp: `int factorial(int n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n\nfactorial(4);`,
    codeJs: `function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n\nfactorial(4);`
  },
  {
    id: 'fibonacci',
    name: 'Fibonacci Tree',
    difficulty: 'Beginner',
    description: 'Binary branching recursion computing F(n) = F(n-1) + F(n-2).',
    time: 'O(2ⁿ)',
    space: 'O(n)',
    defaultCall: 'fibonacci(4)',
    codeJava: `public static int fibonacci(int n) {\n  if (n <= 0) return 0;\n  if (n == 1) return 1;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nfibonacci(4);`,
    codePython: `def fibonacci(n):\n  if n <= 0:\n    return 0\n  if n == 1:\n    return 1\n  return fibonacci(n - 1) + fibonacci(n - 2)\n\nfibonacci(4)`,
    codeCpp: `int fibonacci(int n) {\n  if (n <= 0) return 0;\n  if (n == 1) return 1;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nfibonacci(4);`,
    codeJs: `function fibonacci(n) {\n  if (n <= 0) return 0;\n  if (n == 1) return 1;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nfibonacci(4);`
  },
  {
    id: 'binarySearch',
    name: 'Binary Search',
    difficulty: 'Intermediate',
    description: 'Halves the search partition at every recursive step in O(log n).',
    time: 'O(log n)',
    space: 'O(log n)',
    defaultCall: 'binarySearch(new int[]{2, 5, 8, 12, 16, 23}, 12, 0, 5)',
    codeJava: `public static int binarySearch(int[] arr, int target, int low, int high) {\n  if (low > high) return -1;\n  int mid = (low + high) / 2;\n  if (arr[mid] == target) return mid;\n  if (arr[mid] > target) return binarySearch(arr, target, low, mid - 1);\n  return binarySearch(arr, target, mid + 1, high);\n}\n\nbinarySearch(new int[]{2, 5, 8, 12, 16, 23}, 12, 0, 5);`,
    codePython: `def binarySearch(arr, target, low, high):\n  if low > high:\n    return -1\n  mid = (low + high) // 2\n  if arr[mid] == target:\n    return mid\n  if arr[mid] > target:\n    return binarySearch(arr, target, low, mid - 1)\n  return binarySearch(arr, target, mid + 1, high)\n\nbinarySearch([2, 5, 8, 12, 16, 23], 12, 0, 5)`,
    codeCpp: `int binarySearch(vector<int>& arr, int target, int low, int high) {\n  if (low > high) return -1;\n  int mid = (low + high) / 2;\n  if (arr[mid] == target) return mid;\n  if (arr[mid] > target) return binarySearch(arr, target, low, mid - 1);\n  return binarySearch(arr, target, mid + 1, high);\n}\n\nbinarySearch(arr, 12, 0, 5);`,
    codeJs: `function binarySearch(arr, target, low, high) {\n  if (low > high) return -1;\n  let mid = Math.floor((low + high) / 2);\n  if (arr[mid] === target) return mid;\n  if (arr[mid] > target) return binarySearch(arr, target, low, mid - 1);\n  return binarySearch(arr, target, mid + 1, high);\n}\n\nbinarySearch([2, 5, 8, 12, 16, 23], 12, 0, 5);`
  },
  {
    id: 'power',
    name: 'Power (X^N)',
    difficulty: 'Beginner',
    description: 'Computes base raised to exponent through recursive decomposition.',
    time: 'O(n)',
    space: 'O(n)',
    defaultCall: 'power(2, 4)',
    codeJava: `public static int power(int base, int exp) {\n  if (exp == 0) return 1;\n  return base * power(base, exp - 1);\n}\n\npower(2, 4);`,
    codePython: `def power(base, exp):\n  if exp == 0:\n    return 1\n  return base * power(base, exp - 1)\n\npower(2, 4)`,
    codeCpp: `int power(int base, int exp) {\n  if (exp == 0) return 1;\n  return base * power(base, exp - 1);\n}\n\npower(2, 4);`,
    codeJs: `function power(base, exp) {\n  if (exp === 0) return 1;\n  return base * power(base, exp - 1);\n}\n\npower(2, 4);`
  },
  {
    id: 'mergeSort',
    name: 'Merge Sort',
    difficulty: 'Advanced',
    description: 'Divide-and-conquer splitting arrays into halves and merging sorted halves.',
    time: 'O(n log n)',
    space: 'O(n)',
    defaultCall: 'mergeSort(new int[]{4, 1, 3, 9, 2})',
    codeJava: `public static int[] mergeSort(int[] arr) {\n  if (arr.length <= 1) return arr;\n  int mid = arr.length / 2;\n  int[] left = mergeSort(Arrays.copyOfRange(arr, 0, mid));\n  int[] right = mergeSort(Arrays.copyOfRange(arr, mid, arr.length));\n  return merge(left, right);\n}\n\nmergeSort(new int[]{4, 1, 3, 9, 2});`,
    codePython: `def mergeSort(arr):\n  if len(arr) <= 1:\n    return arr\n  mid = len(arr) // 2\n  left = mergeSort(arr[:mid])\n  right = mergeSort(arr[mid:])\n  return left + right\n\nmergeSort([4, 1, 3, 9, 2])`,
    codeCpp: `vector<int> mergeSort(vector<int> arr) {\n  if (arr.size() <= 1) return arr;\n  int mid = arr.size() / 2;\n  return arr;\n}\n\nmergeSort({4, 1, 3, 9, 2});`,
    codeJs: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  let mid = Math.floor(arr.length / 2);\n  let left = mergeSort(arr.slice(0, mid));\n  let right = mergeSort(arr.slice(mid));\n  return [...left, ...right];\n}\n\nmergeSort([4, 1, 3, 9, 2]);`
  }
];
