import React, { useState } from 'react';

const Support = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Support message sent:', message);
    // Aquí iría la lógica para enviar el mensaje de soporte
  };

  return (
    <div>
      <h2>Support</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Describe your issue"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Support;