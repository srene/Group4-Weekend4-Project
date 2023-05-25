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

  const provider = new ethers.providers.InfuraProvider("sepolia",process.env.NEXT_PUBLIC_INFURA_KEY);
  const tokenContract = new Contract(process.env.NEXT_PUBLIC_TOKEN_ADDRESS, tokenJson.abi, provider);

    return (
      <div>
        <h1>Delegate voting power</h1>
        <button onClick={() => delegate(signer, signer._address, tokenContract, setLoading, setTxData)}>Delegate</button>
        { 
            isLoading? <p>Delegating voting power...</p> : <p></p>
          }
          {
            txData? <p>Delegation is done {txData}</p> : <p></p>
          }
      </div>
    )
    
  }

  function delegate(signer, address, tokenContract, setLoading, setTxData){
   setLoading(true);
   tokenContract.connect(signer).delegate(address)
       .then(() => {
         setTxData(data);
         setLoading(false);
         console.log("Delegation completed");
       }).catch((err) => {
         console.log(err);
       });
 }

   
 


 