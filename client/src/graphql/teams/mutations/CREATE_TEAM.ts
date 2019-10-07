import { gql } from "apollo-boost";

export default gql`
    mutation createTeam($name: String!) {
        createTeam(data: { name: $name }) {
            id
        }
    }
`;
