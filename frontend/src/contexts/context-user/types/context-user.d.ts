import { UserI } from "../../../entities/user.entites";

export interface ContextUserProps {
  user: UserI | null;
  setUser: React.Dispatch<React.SetStateAction<UserI | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
