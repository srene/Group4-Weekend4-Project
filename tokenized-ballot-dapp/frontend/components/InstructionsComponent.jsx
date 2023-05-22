import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import { useSigner, useNetwork, useBalance } from 'wagmi';
import { useState, useEffect } from 'react';

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
				{/*<ApiInfo></ApiInfo>*/}
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
		<RequestTokens></RequestTokens>
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

function Voting(){
	const {data: signer, isError, isLoading } = useSigner();
	const { chain, chains } = useNetwork();
	if(signer) return (
		<>
		<p><b>Voting:</b></p>
		<button onClick={() => vote()}>Cast Vote</button>
		<button onClick={() => delegate()}>Delegate Votes</button>
		<VoteResults></VoteResults>
		</>
	)
	if(isLoading) return (
		<>
		<p>Wait a while, the wallet is loading</p>
		</>	
	)
	return (
		<>
		<p>My wallet info</p>
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

function VoteResults(){
	
}

/*function signMessage(signer, message) {
	signer.signMessage(message).then(
		(response) => {console.log(response)},
		(error) => {console.error(error)}
	)
}

function ApiInfo() {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);
   
	useEffect(() => {
	  setLoading(true);
	  fetch('https://random-data-api.com/api/v2/users')
		.then((res) => res.json())
		.then((data) => {
		  setData(data);
		  setLoading(false);
		});
	}, []);
   
	if (isLoading) return <p>Loading...</p>;
	if (!data) return <p>No profile data</p>;
   
	return (
	  <div>
		<h1>{data.username}</h1>
		<p>{data.email}</p>
	  </div>
	);
  }*/
  
  function RequestTokens() {
	  const { data: signer } = useSigner();
	  const [txData, setTxData] = useState(null);
	  const [isLoading, setLoading] = useState(false);
	  if (txData) return (
		  <div>
			  <p>Transaction completed!</p>
			  <a href={"https://sepolia.etherscan.io/tx/" + txData.hash} target="_blank">{txData.hash}</a>
		  </div>
	  )
	  if (isLoading) return <p>Requesting tokens to be minted...</p>;
	  return (
		  <div>
			<h1>Request tokens to be minted</h1>
			<button onClick={() => requestTokens(signer,"anything",setLoading,setTxData)}>Request tokens</button>
		  </div>
		);
  }

  function requestTokens(signer, signature, setLoading, setTxData){
	setLoading(true);
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-type': 'application/json'},
		body: JSON.stringify({ address: signer._address, signature: signature})
	};
	console.log(requestOptions)
	fetch('http://localhost:3001/request-tokens', requestOptions)
		.then(response => response.json())
		.then((data) => {
			setTxData(data);
			setLoading(false);
	});
  }