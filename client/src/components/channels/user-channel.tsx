import React from "react";
import { User } from "../partials/interfaces";
import { Icon } from "semantic-ui-react";
import { ChannelSidebarListItem } from "../partials/styles/channels";
const Bubble = ({ on = true }) =>
    on ? (
        <Icon name="circle" size="small" color="teal"></Icon>
    ) : (
        <Icon name="circle outline" size="small" color="grey" />
    );
export default ({ user }: { user: User }) => (
    <ChannelSidebarListItem key={`user-${user.id}`}>
        <Bubble />
        {user.name}
    </ChannelSidebarListItem>
);
