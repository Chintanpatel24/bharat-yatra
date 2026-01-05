
export enum AppView {
  DASHBOARD = 'dashboard',
  IDENTITY = 'identity',
  GROUPS = 'groups',
  CHATBOT = 'chatbot',
  VISION = 'vision',
  WALKIE_TALKIE = 'walkie-talkie',
  SETTINGS = 'settings',
  GALLERY = 'gallery',
  RADAR = 'radar'
}

export interface User {
  id: string;
  name: string;
  idNumber: string;
  verified: boolean;
  safetyScore: number;
  location: { lat: number; lng: number };
}

export interface GroupMember {
  id: string;
  name: string;
  status: 'active' | 'away' | 'emergency';
  lastSeen: string;
  location: { lat: number; lng: number };
}

export interface GroundingChunk {
  web?: { uri: string; title: string };
  maps?: { uri: string; title: string };
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  groundingLinks?: GroundingChunk[];
}

export interface LandmarkAnalysis {
  name: string;
  description: string;
  historicalFacts: string[];
  safetyTips: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  image: string;
  description: string;
}
