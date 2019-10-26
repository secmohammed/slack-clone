import React, { useState } from "react";
import Channels from "../components/channels";
import { Team, User } from "../components/partials/interfaces";
import Teams from "../components/teams";
import AddChannelModal from "../components/channels/addChannelModal";
export default ({ me, team }: { me: User; team: Team }) => {
    const [openAddChannelModal, setOpenAddChannelModal] = useState(false);
    const toggleAddChannelModal = () =>
        setOpenAddChannelModal(!openAddChannelModal);
    return (
        <>
            <Teams
                key="team-sidebar"
                teams={me.teams!}
                activeTeamId={team.id}
            />
            <Channels
                key="channels-sidebar"
                teamName={team.name}
                username={me.name}
                channels={team.channels!}
                users={team.members!}
                onAddChannelClick={toggleAddChannelModal}
            />
            <AddChannelModal
                open={openAddChannelModal}
                onClose={toggleAddChannelModal}
                teamId={team.id}
            />
        </>
    );
};
