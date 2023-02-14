import React from "react";
import { useParams } from "react-router-dom";
import Player from "./player";
    
 function Playerid() {

//I use the params here and store them to pass as props 
  let { id } = useParams();

  return (
//I pass the sessionId from the url params as a prop to my SaxjaxApp class component here
      <Player id={id} />
  );
}
    
export default Playerid;