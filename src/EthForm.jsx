import React, { useState, useMemo, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { createIcon } from '@download/blockies';
import oc from 'open-color';
import { FiX } from 'react-icons/fi';

const Identicon = styled.div`
    width: 4rem;
    height: 4rem;
    background: url(${props => props.src});
    border-radius: 100%;
`;

const Box = styled.section`
    border: 2px solid ${oc.gray[3]};
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    position: relative;

    h2 {
        color: ${oc.gray[6]};
    }

    strong {
        font-size: 1.4em;
        color: ${oc.gray[8]};
    }
`;

const Close = styled(FiX)`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 1.4em;
    color: ${oc.gray[4]};
    cursor: pointer;

    &:hover {
        opacity: 0.6;
    }
`;

const EthForm = props => {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const identicon = useRef();
    const w3 = useMemo(() => new window.Web3(window.web3.currentProvider), [
        window.Web3
    ]);
    useEffect(() => {
        if (!w3.isAddress(account)) return;
        w3.eth.getBalance(account, w3.eth.defaultBlock, (err, balance) => {
            setBalance(balance);
        });
        console.log(account);
        identicon.current = createIcon({
            seed: account
        }).toDataURL();
    }, [account]);
    const handleEnable = () => {
        if (window.ethereum) {
            window.ethereum.enable().then(accs => setAccount(accs[0]));
        } else {
            setAccount(w3.eth.accounts[0]);
        }
    };
    return account ? (
        <Box>
            {identicon.current && <Identicon src={identicon.current} />}
            <h2>{account}</h2>
            <strong>
                {balance ? (
                    <span>
                        {w3
                            .fromWei(balance, 'ether')
                            .toNumber()
                            .toFixed(4)}
                        &Xi;
                    </span>
                ) : (
                    'loading balance...'
                )}
            </strong>
            <Close onClick={props.onExit} />
            <button>Continue</button>
        </Box>
    ) : (
        <React.Fragment>
            <h1>Hey there!</h1>
            <p>It seems you have an Ethereum wallet connected.</p>
            <p>Would you like to use that for authentication?</p>
            <button onClick={handleEnable}>Sure thing!</button>
            <button onClick={props.onExit}>Nah, I'm good</button>
        </React.Fragment>
    );
};

export default EthForm;
