import React from "react";
import ticketsImage from "./../img/tickets.png";

function Header(){
  return (
    <React.Fragment>
      <h1>Help Desk Queue</h1>
      <img src={ticketsImage} alt="An image of tickets" />
    </React.Fragment>
  );
}

export default Header;