import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import oc from 'open-color';

import LoginForm from './LoginForm';
import EthForm from './EthForm';

const Container = styled.main`
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;

    input,
    button {
        display: block;
        margin: 1rem 2rem;
        padding: 1rem 2rem;
        appearance: none;
        border: 2px solid ${oc.gray[4]};
        position: relative;
        border-radius: 4px;

        &:hover {
            border-color: ${oc.violet[3]};
        }

        &:focus {
            outline: none;
            border-color: ${oc.violet[7]};
        }
    }

    button {
        cursor: pointer;
        color: #fff;
        background: ${oc.violet[5]};
        border-color: transparent;
        box-shadow: 2px 2px 8px 1px ${oc.violet[2]};

        &.outline {
            background: none;
            border-color: inherit;
            color: inherit;
            box-shadow: none;
        }
    }
`;

const FormContainer = styled.section`
    display: inline-block;
    width: 50%;
    overflow: hidden;
`;

const Form = styled(animated.form).attrs(props => ({
    onSubmit: e => e.preventDefault()
}))`
    display: flex;
    flex-direction: column;
    align-items: center;

    input,
    button {
        max-width: 250px;
        width: 80%;
    }
`;

const Slider = styled(animated.aside)`
    width: 50%;
    position: absolute;
    height: 100%;
    background: linear-gradient(
        to bottom right,
        ${oc.violet[7]},
        ${oc.violet[9]}
    );
    color: #fff;
    overflow: hidden;
    top: 0;
    display: flex;
    align-items: center;
    text-align: center;
    box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.4);

    button {
        display: block;
        margin: 1rem auto;
    }
`;

const Message = styled(animated.section)`
    width: 100%;
    position: absolute;

    h1 {
        font-size: 2rem;
    }

    h4 {
        margin-top: 2rem;
    }

    button {
        &:hover {
            opacity: 0.8;
        }
    }
`;

const App = props => {
    const [signup, setSignup] = useState(false);
    const [useWallet, setUseWallet] = useState(!!window.web3);
    const { offset } = useSpring({
        offset: signup ? '100' : '0',
        config: { mass: 2, tension: 200, friction: 50 }
    });
    return (
        <Container>
            <FormContainer>
                <Form
                    style={{
                        transform: offset.interpolate(
                            o => `translateX(${100 - o}%)`
                        )
                    }}
                >
                    <h1>Sign Up</h1>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Go Ahead</button>
                </Form>
            </FormContainer>
            <FormContainer>
                <Form
                    style={{
                        transform: offset.interpolate(o => `translateX(-${o}%)`)
                    }}
                >
                    {useWallet ? (
                        <EthForm onExit={() => setUseWallet(false)} />
                    ) : (
                        <LoginForm />
                    )}
                </Form>
            </FormContainer>
            <Slider
                style={{
                    transform: offset.interpolate(o => `translateX(${o}%)`)
                }}
            >
                <Message
                    style={{
                        transform: offset.interpolate(
                            o => `translateX(${150 - 1.5 * o}%)`
                        )
                    }}
                >
                    <h1>Hello, Friend!</h1>
                    To start using Investhing, please sign up.
                    <h4>Already a user?</h4>
                    <button
                        className="outline"
                        onClick={() => setSignup(false)}
                    >
                        Sign In
                    </button>
                </Message>
                <Message
                    style={{
                        transform: offset.interpolate(
                            o => `translateX(-${1.5 * o}%)`
                        )
                    }}
                >
                    <h1>Happy Investhing!</h1>
                    Sign in to view your personal information.
                    <h4>Are you new?</h4>
                    <button className="outline" onClick={() => setSignup(true)}>
                        Sign Me Up!
                    </button>
                </Message>
            </Slider>
        </Container>
    );
};

export default App;
