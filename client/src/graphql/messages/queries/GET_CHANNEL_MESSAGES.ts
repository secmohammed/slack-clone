import { gql } from "apollo-boost";
export default gql`
    query Messages($id: String!) {
        messages(data: { id: $id }) {
            id
            text
            user {
                id
                name
            }
        }
    }
`;
