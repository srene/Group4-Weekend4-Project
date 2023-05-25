  
  import { useSigner } from 'wagmi';
  import { useState, useEffect } from 'react';

  
  export function RequestTokens() {
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
    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const amount = formData.get('amount');
        console.log(amount);
        requestTokens(signer,amount,setLoading,setTxData);        
        
        //console.log(formData.get('selectedProposal')+"  "+formData.get("amount"));
      }

    return (
        <div>
          <h1>Request tokens to be minted</h1>
          <form method="post" onSubmit={handleSubmit}>
          <label>
              &nbsp;  Amount: &nbsp; 
              </label>
          <input name="amount" /> &nbsp; 
          <button type="submit">Request tokens</button>
          </form>
        </div>
      );
}

function requestTokens(signer, amount, setLoading, setTxData){
  setLoading(true);
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-type': 'application/json'},
      body: JSON.stringify({ address: signer._address, units: amount})
  };
  console.log(requestOptions)
  fetch('http://localhost:3001/request-tokens', requestOptions)
      .then(response => response.json())
      .then((data) => {
          setTxData(data);
          setLoading(false);
  });
}