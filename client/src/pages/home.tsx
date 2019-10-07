import React from "react";
import FETCH_ALL_USERS_QUERY from "../graphql/users/queries/FETCH_ALL_USERS";
import { useQuery } from "@apollo/react-hooks";

const Home = () => {
    const { loading, data } = useQuery(FETCH_ALL_USERS_QUERY);
    if (!loading) {
        const { users } = data;
        return users.map((user: any) => <h1 key={user.id}> {user.id}</h1>);
    }
    return <h1>Loading..</h1>;
};
export default Home;
