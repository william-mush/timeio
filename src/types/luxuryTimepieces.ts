export interface NotableModel {
  name: string;
  newPrice: string;
  usedPrice: string;
  description: string;
  imageUrl?: string;
  affiliateLink?: string; // URL for "Check Price" / "Buy Now"
}

export interface LuxuryTimepiece {
  id: string;
  name: string;
  description: string;
  history: string;
  notableModels: NotableModel[];
  imageUrl: string;
  brandWebsite: string;
  standout?: string[];
  love?: string[];
  hate?: string[];
  shopLink?: string; // General brand affiliate link
} 