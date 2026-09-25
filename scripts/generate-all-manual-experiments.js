const fs = require('fs');
const path = require('path');

const mdDir = 'c:/Users/erohi/OneDrive/Desktop/Virtual-Labs/MD';
const outDir = 'c:/Users/erohi/OneDrive/Desktop/Virtual-Labs/frontend/data/experiments-data';

// Helper to escape strings for TypeScript templates
function esc(str) {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${');
}

// -------------------------------------------------------------
// 1. C PROGRAMMING LAB (15 Experiments)
// -------------------------------------------------------------
function buildCProgramming() {
  const content = fs.readFileSync(path.join(mdDir, 'PROGRAMMING IN C LAB MANUAL.md'), 'utf8');
  const expRegex = /\|\s*\*\*Experiment\s*(\d+):\s*([^\*\|]+)\*\*[\s\S]*?\*\*Aim\*\*([\s\S]*?)\*\*Procedure \/ Algorithm\*\*([\s\S]*?)\*\*Program\*\*([\s\S]*?)\*\*Output\*\*([\s\S]*?)\*\*Result\*\*([\s\S]*?)(?=(\|\s*\*\*Experiment|$))/g;
  
  const experiments = [];
  let m;
  while ((m = expRegex.exec(content)) !== null) {
    const num = parseInt(m[1], 10);
    const title = m[2].trim();
    const aim = m[3].trim().replace(/^[\r\n| -]+/gm, '').trim();
    const procRaw = m[4].trim();
    const proc = procRaw.split(/\r?\n/)
      .map(s => s.trim().replace(/^\|\s*|\s*\|$/g, ''))
      .filter(s => /^\d+\./.test(s));
    
    let codeRaw = m[5].trim().replace(/^\|[\s\S]*?---\s*\|/m, '').replace(/\|/g, '').trim();
    // Clean up code formatting
    codeRaw = codeRaw.replace(/\s{2,}/g, '\n  ').replace(/#include/g, '\n#include').trim();
    
    let outRaw = m[6].trim().replace(/^\|[\s\S]*?---\s*\|/m, '').replace(/\|/g, '').trim();
    outRaw = outRaw.replace(/\s{2,}/g, '\n');

    const slug = `c-exp-${num}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;

    experiments.push({
      id: `c-exp-${num}`,
      labId: 'c-programming',
      title: `Exp ${num}: ${title}`,
      slug: slug,
      difficulty: num <= 5 ? 'Beginner' : num <= 10 ? 'Intermediate' : 'Advanced',
      category: 'C Programming',
      estimatedMinutes: 30,
      rating: 4.9,
      ratingsCount: 150 + num * 4,
      simulator: 'custom',
      quizId: `quiz-c-${num}`,
      sections: {
        introduction: aim,
        objective: aim,
        videoUrl: 'https://www.youtube-nocookie.com/embed/KJgsSFOSQv0',
        videoTitle: `C Programming: ${title}`,
        videoChannel: 'VLab & NPTEL Engineering',
        prerequisites: ['Basic Computer Fundamentals', 'C Compiler Tools'],
        theory: {
          overview: `This experiment implements ${title} as part of the core C Programming Laboratory curriculum at V.S.B. Engineering College. It demonstrates procedural programming, standard library operations, memory layout, and runtime output verification.`,
          keyConcepts: [
            { title: 'Procedural Execution', desc: 'Step-by-step logic following structured procedural principles in ANSI C.' },
            { title: 'Standard I/O & Types', desc: 'Formatted stream processing and datatype memory constraints.' },
            { title: 'Hardware Efficiency', desc: 'Direct memory mapping and deterministic execution speeds.' }
          ],
          complexities: [
            { operation: 'Primary Execution', best: 'O(1)', avg: 'O(n)', worst: 'O(n)', space: 'O(1)' }
          ],
          realWorldApplications: [
            'System software and embedded device controllers',
            'Operating system utilities and CLI tools',
            'Foundational algorithms for AI and scientific computing'
          ]
        },
        procedure: proc.length > 0 ? proc : [
          '1. Start the program and include standard headers.',
          '2. Declare required variables.',
          '3. Accept input values from the user.',
          '4. Execute program logic.',
          '5. Display the output.',
          '6. Stop the program.'
        ],
        sampleCode: {
          language: 'c',
          code: codeRaw
        },
        expectedOutput: outRaw,
        leetcodeProblems: [],
        targetAudience: {
          ug: ['B.E. CSE', 'B.Tech AI&DS', 'B.Tech IT - 1st Year'],
          pg: ['M.E. Computer Science']
        }
      }
    });
  }

  const fileContent = `import { Experiment } from "../experiments";

export const C_PROGRAMMING_EXPERIMENTS: Experiment[] = ${JSON.stringify(experiments, null, 2)};
`;
  fs.writeFileSync(path.join(outDir, 'c-programming-experiments.ts'), fileContent, 'utf8');
  console.log(`Generated c-programming-experiments.ts with ${experiments.length} experiments.`);
}

buildCProgramming();
