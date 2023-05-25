import { useState } from 'react';
import {ethers, Contract} from 'ethers';
import * as ballotJson from './assets/TokenizedBallot.json';

export function WinningProposal() {
    const [data, setData] = useState(null);
	  const [isLoading, setLoading] = useState(true);

  
    const provider = new ethers.providers.InfuraProvider("sepolia",process.env.NEXT_PUBLIC_INFURA_API_KEY);

    const ballotContract = new Contract(process.env.NEXT_PUBLIC_BALLOT_ADDRESS, ballotJson.abi, provider);

    const fetchData = async () => {

    const votingResult = await ballotContract.winnerName();
    console.log(ethers.utils.parseBytes32String(votingResult));
    setData(ethers.utils.parseBytes32String(votingResult));
    setLoading(false);
       };

    fetchData();

    
    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
          <h1>Winning proposal</h1>
          <p>{data}</p>
        </div>
    );
    
  }




 