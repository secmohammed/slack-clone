import React from "react";
import { Form, Modal, Input, Button, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import CREATE_CHANNEL_MUTATION from "../../graphql/channels/mutations/CREATE_CHANNEL";
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
    const [createChannel, { error }] = useMutation(CREATE_CHANNEL_MUTATION);
    const { value: name, bind: bindName, reset: resetName } = useInput("");
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await createChannel({
            variables: {
                name,
                teamId
            },
            update: (store, { data: { createChannel } }) => {
                const data: any = store.readQuery({
                    query: SHOW_TEAM_QUERY,
                    variables: {
                        id: teamId
                    }
                });
                data.showTeam.channels.push(createChannel);
                store.writeQuery({
                    query: SHOW_TEAM_QUERY,
                    variables: {
                        id: teamId
                    },
                    data
                });
                if (createChannel) {
                    resetName();
                    onClose();
                }
            }
        });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Modal.Header>Create new channel.</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <Input
                            name="name"
                            fluid
                            placeholder="channel name"
                            {...bindName}
                        />
                    </Form.Field>
                    <Form.Group widths="equal">
                        <Button fluid default onClick={onClose}>
                            Cancel
                        </Button>
                        <Button fluid primary>
                            Create Channel
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
