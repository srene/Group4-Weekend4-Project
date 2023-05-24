import * as React from 'react';
import Router, { useRouter } from "next/router";
import { useSigner } from 'wagmi';
import {ethers, Contract} from 'ethers';
import * as tokenJson from './assets/MyERC20Votes.json';

export function Delegate() {
  const [txData, setTxData] = React.useState(null);
	const [isLoading, setLoading] = React.useState(false);
  const { data:signer} = useSigner();
  const router = useRouter();

  const provider = new ethers.providers.InfuraProvider("sepolia",provess.env.INFURA_API_KEY);
   //console.log("TOKEN address"+process.env.REACT_APP_TOKEN_CONTRACT);
   const tokenContract = new Contract(TOKEN_ADDRESS, tokenJson.abi, provider);

    return (
      <div>
        <h1>Delegate The Voting Power</h1>
        <button onClick={async () => await delegate(signer, signer._address, tokenContract, setLoading, setTxData)}>
          Delegate
        </button>
        { 
            isLoading? <p>Delegating voting power...</p> : <p></p>
          }
          {
            txData? <p>Delegation is done {txData}</p> : <p></p>
          }
      </div>
    )
    
  }

 async function delegate(signer, address, tokenContract, setLoading, setTxData){
   setLoading(true);
   tokenContract.connect(signer).delegate(address)
       .then(() => {
         setTxData(data);
         setLoading(false);
         console.log("Delegation Done!");
       }).catch((err) => {
         console.log(err);
       });
 }

   
 


 