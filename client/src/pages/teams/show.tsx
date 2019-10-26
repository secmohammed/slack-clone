import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useQuery } from "@apollo/react-hooks";
import SHOW_TEAM_QUERY from "../../graphql/teams/queries/SHOW_TEAM";
import ME_QUERY from "../../graphql/users/queries/ME";
import Messages from "../../components/partials/styles/messages";
import SendMessage from "../../components/messages/messageInput";
import ChannelHeader from "../../components/headers/ChannelHeader";
import Sidebar from "../../containers/Sidebar";
import { Channel } from "../../components/partials/interfaces";
import Layout from "../../components/partials/styles/layout";
const ShowTeam = () => {
    const history = useHistory();
    const { id, channelId } = useParams();
    const userQuery = useQuery(ME_QUERY, {
        ssr: true
    });
    const { data, error, loading } = useQuery(SHOW_TEAM_QUERY, {
        variables: {
            id
        },
        ssr: true
    });
    useEffect(() => {
        if (error || userQuery.error) {
            history.push("/");
        }
    }, [error, history, userQuery]);
    if (!loading && !userQuery.loading) {
        const currentChannel = channelId
            ? data.showTeam.channels.find(
                  (channel: Channel) => channelId === channel.id
              )
            : data.showTeam.channels[0];

        return (
            <Layout>
                <Sidebar me={userQuery.data.me} team={data.showTeam} />

                <ChannelHeader channelName={currentChannel.name} />
                <Messages>
                    <ul className="message-list">
                        <li></li>
                        <li></li>
                    </ul>
                </Messages>
                <SendMessage channelName={currentChannel.name} />
            </Layout>
        );
    }
    return <></>;
};

export default ShowTeam;
