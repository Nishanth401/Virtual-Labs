/**
 * VSB Virtual Labs — Institutional Landing Page
 * Kinetic Animations, Interactive Simulation Studio, College Clone Generator
 */

document.addEventListener('DOMContentLoaded', () => {
  initKineticWords();
  initMetricsCounter();
  initScrollSpy();
  initScrollAnimations();
});

/* ==========================================================================
   1. Kinetic Word Flipper (Smooth Dissolve Cross-Fade)
   ========================================================================== */
function initKineticWords() {
  const container = document.getElementById('kineticWords');
  if (!container) return;

  const words = container.querySelectorAll('.kinetic-word');
  if (words.length <= 1) return;

  let currentIndex = 0;

  setInterval(() => {
    const currentWord = words[currentIndex];
    currentWord.classList.remove('active');
    currentWord.classList.add('leaving');

    currentIndex = (currentIndex + 1) % words.length;
    const nextWord = words[currentIndex];

    // Smooth dissolve crossfade
    setTimeout(() => {
      currentWord.classList.remove('leaving');
      nextWord.classList.add('active');
    }, 380);
  }, 3200);
}

/* ==========================================================================
   2. Feature Stat Number Count-up Animation
   ========================================================================== */
function initMetricsCounter() {
  const statValues = document.querySelectorAll('.metric-num');
  if (!statValues.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.innerText.trim();
        const numMatch = text.match(/^(\d+)([%+]?)$/);
        if (numMatch) {
          const target = parseInt(numMatch[1], 10);
          const suffix = numMatch[2] || '';
          let current = 0;
          const step = Math.max(1, Math.floor(target / 25));
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              el.innerText = current + suffix;
              clearInterval(timer);
            } else {
              el.innerText = current + suffix;
            }
          }, 35);
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  statValues.forEach(el => observer.observe(el));
}
function initParticleCanvas() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 45;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2 + 1.2;
      this.alpha = Math.random() * 0.4 + 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(225, 29, 72, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(225, 29, 72, ${0.08 * (1 - dist / 130)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. Playable Interactive Graph Simulation Studio (Dijkstra Algorithm)
   ========================================================================== */
let graphSimInstance = null;

function initGraphSimulation() {
  const canvas = document.getElementById('graphSimCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const logTerminal = document.getElementById('simTerminalLog');

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  resizeCanvas();
  window.addEventListener('resize', () => {
    resizeCanvas();
    if (graphSimInstance) graphSimInstance.draw();
  });

  class GraphSimulation {
    constructor() {
      this.nodes = [];
      this.edges = [];
      this.visitedNodes = new Set();
      this.shortestPathEdges = [];
      this.currentVisitingNode = null;
      this.distances = {};
      this.previous = {};
      this.unvisited = new Set();
      this.isRunning = false;
      this.stepQueue = [];
      this.draggedNode = null;

      this.initDefaultGraph();
      this.setupInteraction();
      this.draw();
    }

    initDefaultGraph() {
      const w = canvas.width || 600;
      const h = canvas.height || 420;

      this.nodes = [
        { id: 'A', x: w * 0.18, y: h * 0.45, label: 'Start (A)' },
        { id: 'B', x: w * 0.38, y: h * 0.22, label: 'Node B' },
        { id: 'C', x: w * 0.40, y: h * 0.72, label: 'Node C' },
        { id: 'D', x: w * 0.65, y: h * 0.25, label: 'Node D' },
        { id: 'E', x: w * 0.68, y: h * 0.70, label: 'Node E' },
        { id: 'F', x: w * 0.86, y: h * 0.48, label: 'Dest (F)' }
      ];

      this.edges = [
        { u: 'A', v: 'B', weight: 4 },
        { u: 'A', v: 'C', weight: 2 },
        { u: 'B', v: 'C', weight: 1 },
        { u: 'B', v: 'D', weight: 5 },
        { u: 'C', v: 'D', weight: 8 },
        { u: 'C', v: 'E', weight: 10 },
        { u: 'D', v: 'E', weight: 2 },
        { u: 'D', v: 'F', weight: 6 },
        { u: 'E', v: 'F', weight: 3 }
      ];

      this.resetState();
    }

    resetState() {
      this.visitedNodes.clear();
      this.shortestPathEdges = [];
      this.currentVisitingNode = null;
      this.isRunning = false;
      this.stepQueue = [];
      this.prepareDijkstraSteps('A', 'F');
    }

    log(msg, type = 'info') {
      if (!logTerminal) return;
      const line = document.createElement('div');
      line.className = 'sim-log-line';
      if (type === 'success') line.classList.add('sim-log-success');
      if (type === 'highlight') line.classList.add('sim-log-highlight');
      line.innerHTML = `> ${msg}`;
      logTerminal.appendChild(line);
      logTerminal.scrollTop = logTerminal.scrollHeight;
    }

    prepareDijkstraSteps(startId, destId) {
      this.distances = {};
      this.previous = {};
      this.unvisited = new Set();
      this.stepQueue = [];

      this.nodes.forEach(n => {
        this.distances[n.id] = Infinity;
        this.previous[n.id] = null;
        this.unvisited.add(n.id);
      });
      this.distances[startId] = 0;

      const unvisitedCopy = new Set(this.unvisited);
      const distCopy = { ...this.distances };
      const prevCopy = { ...this.previous };

      while (unvisitedCopy.size > 0) {
        let current = null;
        let lowestDist = Infinity;

        unvisitedCopy.forEach(nodeId => {
          if (distCopy[nodeId] < lowestDist) {
            lowestDist = distCopy[nodeId];
            current = nodeId;
          }
        });

        if (current === null || lowestDist === Infinity) break;

        unvisitedCopy.delete(current);

        this.stepQueue.push({
          type: 'VISIT_NODE',
          nodeId: current,
          distance: lowestDist
        });

        if (current === destId) break;

        const neighbors = this.getNeighbors(current);
        neighbors.forEach(edge => {
          const neighborId = edge.other;
          if (unvisitedCopy.has(neighborId)) {
            const alt = distCopy[current] + edge.weight;
            if (alt < distCopy[neighborId]) {
              distCopy[neighborId] = alt;
              prevCopy[neighborId] = current;
              this.stepQueue.push({
                type: 'RELAX_EDGE',
                from: current,
                to: neighborId,
                newDist: alt,
                weight: edge.weight
              });
            }
          }
        });
      }

      // Reconstruct final path
      const pathEdges = [];
      let curr = destId;
      while (prevCopy[curr]) {
        pathEdges.push({ u: prevCopy[curr], v: curr });
        curr = prevCopy[curr];
      }
      this.stepQueue.push({
        type: 'FINISH_PATH',
        pathEdges: pathEdges.reverse(),
        totalDist: distCopy[destId]
      });
    }

    getNeighbors(nodeId) {
      const res = [];
      this.edges.forEach(e => {
        if (e.u === nodeId) res.push({ other: e.v, weight: e.weight });
        else if (e.v === nodeId) res.push({ other: e.u, weight: e.weight });
      });
      return res;
    }

    step() {
      if (this.stepQueue.length === 0) {
        this.log('Execution completed. Shortest path is active.', 'success');
        return false;
      }

      const stepAction = this.stepQueue.shift();

      if (stepAction.type === 'VISIT_NODE') {
        this.currentVisitingNode = stepAction.nodeId;
        this.visitedNodes.add(stepAction.nodeId);
        this.log(`Visiting Vertex [${stepAction.nodeId}] (Current Min Distance = ${stepAction.distance})`, 'highlight');
      } else if (stepAction.type === 'RELAX_EDGE') {
        this.log(`Edge Relaxed: (${stepAction.from} ➔ ${stepAction.to}) with weight ${stepAction.weight}. New total distance = ${stepAction.newDist}`);
      } else if (stepAction.type === 'FINISH_PATH') {
        this.shortestPathEdges = stepAction.pathEdges;
        this.currentVisitingNode = null;
        this.log(`🎯 Optimum Shortest Path Found! Total Minimum Distance = ${stepAction.totalDist}`, 'success');
      }

      this.draw();
      return true;
    }

    runContinuous() {
      this.resetState();
      this.log('🚀 Initiating automated Dijkstra Shortest Path Search...', 'highlight');
      
      const interval = setInterval(() => {
        const hasNext = this.step();
        if (!hasNext) {
          clearInterval(interval);
        }
      }, 450);
    }

    draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Edges
      this.edges.forEach(edge => {
        const uNode = this.nodes.find(n => n.id === edge.u);
        const vNode = this.nodes.find(n => n.id === edge.v);
        if (!uNode || !vNode) return;

        const isShortest = this.isShortestPathEdge(edge.u, edge.v);

        ctx.beginPath();
        ctx.moveTo(uNode.x, uNode.y);
        ctx.lineTo(vNode.x, vNode.y);

        if (isShortest) {
          ctx.strokeStyle = '#e11d48'; // Bright Ruby Red
          ctx.lineWidth = 5;
          ctx.shadowColor = 'rgba(225, 29, 72, 0.7)';
          ctx.shadowBlur = 12;
        } else {
          ctx.strokeStyle = '#cbd5e1'; // Subtle Slate
          ctx.lineWidth = 2;
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Edge Weight Badge
        const midX = (uNode.x + vNode.x) / 2;
        const midY = (uNode.y + vNode.y) / 2;

        ctx.beginPath();
        ctx.arc(midX, midY, 12, 0, Math.PI * 2);
        ctx.fillStyle = isShortest ? '#881337' : '#ffffff';
        ctx.fill();
        ctx.strokeStyle = isShortest ? '#e11d48' : '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = 'bold 11px JetBrains Mono, monospace';
        ctx.fillStyle = isShortest ? '#ffffff' : '#475569';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(edge.weight, midX, midY);
      });

      // Draw Nodes
      this.nodes.forEach(node => {
        const isVisited = this.visitedNodes.has(node.id);
        const isCurrent = this.currentVisitingNode === node.id;
        const isStart = node.id === 'A';
        const isDest = node.id === 'F';

        ctx.beginPath();
        ctx.arc(node.x, node.y, 22, 0, Math.PI * 2);

        if (isCurrent) {
          ctx.fillStyle = '#be123c';
          ctx.shadowColor = 'rgba(225, 29, 72, 0.8)';
          ctx.shadowBlur = 16;
        } else if (isStart || isDest) {
          ctx.fillStyle = '#881337';
          ctx.shadowColor = 'rgba(136, 19, 55, 0.4)';
          ctx.shadowBlur = 8;
        } else if (isVisited) {
          ctx.fillStyle = '#e11d48';
          ctx.shadowBlur = 4;
        } else {
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 0;
        }
        ctx.fill();

        ctx.strokeStyle = isCurrent ? '#ff4d6d' : (isVisited ? '#881337' : '#e2e8f0');
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Node ID Text
        ctx.font = 'bold 13px Inter, sans-serif';
        ctx.fillStyle = (isVisited || isCurrent || isStart || isDest) ? '#ffffff' : '#1e293b';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.id, node.x, node.y);

        // Node Label Underneath
        ctx.font = '11px Inter, sans-serif';
        ctx.fillStyle = '#475569';
        ctx.fillText(node.label, node.x, node.y + 34);
      });
    }

    isShortestPathEdge(u, v) {
      return this.shortestPathEdges.some(
        e => (e.u === u && e.v === v) || (e.u === v && e.v === u)
      );
    }

    setupInteraction() {
      let isDragging = false;

      canvas.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Check if clicking on an existing node
        const clickedNode = this.nodes.find(n => {
          const dx = n.x - x;
          const dy = n.y - y;
          return Math.sqrt(dx * dx + dy * dy) < 26;
        });

        if (clickedNode) {
          this.draggedNode = clickedNode;
          isDragging = true;
        } else {
          // Add new node if less than 10
          if (this.nodes.length < 9) {
            const nextLetter = String.fromCharCode(65 + this.nodes.length);
            const newNode = {
              id: nextLetter,
              x: x,
              y: y,
              label: `Node ${nextLetter}`
            };
            this.nodes.push(newNode);

            // Connect to closest existing node
            let closest = null;
            let minDist = Infinity;
            this.nodes.slice(0, -1).forEach(n => {
              const d = Math.sqrt((n.x - x) ** 2 + (n.y - y) ** 2);
              if (d < minDist) {
                minDist = d;
                closest = n;
              }
            });

            if (closest) {
              const weight = Math.floor(Math.random() * 8) + 1;
              this.edges.push({ u: closest.id, v: newNode.id, weight });
              this.log(`Added Vertex [${nextLetter}] connected to [${closest.id}] with weight ${weight}.`, 'highlight');
            }

            this.resetState();
            this.draw();
          }
        }
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDragging || !this.draggedNode) return;
        const rect = canvas.getBoundingClientRect();
        this.draggedNode.x = Math.max(30, Math.min(canvas.width - 30, e.clientX - rect.left));
        this.draggedNode.y = Math.max(30, Math.min(canvas.height - 30, e.clientY - rect.top));
        this.draw();
      });

      window.addEventListener('mouseup', () => {
        if (isDragging) {
          isDragging = false;
          this.draggedNode = null;
          this.resetState();
          this.draw();
        }
      });
    }

    randomize() {
      const w = canvas.width || 600;
      const h = canvas.height || 420;

      this.nodes.forEach(n => {
        if (n.id === 'A') {
          n.x = w * 0.15;
          n.y = h * (0.35 + Math.random() * 0.3);
        } else if (n.id === 'F') {
          n.x = w * 0.85;
          n.y = h * (0.35 + Math.random() * 0.3);
        } else {
          n.x = w * (0.28 + Math.random() * 0.44);
          n.y = h * (0.18 + Math.random() * 0.64);
        }
      });

      this.edges.forEach(e => {
        e.weight = Math.floor(Math.random() * 9) + 1;
      });

      this.log('Graph randomized with new spatial coordinates and weights.', 'highlight');
      this.resetState();
      this.draw();
    }
  }

  graphSimInstance = new GraphSimulation();
}

function runGraphSimulation() {
  if (graphSimInstance) graphSimInstance.runContinuous();
}

function stepGraphSimulation() {
  if (graphSimInstance) graphSimInstance.step();
}

function randomizeGraphNodes() {
  if (graphSimInstance) graphSimInstance.randomize();
}

function resetGraphSimulation() {
  if (graphSimInstance) {
    graphSimInstance.resetState();
    graphSimInstance.draw();
    graphSimInstance.log('Graph state reset to initial parameters.');
  }
}

/* ==========================================================================
   4. Instant College Clone Sandbox Studio
   ========================================================================== */
const COLLEGE_PRESETS = {
  vsb: {
    name: 'VSB Engineering College',
    code: '9225',
    subdomain: 'https://vsb.virtuallabs.cloud',
    badge: 'AICTE Code: 9225 • Autonomous NAAC A Grade',
    depts: 'AI&DS, CSE, IT, ECE, MECH',
    regulation: 'Autonomous CBCS 2021 / 2023',
    capacity: '4,800 Concurrent Learners'
  },
  cit: {
    name: 'Coimbatore Institute of Technology',
    code: '7176',
    subdomain: 'https://cit.virtuallabs.cloud',
    badge: 'AICTE Code: 7176 • Govt. Aided Autonomous',
    depts: 'CSE, AI&ML, IT, ECE, VLSI',
    regulation: 'CIT Autonomous Regulation 2022',
    capacity: '5,200 Concurrent Learners'
  },
  psg: {
    name: 'PSG College of Technology',
    code: '7177',
    subdomain: 'https://psg.virtuallabs.cloud',
    badge: 'AICTE Code: 7177 • Autonomous NAAC A++',
    depts: 'CSE, IT, Robotics, AI, Data Science',
    regulation: 'PSG Autonomous BoS Framework',
    capacity: '6,500 Concurrent Learners'
  },
  anna: {
    name: 'Anna University — CEG Campus',
    code: '0001',
    subdomain: 'https://annauniv.virtuallabs.cloud',
    badge: 'University Campus • NIRF Top Ranked',
    depts: 'All Engineering & Technology Disciplines',
    regulation: 'Anna University Regulation 2021/2023',
    capacity: '8,500 Concurrent Learners'
  },
  skct: {
    name: 'Sri Krishna College of Technology',
    code: '7278',
    subdomain: 'https://skct.virtuallabs.cloud',
    badge: 'AICTE Code: 7278 • Autonomous NAAC A',
    depts: 'CSE, AIDS, IT, ECE, Civil',
    regulation: 'SKCT Autonomous 2022 Curriculum',
    capacity: '4,200 Concurrent Learners'
  }
};

function selectCollegePreset(key) {
  const preset = COLLEGE_PRESETS[key];
  if (!preset) return;

  // Highlight pill
  document.querySelectorAll('.quick-college-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  if (event && event.target) {
    event.target.classList.add('active');
  }

  updateClonePreview(preset);
}

function handleCustomCollegeInput(e) {
  const val = e.target.value.trim();
  if (!val) {
    selectCollegePreset('vsb');
    return;
  }

  const slug = val.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 14) || 'college';
  const customPreset = {
    name: val,
    code: 'Auto-Detect',
    subdomain: `https://${slug}.virtuallabs.cloud`,
    badge: `Custom Institutional Tenant • Anna Univ Aligned`,
    depts: 'AI&DS, CSE, IT, ECE + Configurable Labs',
    regulation: 'Custom BoS Regulation 2026',
    capacity: '3,000+ Concurrent Students'
  };

  updateClonePreview(customPreset);
}

function updateClonePreview(data) {
  const nameEl = document.getElementById('cloneCardName');
  const badgeEl = document.getElementById('cloneCardBadge');
  const subdomainEl = document.getElementById('cloneCardSubdomain');
  const deptsEl = document.getElementById('cloneSpecDepts');
  const regEl = document.getElementById('cloneSpecRegulation');
  const capEl = document.getElementById('cloneSpecCapacity');
  const card = document.getElementById('clonePreviewCard');

  if (nameEl) nameEl.textContent = data.name;
  if (badgeEl) badgeEl.textContent = data.badge;
  if (subdomainEl) subdomainEl.textContent = data.subdomain;
  if (deptsEl) deptsEl.textContent = data.depts;
  if (regEl) regEl.textContent = data.regulation;
  if (capEl) capEl.textContent = data.capacity;

  if (card) {
    card.style.transform = 'scale(1.02)';
    setTimeout(() => {
      card.style.transform = 'scale(1)';
    }, 200);
  }
}

/* ==========================================================================
   5. Role-Based Workspaces Switcher
   ========================================================================== */
const ROLE_DATA = {
  student: {
    badge: 'For Engineering Students',
    title: 'Hands-On Interactive Simulation Workspace',
    description: 'Empower students with zero-friction access to high-fidelity algorithms, AI models, and circuit simulations. Run code, visualize pointer adjustments, inspect memory states, and generate instant observation reports.',
    features: [
      'Visual step-through execution for trees, graphs, sorting, and neural networks.',
      'Automated digital observation manual with real-time test case validation.',
      'Instant AI-driven syntax and logic debugging tips when simulation fails.'
    ],
    mockUrl: 'student.virtuallabs.cloud',
    stat1Title: 'Experiments Completed',
    stat1Val: '14 / 16',
    stat2Title: 'Average Score',
    stat2Val: '94.8%',
    stat3Title: 'Viva Readiness',
    stat3Val: 'Level 5 ★'
  },
  faculty: {
    badge: 'For Lab In-Charges & Professors',
    title: '1-Click Evaluation & Automated Continuous Grading',
    description: 'Eliminate hours spent manually flipping physical record notebooks. Review real-time student execution timestamps, analyze code similarity, and approve digital lab sheets in bulk.',
    features: [
      'One-tap attendance marking synced with institutional timetable modules.',
      'Auto-graded Continuous Internal Evaluation (CIE) with custom rubrics.',
      'Plagiarism and source code similarity index for programming labs.'
    ],
    mockUrl: 'faculty.virtuallabs.cloud',
    stat1Title: 'Active Batches',
    stat1Val: '4 Batches',
    stat2Title: 'Submissions Graded',
    stat2Val: '98.2%',
    stat3Title: 'Time Saved',
    stat3Val: '18 hrs/wk'
  },
  hod: {
    badge: 'For Heads of Department (HODs)',
    title: 'Department Academic Health & Syllabus Tracking',
    description: 'Gain unified real-time visibility into syllabus pacing across every lab session. Balance faculty workloads, review pass predictions, and export complete audit packs effortlessly.',
    features: [
      'Real-time departmental lab syllabus completion tracker and alerts.',
      'Automated lab faculty allocation and batch capacity optimization.',
      'Direct synchronization with Anna University semester schedule guidelines.'
    ],
    mockUrl: 'hod.virtuallabs.cloud',
    stat1Title: 'Lab Completion',
    stat1Val: '87.4%',
    stat2Title: 'Student Attendance',
    stat2Val: '96.1%',
    stat3Title: 'Audit Status',
    stat3Val: 'Compliant ✓'
  },
  dean: {
    badge: 'For Principals, Deans & Governance',
    title: 'Campus-Wide Accreditation Analytics (NAAC & NBA)',
    description: 'One single executive cockpit for the entire institution. Monitor multi-department lab utilization, calculate carbon & equipment savings, and generate instant NBA Tier-1 attainment charts.',
    features: [
      'Instant generation of Course Outcome (CO) & PO attainment matrices.',
      'Zero physical hardware expenditure with 100% audit trail security.',
      'Campus-wide student participation statistics across all engineering branches.'
    ],
    mockUrl: 'governance.virtuallabs.cloud',
    stat1Title: 'Enrolled Campuses',
    stat1Val: '4,850 Users',
    stat2Title: 'Capex Saved',
    stat2Val: '₹18.4 Lakhs',
    stat3Title: 'NBA Readiness',
    stat3Val: 'Tier-1 Ready'
  }
};

function switchRoleTab(roleKey) {
  const data = ROLE_DATA[roleKey];
  if (!data) return;

  // Toggle active button
  const buttons = document.querySelectorAll('.role-tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }

  // Update card elements
  const badgeEl = document.getElementById('roleBadgePill');
  const titleEl = document.getElementById('roleTitle');
  const descEl = document.getElementById('roleDescription');
  const listEl = document.getElementById('roleFeaturesList');
  const mockUrlEl = document.getElementById('mockHeaderTitle');
  const stat1 = document.getElementById('mockStat1');
  const stat2 = document.getElementById('mockStat2');
  const stat3 = document.getElementById('mockStat3');

  if (badgeEl) badgeEl.textContent = data.badge;
  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.description;
  if (mockUrlEl) mockUrlEl.textContent = data.mockUrl;
  if (stat1) stat1.textContent = data.stat1Val;
  if (stat2) stat2.textContent = data.stat2Val;
  if (stat3) stat3.textContent = data.stat3Val;

  if (listEl) {
    listEl.innerHTML = data.features.map(f => `
      <div class="role-feature-item">
        <span class="check-circle">✓</span>
        <span>${f}</span>
      </div>
    `).join('');
  }
}


/* ==========================================================================
   7. FAQ Accordion
   ========================================================================== */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  if (!item) return;

  const isActive = item.classList.contains('active');

  // Close all other FAQs
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('active');
    const answer = el.querySelector('.faq-answer');
    if (answer) answer.style.maxHeight = null;
  });

  if (!isActive) {
    item.classList.add('active');
    const answer = item.querySelector('.faq-answer');
    if (answer) answer.style.maxHeight = answer.scrollHeight + 24 + 'px';
  }
}

/* ==========================================================================
   8. Booking Modal & Submission Handler
   ========================================================================== */
function openBookingModal() {
  const modal = document.getElementById('bookingModalBackdrop');
  if (modal) modal.classList.add('open');
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModalBackdrop');
  if (modal) modal.classList.remove('open');
}

function handleModalBackdropClick(e) {
  if (e.target.id === 'bookingModalBackdrop') {
    closeBookingModal();
  }
}

function openBookingModalWithPreset() {
  const collegeName = document.getElementById('cloneCardName')?.textContent || '';
  const modalInstName = document.getElementById('modalInstName');
  if (modalInstName && collegeName) {
    modalInstName.value = collegeName;
  }
  openBookingModal();
}

function handleBookingSubmit(e) {
  e.preventDefault();
  const college = document.getElementById('instCollegeName')?.value || 'Your Institution';
  const email = document.getElementById('instEmail')?.value || '';

  showCelebration(college, email);
}

function handleModalSubmit(e) {
  e.preventDefault();
  const college = document.getElementById('modalInstName')?.value || 'Your Institution';
  const email = document.getElementById('modalEmail')?.value || '';

  closeBookingModal();
  showCelebration(college, email);
}

function showCelebration(college, email) {
  // Trigger custom confetti canvas
  launchConfetti();

  setTimeout(() => {
    alert(`🎉 Institutional Demo Request Received!\n\nInstitution: ${college}\nOfficial Email: ${email}\n\nOur Academic Relations Team at the Department of AI & DS (VSB Engineering College) will dispatch your temporary college sandbox credentials to ${email} within 15 minutes!`);
  }, 400);
}

function launchConfetti() {
  const confettiCanvas = document.createElement('canvas');
  confettiCanvas.style.position = 'fixed';
  confettiCanvas.style.top = '0';
  confettiCanvas.style.left = '0';
  confettiCanvas.style.width = '100vw';
  confettiCanvas.style.height = '100vh';
  confettiCanvas.style.pointerEvents = 'none';
  confettiCanvas.style.zIndex = '3000';
  document.body.appendChild(confettiCanvas);

  const ctx = confettiCanvas.getContext('2d');
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#e11d48', '#881337', '#be123c', '#fb7185', '#ffffff', '#ffd166'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.7) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10
    });
  }

  function renderConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let alive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.alpha -= 0.012;
      p.rotation += p.rotationSpeed;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (alive) {
      requestAnimationFrame(renderConfetti);
    } else {
      confettiCanvas.remove();
    }
  }

  renderConfetti();
}

/* ==========================================================================
   9. Smooth Scroll Helper & Scroll Spy
   ========================================================================== */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 85;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

function initScrollSpy() {
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   10. Bi-Directional Scroll Animations (Scroll Down & Up Fluidity)
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.section-header, .pillar-card, .comparison-card, .discipline-card, .metric-pill, .role-content-card, .booking-card-wrapper, .faq-item, .hero-cta-group'
  );

  animatedElements.forEach(el => el.classList.add('scroll-reveal'));

  let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

  const observer = new IntersectionObserver((entries) => {
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    const isScrollingDown = currentScrollY >= lastScrollY;

    entries.forEach(entry => {
      const el = entry.target;
      const rect = entry.boundingClientRect;

      if (entry.isIntersecting) {
        if (!isScrollingDown && rect.top < window.innerHeight * 0.4) {
          el.classList.add('scroll-from-top');
        } else {
          el.classList.remove('scroll-from-top');
        }
        el.classList.remove('scroll-off-top', 'scroll-off-bottom');
        el.classList.add('is-visible');
      } else {
        // Element left viewport: re-prime for both down and up scroll
        if (rect.top > window.innerHeight) {
          el.classList.remove('is-visible', 'scroll-from-top');
          el.classList.add('scroll-off-bottom');
        } else if (rect.bottom < 0) {
          el.classList.remove('is-visible');
          el.classList.add('scroll-from-top', 'scroll-off-top');
        }
      }
    });

    lastScrollY = currentScrollY;
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -25px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));

  // Initialize Glassy Title Bar Scroll Reactor & Top Glowing Scroll Progress Bar
  const navContainer = document.querySelector('.nav-container');
  let progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.prepend(progressBar);
  }

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Title bar glass elevation toggle
        if (navContainer) {
          if (scrollY > 30) {
            navContainer.classList.add('scrolled');
          } else {
            navContainer.classList.remove('scrolled');
          }
        }


        // Scroll Progress Bar calculation
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0 && progressBar) {
          const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
          progressBar.style.width = `${progress}%`;
        }

        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });
}
