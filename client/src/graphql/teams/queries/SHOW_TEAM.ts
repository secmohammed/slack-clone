import { gql } from "apollo-boost";
export default gql`
    query showTeam($id: String!) {
        showTeam(data: { id: $id }) {
            id
            name
            channels {
                id
                name
                messages {
                    id
                    text
                    created_at
                    updated_at
                    user {
                        id
                        name
                    }
                }
            }
            members {
                id
                email
                name
            }
            owner {
                id
                email
            }
        }
    }
`;
