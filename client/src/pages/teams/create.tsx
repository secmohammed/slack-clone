import React from "react";
import { useHistory } from "react-router";
import {
    Container,
    Header,
    Button,
    Message,
    Form,
    Input
} from "semantic-ui-react";
import { useInput } from "../../components/partials/hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import CREATE_TEAM_MUTATION from "../../graphql/teams/mutations/CREATE_TEAM";
const CreateTeam = () => {
    const { value: name, bind: bindName, reset: resetName } = useInput("");
    const [createTeam, { error, data }] = useMutation(CREATE_TEAM_MUTATION, {
        errorPolicy: "all"
    });
    const history = useHistory();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await createTeam({
            variables: {
                name
            }
        });

        if (data && data.createTeam) {
            resetName();
            history.push(`/teams/${data.createTeam.id}`);
        }
    };
    return (
        <Container text>
            <Header as="h2">Create Your Team.</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Name</label>
                    <Input placeholder="name" fluid {...bindName} />
                </Form.Field>
                <Button primary> Create Team.</Button>
                {error &&
                    error.graphQLErrors.map(({ message }, i) => (
                        <Message negative key={i}>
                            <Message.Header>Error</Message.Header>
                            {Object.values(message).map(
                                (error: any, key: number) => (
                                    <p key={key}> {error} </p>
                                )
                            )}
                        </Message>
                    ))}
            </Form>
        </Container>
    );
};

export default CreateTeam;
