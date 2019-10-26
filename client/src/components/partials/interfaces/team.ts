import { User } from "./user";
import { Channel } from "./channel";
export interface Team {
    id: string;
    name: string;
    channels?: Channel[];
    members?: User[];
    owner?: User;
    created_at: Date;
    updated_at: Date;
}
