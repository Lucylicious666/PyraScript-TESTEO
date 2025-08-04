import React, { useState } from 'react';

const Wallet = () => {
  const [balance, setBalance] = useState(1000); // Ejemplo de saldo inicial

  return (
    <div>
      <h2>Wallet</h2>
      <p>Current Balance: ${balance}</p>
      <button onClick={() => setBalance(balance + 100)}>Add Funds</button>
    </div>
  );
};

export default Wallet;