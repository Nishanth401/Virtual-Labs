export interface CollegeData {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  code: string;
  tagline: string;
  location: string;
  logo: string;
  bannerGradient: string;
  accentColor: string;
  accreditation: string[];
  affiliations: string;
  departments: {
    code: string;
    name: string;
    classes: string[];
    years: string[];
  }[];
  curriculumInfo: {
    regulation: string;
    semesterFocus: string;
    autonomousLabFeatures: string[];
  };
  subscriptionPlan: "Enterprise Campus" | "Pro Department" | "Autonomous University";
  status: "active" | "trial" | "pending";
}

export const COLLEGES_REGISTRY: CollegeData[] = [
  {
    id: "col_vsb_01",
    slug: "vsb",
    name: "VSB Engineering College",
    shortName: "VSB EC",
    code: "9225",
    tagline: "Autonomous Institution Approved by AICTE & Affiliated to Anna University",
    location: "Karur, Tamil Nadu",
    logo: "/icons/vsb-logo.png",
    bannerGradient: "from-[#881337] via-[#9f1239] to-[#be123c]",
    accentColor: "#e11d48",
    accreditation: ["NAAC A Grade", "NBA Accredited", "Autonomous", "Anna University"],
    affiliations: "Affiliated to Anna University, Chennai | Approved by AICTE",
    departments: [
      {
        code: "AIDS",
        name: "Artificial Intelligence & Data Science",
        classes: ["AIDS - A", "AIDS - B", "AIDS - C"],
        years: ["I Year", "II Year", "III Year", "IV Year"]
      },
      {
        code: "CSE",
        name: "Computer Science & Engineering",
        classes: ["CSE - A", "CSE - B", "CSE - C", "CSE - D"],
        years: ["I Year", "II Year", "III Year", "IV Year"]
      },
      {
        code: "IT",
        name: "Information Technology",
        classes: ["IT - A", "IT - B"],
        years: ["I Year", "II Year", "III Year", "IV Year"]
      },
      {
        code: "ECE",
        name: "Electronics & Communication Engineering",
        classes: ["ECE - A", "ECE - B"],
        years: ["I Year", "II Year", "III Year", "IV Year"]
      }
    ],
    curriculumInfo: {
      regulation: "Regulation 2021 / 2023 Autonomous CBCS",
      semesterFocus: "Semester III to VIII Lab Curriculum",
      autonomousLabFeatures: [
        "Continuous Internal Evaluation (CIE) Automation",
        "Data Structures & Algorithms Simulation Track",
        "DBMS & MLDL Interactive Simulation Evaluation",
        "Anna University & Autonomous Practical Exam Preparation"
      ]
    },
    subscriptionPlan: "Enterprise Campus",
    status: "active"
  },
  {
    id: "col_cit_02",
    slug: "cit",
    name: "Coimbatore Institute of Technology",
    shortName: "CIT",
    code: "7176",
    tagline: "Government Aided Autonomous Institution Estd. 1956",
    location: "Coimbatore, Tamil Nadu",
    logo: "/icons/cit-logo.png",
    bannerGradient: "from-[#0f172a] via-[#1e293b] to-[#0284c7]",
    accentColor: "#0284c7",
    accreditation: ["NAAC A+ Grade", "NBA Tier-I Accredited", "NIRF Top Ranked", "Autonomous"],
    affiliations: "Affiliated to Anna University | Government Aided Institution",
    departments: [
      {
        code: "CSE",
        name: "Computer Science & Engineering",
        classes: ["CSE - Section 1", "CSE - Section 2"],
        years: ["I Year", "II Year", "III Year", "IV Year"]
      },
      {
        code: "AIDS",
        name: "Artificial Intelligence & Machine Learning",
        classes: ["AI & ML - A", "AI & ML - B"],
        years: ["I Year", "II Year", "III Year", "IV Year"]
      },
      {
        code: "IT",
        name: "Information Technology",
        classes: ["IT - Regular", "IT - Self Support"],
        years: ["I Year", "II Year", "III Year", "IV Year"]
      }
    ],
    curriculumInfo: {
      regulation: "CIT Autonomous Curriculum 2022",
      semesterFocus: "Even / Odd Semester Practical Labs",
      autonomousLabFeatures: [
        "Advanced Algorithm Visualization & Time Complexity Profiler",
        "Machine Learning Model Simulation Studio",
        "Real-time SQL Query Benchmark Engine"
      ]
    },
    subscriptionPlan: "Autonomous University",
    status: "active"
  },
  {
    id: "col_psg_03",
    slug: "psg",
    name: "PSG College of Technology",
    shortName: "PSG Tech",
    code: "7177",
    tagline: "Premier Autonomous Engineering Institution",
    location: "Peelamedu, Coimbatore",
    logo: "/icons/psg-logo.png",
    bannerGradient: "from-[#14532d] via-[#166534] to-[#15803d]",
    accentColor: "#16a34a",
    accreditation: ["NAAC A++ Grade", "NBA Accredited", "Autonomous", "Anna University"],
    affiliations: "Affiliated to Anna University | ISO 9001:2015 Certified",
    departments: [
      {
        code: "CSE",
        name: "Computer Science & Engineering",
        classes: ["CSE - G1", "CSE - G2"],
        years: ["I Year", "II Year", "III Year", "IV Year"]
      },
      {
        code: "AMCS",
        name: "Applied Mathematics & Computational Sciences",
        classes: ["AMCS - A", "AMCS - B"],
        years: ["I Year", "II Year", "III Year", "IV Year"]
      },
      {
        code: "IT",
        name: "Information Technology",
        classes: ["IT - Section 1"],
        years: ["I Year", "II Year", "III Year", "IV Year"]
      }
    ],
    curriculumInfo: {
      regulation: "PSG Tech Autonomous Regulations 2023",
      semesterFocus: "Integrated Laboratory & Industry Tracks",
      autonomousLabFeatures: [
        "Automated Practical Evaluation & Score Logging",
        "Real-world System Software Simulation",
        "Collaborative Coding & Simulation Assessment"
      ]
    },
    subscriptionPlan: "Autonomous University",
    status: "active"
  },
  {
    id: "col_skct_04",
    slug: "skct",
    name: "Sri Krishna College of Technology",
    shortName: "SKCT",
    code: "7214",
    tagline: "Autonomous Institution with Highest Academic Excellence",
    location: "Kovaipudur, Coimbatore",
    logo: "/icons/skct-logo.png",
    bannerGradient: "from-[#4c1d95] via-[#5b21b6] to-[#7c3aed]",
    accentColor: "#7c3aed",
    accreditation: ["NAAC A Grade", "NBA Accredited", "Autonomous"],
    affiliations: "Affiliated to Anna University | Approved by AICTE",
    departments: [
      {
        code: "AIDS",
        name: "Artificial Intelligence & Data Science",
        classes: ["AIDS - A", "AIDS - B"],
        years: ["I Year", "II Year", "III Year", "IV Year"]
      },
      {
        code: "CSE",
        name: "Computer Science & Engineering",
        classes: ["CSE - A", "CSE - B", "CSE - C"],
        years: ["I Year", "II Year", "III Year", "IV Year"]
      },
      {
        code: "IT",
        name: "Information Technology",
        classes: ["IT - A", "IT - B"],
        years: ["I Year", "II Year", "III Year", "IV Year"]
      }
    ],
    curriculumInfo: {
      regulation: "SKCT Autonomous CBCS 2022",
      semesterFocus: "Hands-on Practical Labs & Continuous Assessment",
      autonomousLabFeatures: [
        "AI-Guided Virtual Assistant for Debugging",
        "Live Lab Submission and Viva Voce Engine",
        "Performance Index Analytics for Faculty"
      ]
    },
    subscriptionPlan: "Enterprise Campus",
    status: "active"
  },
  {
    id: "col_anna_05",
    slug: "anna-univ",
    name: "Anna University University Campus",
    shortName: "Anna Univ",
    code: "0001",
    tagline: "Apex Technical University of Tamil Nadu",
    location: "Guindy, Chennai",
    logo: "/icons/anna-logo.png",
    bannerGradient: "from-[#1e3a8a] via-[#1d4ed8] to-[#2563eb]",
    accentColor: "#2563eb",
    accreditation: ["NAAC A++ Grade", "UGC Recognized", "Category-I University"],
    affiliations: "State University | MHRD NIRF Ranked",
    departments: [
      {
        code: "IST",
        name: "Information Science and Technology",
        classes: ["IST - 1", "IST - 2"],
        years: ["I Year", "II Year", "III Year", "IV Year"]
      },
      {
        code: "CSE",
        name: "Computer Science and Engineering",
        classes: ["CSE - 1", "CSE - 2"],
        years: ["I Year", "II Year", "III Year", "IV Year"]
      }
    ],
    curriculumInfo: {
      regulation: "Anna University Affiliated / University Regulation 2021",
      semesterFocus: "Comprehensive Standard Lab Curriculum",
      autonomousLabFeatures: [
        "Standard Syllabus Mapping for All Engineering Colleges",
        "Universal Lab Manual Alignment",
        "Centralized Performance & Observation Tracking"
      ]
    },
    subscriptionPlan: "Autonomous University",
    status: "active"
  },
  {
    id: "col_demo_06",
    slug: "demo",
    name: "Apex Global Institute of Technology",
    shortName: "Apex Demo",
    code: "9999",
    tagline: "Live Demonstration & Evaluation Portal for Prospective Colleges",
    location: "Innovation Hub",
    logo: "/icons/demo-logo.png",
    bannerGradient: "from-[#701a75] via-[#86198f] to-[#a21caf]",
    accentColor: "#a21caf",
    accreditation: ["AICTE Approved", "NBA Ready", "Multi-Campus Cloud"],
    affiliations: "Multi-Campus Virtual Lab Sandbox Platform",
    departments: [
      {
        code: "CSE",
        name: "Computer Science & Engineering",
        classes: ["CSE - Demo"],
        years: ["I Year", "II Year", "III Year", "IV Year"]
      },
      {
        code: "AIDS",
        name: "Artificial Intelligence & Data Science",
        classes: ["AIDS - Demo"],
        years: ["I Year", "II Year", "III Year", "IV Year"]
      }
    ],
    curriculumInfo: {
      regulation: "Global Autonomous Curriculum Showcase",
      semesterFocus: "All Semester Simulation Modules Enabled",
      autonomousLabFeatures: [
        "Full Feature Sandbox & Student Activation Testing",
        "Sample Material & Lab Manual Uploads",
        "Live Admin CRUD Controls Demonstration"
      ]
    },
    subscriptionPlan: "Pro Department",
    status: "active"
  }
];

export function getCollegeBySlug(slug: string): CollegeData | undefined {
  if (!slug) return undefined;
  const clean = slug.trim().toLowerCase();
  return COLLEGES_REGISTRY.find((c) => c.slug.toLowerCase() === clean);
}
