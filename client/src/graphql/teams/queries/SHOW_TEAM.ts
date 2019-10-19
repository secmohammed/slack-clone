import { gql } from "apollo-boost";
export default gql`
    query showTeam($id: String!) {
        showTeam(id: $id) {
            id
            name
            channels
            owner
        }
    }
`;
