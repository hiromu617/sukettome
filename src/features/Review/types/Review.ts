import { User } from '../../User';

export type Review = {
  id: number;
  created_at: string;
  body: string;
  rate: number;
  user_id: string;
  product_id: number;
  users: User;
};
