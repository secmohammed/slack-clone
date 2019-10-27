import React from "react";
import { Message } from "../partials/interfaces";
import { Comment } from "semantic-ui-react";
export default ({ message }: { message: Message }) => (
    <>
        <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
        <Comment.Content>
            <Comment.Author as="a">{message.user.name}</Comment.Author>
            <Comment.Metadata>
                <div>{message.created_at}</div>
            </Comment.Metadata>
            <Comment.Text>{message.text}</Comment.Text>
            <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
        </Comment.Content>
    </>
);
