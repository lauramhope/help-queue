import React from "react";
import Header from "./Header";
import TicketControl from "./TicketControl";
import MyStyledComponent from "./MyStyledComponent";

function App(){
  return ( 
    <React.Fragment>
      <Header />
      <TicketControl />
      <MyStyledComponent />
    </React.Fragment>
  );
}

export default App;