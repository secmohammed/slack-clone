import React from "react";
import { Team } from "../partials/interfaces";
import { TeamListItem } from "../partials/styles/teams";
import { Link } from "react-router-dom";
export default ({ team, isActive }: { team: Team; isActive: boolean }) => {
    return (
        <Link to={`/teams/${team.id}`}>
            <TeamListItem
                key={`team-${team.id}`}
                style={{
                    backgroundColor: isActive ? "palevioletred" : "#676066"
                }}
            >
                {team.name.charAt(0).toUpperCase()}
            </TeamListItem>
        </Link>
    );
};
