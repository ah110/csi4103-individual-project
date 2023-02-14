import React, {Component} from 'react';
import './player.css';

class playerStats extends Component {

  constructor(props){
    super(props)
    this.state={
    }
  }

 
  
  render(){//HTML-create table and add more field into the table
    //add season input for checking player different season
  return (
    <div className="playeraverage">  
     <h2>{this.props.val.playerName}</h2>
     <table>
    <tr>
      <th >Stats</th>
      <th >Season Average</th>
    </tr>
    <tr>
      <td>Season:</td>
      <td>{this.props.val.season}</td>
    </tr>
    <tr>
      <td>Game Played:</td>
      <td>{this.props.val.playerStats["games_played"]}</td>
    </tr>
    <tr>
      <td>Minute:</td>
      <td>{this.props.val.playerStats["min"]}</td>
    </tr>
    <tr>
      <td>Point:</td>
      <td>{this.props.val.playerStats["pts"]}</td>
    </tr>
    <tr>
      <td>Rebounds:</td>
      <td>{this.props.val.playerStats["reb"]}</td>
    </tr>
    <tr>
      <td>Assists:</td>
      <td>{this.props.val.playerStats["ast"]}</td>
    </tr>
    <tr>
      <td>Steal:</td>
      <td>{this.props.val.playerStats["stl"]}</td>
    </tr>
    <tr>
      <td>Block:</td>
      <td>{this.props.val.playerStats["blk"]}</td>
    </tr>
    <tr>
      <td>Turnover:</td>
      <td>{this.props.val.playerStats["turnover"]}</td>
    </tr>
    <tr>
      <td>Field Goal %:</td>
      <td>{this.props.val.playerStats["fg_pct"]}</td>
    </tr>
    <tr>
      <td>3 Point %:</td>
      <td>{this.props.val.playerStats["fg3_pct"]}</td>
    </tr>
    <tr>
      <td>Free Throw %:</td>
      <td>{this.props.val.playerStats["ft_pct"]}</td>
    </tr>
  </table>
  

    
    </div>
  );
}
}
export default playerStats;
