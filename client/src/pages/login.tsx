import React, { useEffect } from "react";
import {
    Container,
    Header,
    Button,
    Message,
    Form,
    Input
} from "semantic-ui-react";
import { useInput } from "../components/partials/hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import LOGIN_USER_MUTATION from "../graphql/users/mutations/LOGIN_USER";
const Login = (props: any) => {
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

    const [login, { error, data }] = useMutation(LOGIN_USER_MUTATION, {
        errorPolicy: "all"
    });
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await login({
            variables: {
                email,
                password
            }
        });

        if (data && data.login) {
            localStorage.setItem("token", data.login.auth_token);
            resetEmail();
            resetPassword();
            props.history.push("/");
        }
    };
    return (
        <Container text>
            <Header as="h2">Login</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Email</label>
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
                <Button primary> Login</Button>
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

export default Login;
