import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useQuery } from "@apollo/react-hooks";
import SHOW_TEAM_QUERY from "../../graphql/teams/queries/SHOW_TEAM";
const ShowTeam = () => {
    const history = useHistory();
    const { id } = useParams();
    const { data, error, loading } = useQuery(SHOW_TEAM_QUERY);
    useEffect(() => {
        if (error) {
            history.push("/");
        }
    }, []);
    return <></>;
};

export default ShowTeam;
