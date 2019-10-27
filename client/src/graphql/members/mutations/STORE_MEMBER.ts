import { gql } from "apollo-boost";

export default gql`
    mutation StoreMember($email: String!, $teamId: String!) {
        storeMember(data: { email: $email, teamId: $teamId }) {
            id
            email
            name
        }
    }
`;
