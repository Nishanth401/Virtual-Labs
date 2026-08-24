export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  experienceYears: number;
  specialization: string[];
  email: string;
  cabin: string;
  avatar: string;
}

export const FACULTY_DATA: FacultyMember[] = [
  {
    id: 'fac-01',
    name: 'Dr. K. Sangeetha',
    designation: 'Professor & Head of Department',
    qualification: 'Ph.D., M.E., B.E.',
    experienceYears: 18,
    specialization: ['Deep Learning', 'Computer Vision', 'Medical Image Processing'],
    email: 'hod.aids@vsb.ac.in',
    cabin: 'Room 301, Block 3',
    avatar: '👩‍🏫',
  },
  {
    id: 'fac-02',
    name: 'Dr. S. K. Narayanan',
    designation: 'Professor',
    qualification: 'Ph.D., M.Tech.',
    experienceYears: 15,
    specialization: ['Machine Learning', 'Big Data Analytics', 'Distributed Systems'],
    email: 'narayanan.sk@vsb.ac.in',
    cabin: 'Room 304, Block 3',
    avatar: '👨‍🏫',
  },
  {
    id: 'fac-03',
    name: 'Prof. M. Rajesh Kumar',
    designation: 'Associate Professor',
    qualification: 'M.E. (Ph.D.)',
    experienceYears: 11,
    specialization: ['Natural Language Processing', 'Data Structures & Algorithms'],
    email: 'rajesh.m@vsb.ac.in',
    cabin: 'Room 308, Block 3',
    avatar: '👨‍💼',
  },
  {
    id: 'fac-04',
    name: 'Dr. P. Vimaladevi',
    designation: 'Associate Professor',
    qualification: 'Ph.D., M.E.',
    experienceYears: 12,
    specialization: ['Cloud Computing', 'Database Management Systems', 'Information Security'],
    email: 'vimaladevi.p@vsb.ac.in',
    cabin: 'Room 309, Block 3',
    avatar: '👩‍💻',
  },
  {
    id: 'fac-05',
    name: 'Prof. A. Karthikeyan',
    designation: 'Assistant Professor (Sr. Gr.)',
    qualification: 'M.Tech.',
    experienceYears: 8,
    specialization: ['Internet of Things', 'Computer Networks', 'Python Programming'],
    email: 'karthikeyan.a@vsb.ac.in',
    cabin: 'Room 312, Block 3',
    avatar: '👨‍💻',
  },
  {
    id: 'fac-06',
    name: 'Prof. R. Priya',
    designation: 'Assistant Professor',
    qualification: 'M.E.',
    experienceYears: 6,
    specialization: ['Reinforcement Learning', 'Statistics & Probability', 'Data Analytics'],
    email: 'priya.r@vsb.ac.in',
    cabin: 'Room 315, Block 3',
    avatar: '👩‍🔬',
  },
];
