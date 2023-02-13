import React, {Component} from 'react';
import axios from "axios";
import './player.css';

class player extends Component {
  constructor(props){
    super(props)
    this.state={
      playerName: "",
      suggestions: [],
      playerStats: {},
      season: (new Date()).getFullYear()
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getPlayerId();
  }
  handleInputChange = (event) => {
    const replace = event.target.value.split(" ").join("_");
    this.setState({ playerName: replace }, () => {
      this.getSuggestions();
    });
  };

  getSuggestions = () => {
    axios
      .get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
      .then((res) => {
        this.setState({ suggestions: res.data.data });
      })
      .catch((err) => {
        console.log(err);
        alert('An error occurred while retrieving player suggestions. Please try again later.');
      });
  };

  handleSelection = (selectedPlayerId) => {
    this.setState({ selectedPlayerId });
  };

  playerSeasomHandleChange = (event) => {
    this.setState({season: event.target.value})
  }

  getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
    .then(async res => {
      if(res.data.data[0] === undefined){
        alert(`No player found with the name '${this.state.playerName.replace("_", " ")}' for the season ${this.state.season}.`);
      } else if(res.data.data.length > 1){
        alert("Multiple players found with the same name, please specify the name more.");
      } else{
        await this.getPlayerStats(res.data.data[0].id);
      }
    }).catch(err => {
      console.log(err);
      alert("An error occurred while retrieving the player information. Please try again later.");
    });
  }

  getPlayerStats = (playerId) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${this.state.season}&player_ids[]=${playerId}`)
    .then(async res => {
      if(res.data.data[0] === undefined){
        alert(`No stats found for the player '${this.state.playerName.replace("_", " ")}' in the season ${this.state.season}.`);
      }  else{
        this.setState({ playerStats: res.data.data[0]});
      }
    }).catch(err => {
      console.log(err);
      alert("An error occurred while retrieving the player stats. Please try again later.");
    });
  }
  
  render(){//HTML-create table and add more field into the table
    //add season input for checking player different season
    const {suggestions}=this.state;
  return (
    <div className="App">  
     <form onSubmit={this.handleSubmit}>
       <label>
         Name
         <input 
          type="text"
          value={this.state.playerName}
          onChange={this.handleInputChange}
          placeholder="please enter players name"
         />
         {suggestions.length > 0 && (
          <ul>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => this.handleSelection(suggestion.id)}
              >
                {suggestion.first_name} {suggestion.last_name}
              </li>
            ))}
          </ul>
        )}
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
export default player;
