import React, {Component} from 'react';
import axios from "axios";
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      playerName: null,
      playerStats: {},
      season: '2022'
    }
  }

handleSubmit = (e) => {
  e.preventDefault();
  this.getPlayerId()
  console.log(this.state.playerName)
}

playerNameHandleChange = (event) => {//handle for season input from user, if emoty use current season
  const replace = event.target.value.split(" ").join("_");
  if(replace.length > 0){
    this.setState({playerName: replace})
  } else {
    alert("Please type players name!")
  }
}

playerSeasomHandleChange = (event) => {
    this.setState({season: event.target.value})
}


  getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
    .then(async res => {
      // console.log(res.data.data)
      if(res.data.data[0] === undefined){
        alert("This player is either injured or hasn't played season "+this.state.season)
      } else if(res.data.data.length > 1){
        alert("Pleases specify the name more!")
      } else{
        await this.getPlayerStats(res.data.data[0].id)

      }
    }).catch(err => {
      console.log(err)
    })
  }

  getPlayerStats = (playerId) => {// get player stats base on season and name
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${this.state.season}&player_ids[]=${playerId}`)
    .then(async res => {
      if(res.data.data[0] === undefined){
        alert("This player is either injured or hasn't played season "+this.state.season)
      }  else{
      console.log(res.data.data)
      this.setState({ playerStats: res.data.data[0]})
      }
      
    }).catch(err => {
      console.log(err)
    })
  }
  
  render(){//HTML-create table and add more field into the table
    //add season input for checking player different season
  return (
    <div className="App">  
     <form onSubmit={this.handleSubmit}>
       <label>
         Name
         <input 
          type="text"
          value={this.state.playerName}
          onChange={this.playerNameHandleChange}
          placeholder="please enter players name"
         />
       </label>
       <br />
       <label for="years">Season (between 1979 and 2022):</label>
  <input type="number" id="season"  min="1979" max="2022" value={this.state.season} onChange={this.playerSeasomHandleChange}></input>
       <input type="submit" value="Submit"/>
     </form>
     <h2>{this.state.playerName}</h2>
     <table>
    <tr>
      <th >Stats</th>
      <th >Season Average</th>
    </tr>
    <tr>
      <td>Season:</td>
      <td>{this.state.season}</td>
    </tr>
    <tr>
      <td>Game Played:</td>
      <td>{this.state.playerStats["games_played"]}</td>
    </tr>
    <tr>
      <td>Minute:</td>
      <td>{this.state.playerStats["min"]}</td>
    </tr>
    <tr>
      <td>Point:</td>
      <td>{this.state.playerStats["pts"]}</td>
    </tr>
    <tr>
      <td>Rebounds:</td>
      <td>{this.state.playerStats["reb"]}</td>
    </tr>
    <tr>
      <td>Assists:</td>
      <td>{this.state.playerStats["ast"]}</td>
    </tr>
    <tr>
      <td>Steal:</td>
      <td>{this.state.playerStats["stl"]}</td>
    </tr>
    <tr>
      <td>Block:</td>
      <td>{this.state.playerStats["blk"]}</td>
    </tr>
    <tr>
      <td>Turnover:</td>
      <td>{this.state.playerStats["turnover"]}</td>
    </tr>
    <tr>
      <td>Field Goal %:</td>
      <td>{this.state.playerStats["fg_pct"]}</td>
    </tr>
    <tr>
      <td>3 Point %:</td>
      <td>{this.state.playerStats["fg3_pct"]}</td>
    </tr>
    <tr>
      <td>Free Throw %:</td>
      <td>{this.state.playerStats["ft_pct"]}</td>
    </tr>
  </table>
  

    
    </div>
  );
}
}
export default App;
