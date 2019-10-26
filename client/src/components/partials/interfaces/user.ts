import { Channel } from "./channel";
import { Team } from "./team";
import { Message } from "./message";
export interface User {
    id: string;
    name: string;
    email: string;
    teams?: Team[];
    channels?: Channel[];
    messages?: Message[];
    created_at: Date;
    updated_at: Date;
}
