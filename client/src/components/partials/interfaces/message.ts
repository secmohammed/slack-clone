import { User } from "./user";
import { Channel } from "./channel";

export interface Message {
    id: string;
    text: string;
    user?: User;
    channel?: Channel;
}
