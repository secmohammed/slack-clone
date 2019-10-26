import { gql } from "apollo-boost";
export default gql`
    {
        me {
            id
            name
            email
            teams {
                id
                name
            }
        }
    }
`;
