import React, { useState } from "react";
import Channels from "../components/channels";
import { Team, User } from "../components/partials/interfaces";
import Teams from "../components/teams";
import AddChannelModal from "../components/channels/addChannelModal";
import InvitePeopleModal from "../components/channels/invitePeopleModal";
export default ({ me, team }: { me: User; team: Team }) => {
    const [
        openAddChannelModalStatus,
        setOpenedAddChannelModalStatus
    ] = useState(false);
    const [
        openInvitationModalStatus,
        setOpenedInvitationModalStatus
    ] = useState(false);
    const togglePeopleInvitationModal = () =>
        setOpenedInvitationModalStatus(!openInvitationModalStatus);
    const toggleAddchannelModalStatus = () =>
        setOpenedAddChannelModalStatus(!openAddChannelModalStatus);
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
                onAddChannelClick={toggleAddchannelModalStatus}
                onAddMemberClick={togglePeopleInvitationModal}
            />
            <AddChannelModal
                open={openAddChannelModalStatus}
                onClose={toggleAddchannelModalStatus}
                teamId={team.id}
            />
            <InvitePeopleModal
                teamId={team.id}
                onClose={togglePeopleInvitationModal}
                open={openInvitationModalStatus}
                key="invite-people-modal"
            />
        </>
    );
};
