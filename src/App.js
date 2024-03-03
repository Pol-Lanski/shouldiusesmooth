import React, { useState } from 'react';
import './App.css';


function App() {
  const [validators, setValidators] = useState(''); // Validators that the user will input
  const [result, setResult] = useState(''); // The result of the API check
  const [data, setData] = useState(null); // Store the data from the API
  const [isSubmitted, setIsSubmitted] = useState(false); // To check if the form is submitted


  const checkValidators = async () => {
    if (isSubmitted) {
      setValidators('');
      setResult('');
      setData(null);
      setIsSubmitted(false);
    }
    else {
      try {
        const response = await fetch('https://smooth.dappnode.io/api/memory/statistics');
        const data = await response.json();
        setData(data);

        if (validators > data.total_subscribed_validators) {
          setResult('No');
        } else {
          setResult('Yes');
        }

        setIsSubmitted(true); 
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>      
  <h1>Should you join Smooth?</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label>
            How many validators do you have?
          </label>
          <input 
            type="number" 
            className="input-field" 
            value={validators} 
            onChange={e => {
              const val = e.target.value;
              if ((val === "" || (Number.isInteger(Number(val)) && Number(val) >= 0)) && val.length <= 8) {
                setValidators(val);
              }
            }} 
            disabled={isSubmitted} // Disable the input field after the form is submitted
          />
        </div>
        <button onClick={checkValidators}>{isSubmitted ? 'Restart' : 'Should you?'}</button>
      {result && <div>
        {result === 'Yes' ? (
          <div>
            <p>Yes! It makes sense to join smooth if you control less than 50% of the pool's validators. <br /> 
              You have {validators} validators, and there are {data.total_subscribed_validators} validators in the pool.<br />
              <br />
              Join now! <a href="https://smooth.dappnode.io/">https://smooth.dappnode.io/</a><br />
              <br />
              Here are some resources:</p>
              <a href="https://docs.dappnode.io/docs/smooth">Smooth's official documentation</a><br />
              <a href="https://twitter.com/EthereumDenver/status/1763659085507907742">Everything you need to know about Smooth in 20 mins</a><br />
              <a href="https://github.com/htimsk/SPanalysis">Exhaustive modeling of Smoothing Pools for Rocket Pool by Ken Smith</a><br />
              <a href="https://twitter.com/dappnode/status/1763595296624300081">X post on how Smooth participants get 120% more than the median validator</a><br />
            {/* Add more links as needed */}
          </div>
        ) : (
          <div>
            <p>Not yet, wait until the pool has more validators than what you own. <br />
            Smooth is expected to provide smoothing benefits to participants with less than 50% of the validators in the pool <br />
            You have {validators} validators, and there are {data.total_subscribed_validators} validators in the pool.<br />
            <br />
            You can consider donating to the pool and incentivize Solo Stakers by literally bumping their APR, making it more attractive! <br />
            <a href="https://smooth.dappnode.io/donate">https://smooth.dappnode.io/donate</a><br />
            <br />
            Here are some resources:</p>
            <a href="https://docs.dappnode.io/docs/smooth">Smooth's official documentation</a><br />
            <a href="https://twitter.com/EthereumDenver/status/1763659085507907742">Everything you need to know about Smooth in 20 mins</a><br />
            <a href="https://github.com/htimsk/SPanalysis">Exhaustive modeling of Smoothing Pools for Rocket Pool by Ken Smith</a><br />
            <a href="https://twitter.com/dappnode/status/1763595296624300081">X post on how Smooth participants get 120% more than the median validator</a><br />
          </div>
        )}
      </div>}
    </div>
  );
}

export default App;
