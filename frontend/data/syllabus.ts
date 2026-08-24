export interface ReferenceBook {
  id: string;
  title: string;
  author: string;
  publisher: string;
  edition: string;
  isbn?: string;
  coverColor: string;
}

export interface UniversitySyllabus {
  university: string;
  courseCode: string;
  courseTitle: string;
  semester: string;
  regulations: string;
  units: {
    unit: string;
    title: string;
    topics: string[];
  }[];
}

export const REFERENCE_BOOKS_DATA: ReferenceBook[] = [
  {
    id: "clrs",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    publisher: "MIT Press / PHI Learning",
    edition: "4th Edition (2022)",
    isbn: "978-0262046305",
    coverColor: "from-blue-600 to-indigo-800"
  },
  {
    id: "goodrich",
    title: "Data Structures and Algorithms in Java / C++",
    author: "Michael T. Goodrich, Roberto Tamassia, Michael H. Goldwasser",
    publisher: "John Wiley & Sons",
    edition: "6th Edition",
    isbn: "978-1118771334",
    coverColor: "from-purple-600 to-violet-800"
  },
  {
    id: "thareja",
    title: "Data Structures Using C",
    author: "Reema Thareja",
    publisher: "Oxford University Press",
    edition: "2nd Edition",
    isbn: "978-0198099307",
    coverColor: "from-emerald-600 to-teal-800"
  },
  {
    id: "sahni",
    title: "Data Structures, Algorithms and Applications in C++",
    author: "Sartaj Sahni",
    publisher: "Universities Press / Silicon Press",
    edition: "2nd Edition",
    isbn: "978-0929306322",
    coverColor: "from-amber-600 to-orange-800"
  },
  {
    id: "horowitz",
    title: "Fundamentals of Data Structures in C",
    author: "Ellis Horowitz, Sartaj Sahni, Susan Anderson-Freed",
    publisher: "Universities Press",
    edition: "2nd Edition",
    isbn: "978-8173716058",
    coverColor: "from-rose-600 to-pink-800"
  }
];

export const SYLLABUS_MAPPINGS_DATA: UniversitySyllabus[] = [
  {
    university: "Anna University (Regulation 2021)",
    courseCode: "CS3301",
    courseTitle: "Data Structures & Algorithms Laboratory",
    semester: "Semester 3 (B.E / B.Tech CSE & AIDS)",
    regulations: "R2021",
    units: [
      {
        unit: "Unit I",
        title: "Linear Data Structures - List, Stack, Queue",
        topics: [
          "Array and Linked implementations of List ADT",
          "Stack ADT: Push, Pop, Infix to Postfix conversion",
          "Queue ADT: Linear Queue, Circular Queue implementation",
          "Applications of Stack and Queue in recursion and scheduling"
        ]
      },
      {
        unit: "Unit II",
        title: "Non-Linear Data Structures - Trees",
        topics: [
          "Tree ADT, Binary Tree, Binary Search Tree (BST) operations",
          "Tree Traversals: Inorder, Preorder, Postorder",
          "AVL Trees, Balance factors, Rotations (LL, RR, LR, RL)",
          "Binary Heaps, Priority Queue operations"
        ]
      },
      {
        unit: "Unit III",
        title: "Sorting and Searching Algorithms",
        topics: [
          "Bubble Sort, Selection Sort, Insertion Sort",
          "Merge Sort, Quick Sort divide-and-conquer",
          "Linear and Binary Search complexity analysis"
        ]
      }
    ]
  },
  {
    university: "Osmania University / JNTU Hyderabad",
    courseCode: "CS301PC",
    courseTitle: "Data Structures and Laboratory",
    semester: "B.Tech II Year I Sem",
    regulations: "R22",
    units: [
      {
        unit: "Module 1",
        title: "Stacks and Queues",
        topics: [
          "ADT Stack and its operations using static and dynamic arrays",
          "Queue ADT and Circular Queue array implementations",
          "Stack applications: Balancing symbols, evaluation of expressions"
        ]
      },
      {
        unit: "Module 2",
        title: "Linked Lists and Applications",
        topics: [
          "Singly Linked Lists, Doubly Linked Lists, Circular Linked Lists",
          "Polynomial arithmetic using linked list representation",
          "Dynamic memory management and cursor implementation"
        ]
      },
      {
        unit: "Module 3",
        title: "Sorting Strategies",
        topics: [
          "Internal Sorting: Bubble, Insertion, Selection Sort",
          "Comparative asymptotic space and time analysis"
        ]
      }
    ]
  }
];
