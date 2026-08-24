export interface ResourceItem {
  subject: string;
  title: string;
  unit: number | 'All';
  type: 'Notes' | 'Videos' | 'Papers' | 'Code' | 'PPTs' | 'Books' | 'Lab Manual' | 'Assignments';
  format: 'PDF' | 'Video' | 'Python' | 'PPT' | 'Book';
  fileUrl: string;
  downloadCount?: number;
}

export const RESOURCES_DATA: ResourceItem[] = [
  {
    subject: 'Machine Learning',
    title: 'Unit 1 — Introduction to ML, Data Preprocessing & Scikit-Learn',
    unit: 1,
    type: 'Notes',
    format: 'PDF',
    fileUrl: '#',
    downloadCount: 342,
  },
  {
    subject: 'Machine Learning',
    title: 'Unit 3 — Supervised Learning (SVM, Decision Trees, Ensemble)',
    unit: 3,
    type: 'Notes',
    format: 'PDF',
    fileUrl: '#',
    downloadCount: 289,
  },
  {
    subject: 'Data Structures',
    title: 'Binary Trees, AVL Balancing & Traversal Techniques Lecture',
    unit: 4,
    type: 'Videos',
    format: 'Video',
    fileUrl: '#',
    downloadCount: 512,
  },
  {
    subject: 'Database Management Systems',
    title: 'Anna University Exam 2025 Solved Question Paper with Answer Keys',
    unit: 'All',
    type: 'Papers',
    format: 'PDF',
    fileUrl: '#',
    downloadCount: 680,
  },
  {
    subject: 'Deep Learning',
    title: 'CNN Image Classification Notebook with PyTorch & GPU acceleration',
    unit: 2,
    type: 'Code',
    format: 'Python',
    fileUrl: '#',
    downloadCount: 420,
  },
  {
    subject: 'Computer Networks',
    title: 'OSI Model, Subnetting, and TCP/IP Packet Routing Presentation',
    unit: 1,
    type: 'PPTs',
    format: 'PPT',
    fileUrl: '#',
    downloadCount: 195,
  },
  {
    subject: 'Natural Language Processing',
    title: 'Speech & Language Processing TextBook — Jurafsky & Martin (3rd Ed)',
    unit: 'All',
    type: 'Books',
    format: 'Book',
    fileUrl: '#',
    downloadCount: 730,
  },
  {
    subject: 'Data Structures Lab',
    title: 'Virtual Lab Experiments Manual & Step-by-Step Code Guide',
    unit: 'All',
    type: 'Lab Manual',
    format: 'PDF',
    fileUrl: '#',
    downloadCount: 890,
  },
  {
    subject: 'Object Oriented Programming',
    title: 'Assignment 2 — Polymorphism, Virtual Functions & Templates Solutions',
    unit: 3,
    type: 'Assignments',
    format: 'PDF',
    fileUrl: '#',
    downloadCount: 210,
  },
];
