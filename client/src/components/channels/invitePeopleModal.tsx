import React from "react";
import { Form, Modal, Input, Button, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { User } from "../partials/interfaces";
import ADD_MEMBER_TO_TEAM_MUTATION from "../../graphql/members/mutations/STORE_MEMBER";
import { useInput } from "../../components/partials/hooks/useInput";
import SHOW_TEAM_QUERY from "../../graphql/teams/queries/SHOW_TEAM";
export default ({
    open,
    onClose,
    teamId
}: {
    open: boolean;
    onClose: any;
    teamId: string;
}) => {
    const [member, { error }] = useMutation(ADD_MEMBER_TO_TEAM_MUTATION);
    const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await member({
            variables: {
                email,
                teamId
            },
            update: (store, { data: { storeMember } }) => {
                const data: any = store.readQuery({
                    query: SHOW_TEAM_QUERY,
                    variables: {
                        id: teamId
                    }
                });
                if (
                    !data.showTeam.members.some(
                        (member: User) => storeMember.id === member.id
                    )
                ) {
                    data.showTeam.members.push(storeMember);
                    store.writeQuery({
                        query: SHOW_TEAM_QUERY,
                        variables: {
                            id: teamId
                        },
                        data
                    });
                }
                if (storeMember) {
                    resetEmail();
                    onClose();
                }
            }
        });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Modal.Header>Add new member via email.</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <Input
                            name="email"
                            fluid
                            placeholder="member email."
                            {...bindEmail}
                        />
                    </Form.Field>
                    <Form.Group widths="equal">
                        <Button fluid default onClick={onClose}>
                            Cancel
                        </Button>
                        <Button fluid primary>
                            Add Member.
                        </Button>
                    </Form.Group>
                    {error &&
                        error.graphQLErrors.map(({ message }, i) => (
                            <Message negative key={i}>
                                <Message.Header>Error</Message.Header>
                                <p>{message}</p>
                            </Message>
                        ))}
                </Form>
            </Modal.Content>
        </Modal>
    );
};
