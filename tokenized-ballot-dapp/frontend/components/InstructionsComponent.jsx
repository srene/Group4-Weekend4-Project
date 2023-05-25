import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import { useSigner, useNetwork, useBalance } from 'wagmi';
import { useState, useEffect } from 'react';
import { WinningProposal } from "./Winning";
import { Voting } from "./Voting";
import { Delegate } from "./Delegate";
import { RequestTokens } from "./RequestTokens";


export default function InstructionsComponent() {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<header className={styles.header_container}>
				<h1>
					Tokenized ballot dapp
				</h1>

			</header>

			<div className={styles.buttons_container}>
				<PageBody></PageBody>
			</div>
			<div className={styles.footer}>
				Group 4 - Weekend4 Project
			</div>
		</div>
	);
}

function PageBody(){
	return (
		<>
		<WalletInfo></WalletInfo>
		</>
	)
}

function WalletInfo(){
	const {data: signer, isError, isLoading } = useSigner();
	const { chain, chains } = useNetwork();
	if(signer) return (
		<>
		<p><b>Wallet info</b></p>
		<p>Your account address is {signer._address}</p>
		<p>Connected to the {chain.name} network</p>
		{/*<button onClick={() => signMessage(signer,"I love potatoes")}>Sign</button>*/}
		<WalletBalance></WalletBalance>
		<Voting></Voting>
		<Delegate></Delegate>
		<RequestTokens></RequestTokens>
		<WinningProposal></WinningProposal>
		</>
	)
	if(isLoading) return (
		<>
		<p>Wait a while, the wallet is loading</p>
		</>	
	)
	return (
		<>
		<p>Connect your wallet, please</p>
		</>
	)
}

function WalletBalance(){
	const { data: signer} = useSigner();
	const { data, isError, isLoading } = useBalance({address: signer._address,
	})
	if(isLoading) return (
		<div>
			Fetching balance..
		</div>
	)
	if(isError) return (
		<div>
			Error fetching balance.
		</div>
	)
	return (
		<div>
			Balance: {data?.formatted} {data?.symbol}
		</div>
	)
}

