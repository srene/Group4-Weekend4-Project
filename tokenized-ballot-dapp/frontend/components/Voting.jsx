import * as React from 'react';
import Router, { useRouter } from "next/router";
import { useSigner } from 'wagmi';
import * as ballotJson from './assets/TokenizedBallot.json';
import {ethers, Contract} from 'ethers';
import { useState, useEffect } from 'react';

export function Voting() {
  const [txData, setTxData] = useState(null);
	const [loading, setLoading] = useState(false);
  const [voting, setVoting] = useState(false);

  const [errorReason, setError] = useState(null);
  const [data, setData] = useState(null);

  const { data:signer} = useSigner();
  const router = useRouter();
  
  const provider = new ethers.providers.InfuraProvider("sepolia",provess.env.INFURA_API_KEY);

  const ballotContract = new Contract(process.env.BALLOT_ADDRESS, ballotJson.abi, provider);

   async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    let proposalIdx = formData.get('selectedProposal');
    let voteAmount = formData.get('amount');

    await vote(signer, ballotContract, setVoting, setError, setTxData, parseInt(proposalIdx), voteAmount);
    
    
    //console.log(formData.get('selectedProposal')+"  "+formData.get("amount"));
  }

  useEffect(() => {
		setLoading(true);
		fetchData();
	  }, []);
  
	  const fetchData = async () => {

		var index = 0;
		const proposals = [];
		while(true){
	
		  try {

			const proposal = await ballotContract.proposals(index);
			index = index + 1;
			proposals.push({name: ethers.utils.parseBytes32String(proposal.name)});
		  } catch (error) {
			setData(proposals);
			setLoading(false);
      break;
		  }
		}
	   };
     if (loading) return <p>Loading...</p>;
     if (!data) return <p>No voting data</p>;
     if (voting) return <p>Voting...</p>;
     if (errorReason) return <p>Voting Failed: ${errorReason}</p>
     if(txData) return <p>Voted at:  <a href={"https://sepolia.etherscan.io/tx/" + txData.hash} target="_blank">{txData.hash}</a> </p>

      
    return (
        <div>
          <h1>Voting</h1>
           
          <form method="post" onSubmit={handleSubmit}>
              Vote: &nbsp;

              <select name="selectedProposal">
              {data.map((data, index) => (
		          <option value={index}>{data.name}</option>
		          ))}
               
              </select>
              <label>
              &nbsp;  Amount: &nbsp; 
              </label>
              <input name="amount" /> &nbsp; 
              <button type="submit">Vote</button>
          </form>
  
        </div>
    )  
    
  }

  
 async function vote(signer, ballotContract, setVoting, setError, setTxData, propIdx, amount){
   setVoting(true);
   ballotContract.connect(signer).vote(propIdx, ethers.utils.parseUnits(amount))
       .then((data) => {
         setTxData(data);
         setLoading(false);
         console.log("Vote succesful");
       }).catch((err) => {
        setError(err.reason); 
        setVoting(false);
        console.log(err.reason);
       });
 }

   
 


 