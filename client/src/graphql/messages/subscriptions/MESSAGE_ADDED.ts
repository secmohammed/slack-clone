import { gql } from "apollo-boost";

export default gql`
    subscription {
        messageAddedToChannel {
            id
            text
            user {
                id
                name
            }
            created_at
        }
    }
`;
