import { User } from "./user";
import { Team } from "./team";

export interface Channel {
    id: string;
    name: string;
    public: boolean;
    owner?: User;
    team?: Team;
    created_at: Date;
    updated_at: Date;
}
