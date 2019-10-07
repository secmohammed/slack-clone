import { gql } from "apollo-boost";
export default gql`
    mutation login($password: String!, $email: String!) {
        login(data: { password: $password, email: $email }) {
            id
            auth_token
        }
    }
`;
