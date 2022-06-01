import React from 'react';
import { logout } from '../services/authenticate';

function Logout() {

  function handleClick() {
    logout()
      .then((data) => {
        if (data.success) {
          window.location.replace("/admin/login");
        }
      })
  }

  return (
    <button className="btn btn-secondary btn-lg" onClick={handleClick}> Logout </button>
  );
}

export default Logout;