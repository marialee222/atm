const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];

  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"></input>
    </label>
  );
};



const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(null); // Change initial state to null
  const [atmMode, setAtmMode] = React.useState('');
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [error, setError] = React.useState('');


  let status = `Account Balance $ ${totalState}`;

  const handleChange = (event) => {
    const amount = Number(event.target.value);
    if (amount <= 0) {
      setValidTransaction(false);
      setError('');
      return;
    }
    if (atmMode === 'Cash Back' && amount > totalState) {
      setValidTransaction(false);
      setError('Cashback amount cannot exceed the account balance.');
    } else {
      setValidTransaction(true);
      setError('');
    }
    setDeposit(amount);
  };
  
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    // Reset the input value
    document.getElementById('number-input').value = '';
    event.preventDefault();
  };


  const handleModeSelect = (event) => {
    setAtmMode(event.target.value);
    setValidTransaction(false);
    setIsDeposit(event.target.value === 'Deposit'); // Set isDeposit based on selected mode
  };

  return (
    <form onSubmit={handleSubmit}>
      <>
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue</label>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">
            Deposit
          </option>
          <option id="cashback-selection" value="Cash Back">
            Cash Back
          </option>
        </select>
        {atmMode && ( // Render ATMDeposit component when atmMode is selected
          <ATMDeposit
            onChange={handleChange}
            isDeposit={isDeposit}
            isValid={validTransaction}
          />
        )} {error && <p className="error">{error}</p>}
      </>
    </form>
  );
};

ReactDOM.render(<Account />, document.getElementById('root'));
