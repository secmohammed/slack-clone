import React from "react";
import { MessagesWrapper } from "../partials/styles/messages";
import { Message as MessageInterface } from "../partials/interfaces";
import Message from "./message";
import NEW_MESSAGE_ADDED_TO_CHANNEL_SUBSCRIPTION from "../../graphql/messages/subscriptions/MESSAGE_ADDED";
import { useSubscription } from "@apollo/react-hooks";
export default ({ messages }: { messages: MessageInterface[] }) => {
    const { data, loading } = useSubscription(
        NEW_MESSAGE_ADDED_TO_CHANNEL_SUBSCRIPTION
    );
    if (!loading && data && data.messageAddedToChannel) {
        messages.push(data.messageAddedToChannel);
    }
    return (
        <MessagesWrapper>
            {messages.map((message: MessageInterface) => (
                <Message message={message} key={message.id} />
            ))}
        </MessagesWrapper>
    );
};
