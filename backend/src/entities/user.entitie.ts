interface UserI {
  id: number;
  email?: string | null;
  username?: string | null;
  github_id?: string | null;
  google_id?: string | null;
  verified_email: boolean;
  password?: string | null;
  fullname?: string | null;
  avatar?: string | null;
  deleted: boolean;
  created_at: Date;
  UserEmblems: UserEmblemI[];
}

interface EmblemI {
  id: number;
  slug: string;
  name: string;
  image: string;
  created_at: Date;
  UserEmblem: UserEmblemI[];
}

interface UserEmblemI {
  id: number;
  user_id: number;
  user: UserI;
  emblem_id: number;
  emblem: EmblemI;
  created_at: Date;
}
