import React from "react";
import { Icon } from "semantic-ui-react";
import {
    ChannelWrapper,
    PushLeft,
    TeamNameHeader,
    ChannelSidebarListHeader,
    ChannelSidebar
} from "../partials/styles/channels";
import {
    Channel as ChannelInterface,
    User as UserInterface
} from "../partials/interfaces";
import Channel from "./channel";
import User from "./user-channel";
interface ChannelProps {
    teamName: string;
    channels: ChannelInterface[];
    users: UserInterface[];
    username: string;
    onAddChannelClick: any;
    onAddMemberClick: any;
}
export default ({
    teamName,
    channels,
    users,
    username,
    onAddChannelClick,
    onAddMemberClick
}: ChannelProps) => (
    <ChannelWrapper>
        <PushLeft>
            <TeamNameHeader>{teamName}</TeamNameHeader>
            {username}
        </PushLeft>
        <ChannelSidebar>
            <ChannelSidebarListHeader>
                Channels <Icon onClick={onAddChannelClick} name="add circle" />
            </ChannelSidebarListHeader>
            {channels.map(channel => (
                <Channel key={`channel-${channel.id}`} channel={channel} />
            ))}
        </ChannelSidebar>
        <ChannelSidebar>
            <ChannelSidebarListHeader>Direct Messages</ChannelSidebarListHeader>
            {users.map(user => (
                <User key={`user-${user.id}`} user={user} />
            ))}
            <ChannelSidebarListHeader>
                Add new Member
                <Icon onClick={onAddMemberClick} name="add circle" />
            </ChannelSidebarListHeader>
        </ChannelSidebar>
    </ChannelWrapper>
);
