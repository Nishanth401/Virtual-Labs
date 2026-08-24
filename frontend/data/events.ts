export interface DepartmentEvent {
  id: number;
  title: string;
  type: 'Workshop' | 'Guest Lecture' | 'Seminar' | 'Competition' | 'Department';
  date: string;
  time: string;
  location: string;
  desc: string;
  status: 'upcoming' | 'past';
  registrationUrl?: string;
}

export const EVENTS_DATA: DepartmentEvent[] = [
  {
    id: 1,
    title: 'AI & Machine Learning Bootcamp 2026',
    type: 'Workshop',
    date: '12 Sep 2026',
    time: '9:00 AM – 5:00 PM',
    location: 'Seminar Hall A, Block 3',
    desc: 'Comprehensive hands-on training on classical ML models, feature engineering, and scikit-learn training pipelines. Open to 2nd, 3rd, and 4th year students.',
    status: 'upcoming',
    registrationUrl: '#',
  },
  {
    id: 2,
    title: 'Future of Generative AI — Industry Expert Talk',
    type: 'Guest Lecture',
    date: '25 Sep 2026',
    time: '2:00 PM – 4:00 PM',
    location: 'Main College Auditorium',
    desc: 'A senior Staff AI Engineer from Google discusses LLMs, Prompt Engineering, Retrieval-Augmented Generation (RAG), and agentic production architectures.',
    status: 'upcoming',
    registrationUrl: '#',
  },
  {
    id: 3,
    title: 'High-Impact Research Paper Writing Seminar',
    type: 'Seminar',
    date: '05 Oct 2026',
    time: '10:00 AM – 1:00 PM',
    location: 'Seminar Hall B, Block 3',
    desc: 'Step-by-step guidance by senior researchers on formulating problem statements, conducting literature surveys, LaTeX typesetting, and journal submissions.',
    status: 'upcoming',
    registrationUrl: '#',
  },
  {
    id: 4,
    title: 'Data Science & Predictive Analytics Hackathon 2026',
    type: 'Competition',
    date: '15 Oct 2026',
    time: '9:00 AM – 6:00 PM',
    location: 'Advanced Computing Lab 2, Block 1',
    desc: 'Predictive analytics challenge using anonymized real-world healthcare datasets. Cash awards of ₹25,000 + industry recognition certificates.',
    status: 'upcoming',
    registrationUrl: '#',
  },
  {
    id: 5,
    title: 'Annual Department Technical Symposium & Project Expo',
    type: 'Department',
    date: '20 Oct 2026',
    time: 'All Day Event',
    location: 'Campus Grounds & Department Labs',
    desc: 'Grand showcase of student innovation, capstone project presentations, coding contests, bug-hunting rounds, and technical quizzes.',
    status: 'upcoming',
    registrationUrl: '#',
  },
  {
    id: 6,
    title: 'Generative AI & LLM Systems Hands-On Workshop',
    type: 'Workshop',
    date: '10 Aug 2026',
    time: '10:00 AM – 4:00 PM',
    location: 'Seminar Hall A',
    desc: '2-day intensive workshop on LangChain, vector embeddings, Pinecone, and multi-agent coordination. Attended by 140+ students.',
    status: 'past',
  },
];
