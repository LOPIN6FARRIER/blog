export interface QuotedCardProps {
  quote: string;
  author: string;
}

export interface MasonryProps {
  children: React.ReactNode;
  cols?: number;
  gap?: number;
  maxWidth?: string;
  padding?: string;
}
