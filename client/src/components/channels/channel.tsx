import React from "react";
import { Channel } from "../partials/interfaces/channel";
import { ChannelSidebarListItem } from "../partials/styles/channels";
import { useParams, Link } from "react-router-dom";
export default ({ channel }: { channel: Channel }) => {
    const { id } = useParams();

    return (
        <Link to={`/teams/${id}/${channel.id}`} key={`channel-${channel.id}`}>
            <ChannelSidebarListItem>{` # ${channel.name}`}</ChannelSidebarListItem>
        </Link>
    );
};
