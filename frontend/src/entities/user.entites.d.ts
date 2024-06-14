export interface UserI {
  id: number;
  email?: string | null;
  username?: string | null;
  github_id?: string | null;
  google_id?: string | null;
  verified_email: boolean;
  password?: string | null;
  fullname?: string | null;
  avatar: string;
  points?: number;
  emblems?: EmblemI[];
  created_at: Date;
}

export interface EmblemI {
  id: number;
  slug: string;
  name: string;
  image: string;
  value: number;
  category: string;
  created_at: Date;
}
