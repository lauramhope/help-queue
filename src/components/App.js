import React from "react";
import Header from "./Header";
import TicketList from "./TicketList";

function App(){
  return ( 
    <React.Fragment>
      <Header />
      <TicketList />
    </React.Fragment>
  );
}

export default App;