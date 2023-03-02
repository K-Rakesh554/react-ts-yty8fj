import React from 'react';

function Navbar() {
  const displaydate = new Date();
  return (
    <div className="navbar">
      <h1> TO-DO LIST APP</h1>
      <h3>Date:{displaydate.toLocaleDateString()}</h3>
    </div>
  );
}

export default Navbar;
