export interface Project {
  id: string;
  title: string;
  category: string; // Changed from enum to string for generic flexibility
  imageUrl: string;
  description: string;
  client?: string;
  year?: string;
  tags: string[];
  tools?: string[];
  orientation?: 'portrait' | 'landscape' | 'square';
}

export interface SocialLink {
  platform: string;
  url: string;
  iconName: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
