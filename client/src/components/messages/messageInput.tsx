import React from "react";
import { SendMessageInputWrapper } from "../partials/styles/input";
import { Input } from "semantic-ui-react";

export default ({ channelName }: { channelName: string }) => (
    <SendMessageInputWrapper>
        <Input fluid placeholder={`Type a message to #${channelName}`} />
    </SendMessageInputWrapper>
);
