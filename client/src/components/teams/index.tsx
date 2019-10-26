import React from "react";
import { Team as TeamInterface } from "../partials/interfaces";
import { TeamWrapper, TeamList, TeamListItem } from "../partials/styles/teams";
import Team from "./team";
import { Icon } from "semantic-ui-react";

export default ({
    teams,
    activeTeamId
}: {
    teams: TeamInterface[];
    activeTeamId: string;
}) => (
    <TeamWrapper>
        <TeamList>
            {teams.map(team => (
                <Team
                    team={team}
                    key={`team-${team.id}`}
                    isActive={team.id === activeTeamId}
                />
            ))}
            <TeamListItem>
                <Icon name="search" />
            </TeamListItem>
        </TeamList>
    </TeamWrapper>
);
