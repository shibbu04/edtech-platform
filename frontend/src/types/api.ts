export interface Scholarship {
  id: string;
  title: string;
  description: string;
  amount: number;
  deadline: string;
  requirements: string[];
  status: 'open' | 'closed';
  eligibility: string;
  imageUrl?: string;
  link?: string;
}

export interface Application {
  id: string;
  userId: string;
  scholarshipId: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  documents: string[];
}

export interface Profile {
  id: string;
  userId: string;
  education: {
    level: string;
    field: string;
    gpa: number;
    institution: string;
  };
  skills: string[];
  interests: string[];
  achievements: string[];
}