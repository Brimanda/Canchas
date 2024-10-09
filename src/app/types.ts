export interface Concept {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    images: string[];
    video? : string;
    created_at: string; 
    is_completed: boolean;
  }
  
  export interface Model {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    images: string[];
    video?: string; 
    created_at: string; 
    is_completed: boolean;
  }
  