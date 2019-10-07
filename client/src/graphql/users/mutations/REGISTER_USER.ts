import { gql } from "apollo-boost";
export default gql`
    mutation register(
        $name: String!
        $password: String!
        $password_confirmation: String!
        $email: String!
    ) {
        register(
            data: {
                name: $name
                password: $password
                password_confirmation: $password_confirmation
                email: $email
            }
        ) {
            id
        }
    }
`;
