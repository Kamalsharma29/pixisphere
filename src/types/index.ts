export type Photographer = {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  tags: string[];
  profilePic: string;
  styles?: string[];
  bio?: string;
  portfolio?: string[];
  reviews?: {
    name: string;
    rating: number;
    date: string;
    comment: string;
  }[];
};
