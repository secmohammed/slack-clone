import { gql } from "apollo-boost";

export default gql`
    mutation CreateChannel($name: String!, $teamId: String!) {
        createChannel(data: { name: $name, teamId: $teamId }) {
            id
            name
        }
    }
`;
