import { UserI } from "../../../entities/user.entites";

export interface ContextUserProps {
  user: UserI | null;
  setUser: React.Dispatch<React.SetStateAction<UserI | null>>;
  emailForRecovery: string | null;
  setEmailForRecovery: React.Dispatch<React.SetStateAction<string | null>>;
}
