export interface SocialLink {
  platform: string;
  url: string;
  iconName: 'Instagram' | 'Linkedin' | 'Twitter' | 'Mail';
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
  year?: string;
  tools?: string[];
  orientation?: 'portrait' | 'landscape';
  tags?: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}