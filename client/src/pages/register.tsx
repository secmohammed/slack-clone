import React, { useEffect } from "react";
import {
    Container,
    Input,
    Header,
    Button,
    Message,
    Form
} from "semantic-ui-react";
import { useInput } from "../components/partials/hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import REGISTER_USER_MUTATION from "../graphql/users/mutations/REGISTER_USER";

const Register = (props: any) => {
    const { value: name, bind: bindName, reset: resetName } = useInput("");
    const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
    const {
        value: password,
        bind: bindPassword,
        reset: resetPassword
    } = useInput("");

    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.history.push("/");
        }
    });

    const [register, { error, data }] = useMutation(REGISTER_USER_MUTATION, {
        errorPolicy: "all"
    });
    const {
        value: password_confirmation,
        bind: bindPasswordConfirmation,
        reset: resetPasswordConfirmation
    } = useInput("");
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await register({
            variables: {
                email,
                password,
                password_confirmation,
                name
            }
        });

        if (data && data.register) {
            resetName();
            resetEmail();
            resetPassword();
            resetPasswordConfirmation();

            props.history.push("/");
        }
    };
    return (
        <Container text>
            <Header as="h2">Register</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Full name</label>
                    <Input placeholder="name" fluid {...bindName} />
                </Form.Field>
                <Form.Field>
                    <label>E-mail</label>
                    <Input placeholder="email" fluid {...bindEmail} />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <Input
                        placeholder="password"
                        type="password"
                        fluid
                        {...bindPassword}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Confirm your password</label>
                    <Input
                        placeholder="confirm your password"
                        type="password"
                        fluid
                        {...bindPasswordConfirmation}
                    />
                </Form.Field>
                <Button primary> Register</Button>
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

export default Register;
