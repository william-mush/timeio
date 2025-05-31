export interface NotableModel {
  name: string;
  newPrice: string;
  usedPrice: string;
  description: string;
  imageUrl?: string;
}

export interface LuxuryTimepiece {
  id: string;
  name: string;
  description: string;
  history: string;
  notableModels: NotableModel[];
  imageUrl: string;
  standout?: string[];
  love?: string[];
  hate?: string[];
} 