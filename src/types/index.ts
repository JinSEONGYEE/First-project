export type DesignService = 'Figma' | 'Adobe' | 'Canva' | 'Nanobanana' | 'Other';

export interface DesignLink {
  id: string;
  service: DesignService;
  url: string;
  title: string;
  description?: string;
}

export interface TaskPlan {
  id: string;
  title: string;
  description: string;
  designLinks: string[]; // array of DesignLink IDs
  status: 'pending' | 'in-progress' | 'completed';
}

export interface AppState {
  links: DesignLink[];
  plans: TaskPlan[];
}
