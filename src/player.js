import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import axios from "axios";
import './player.css';
import { Link} from "react-router-dom";
import PlayerAverage from './playerStats';


class player extends Component {
  constructor(props){
    super(props)
    this.state={ 
      playerName: "",
      suggestions: [],
      playerStats: {},
      season: (new Date()).getFullYear()-1,
      showPlayerStats: false
    }
  }
  componentDidMount() {
    // here you have the id
    if(this.props.id){
    const id = this.props.id;
    this.getPlayerStats(id);
    this.getPlayerFullName(id);
    }
  }
  
  handleInputChange = (event) => {
    this.setState({ playerName: event.target.value }, () => {
      this.getSuggestions();
    });
    this.setState({ showPlayerStats: false });
  };

  getPlayerFullName = (id) => {
    axios.get(`https://www.balldontlie.io/api/v1/players/${id}`)
      .then(res => {
        this.setState({playerName: res.data.first_name + " " + res.data.last_name});
      })
      .catch(err => {
        console.log(err);
        alert("An error occurred while retrieving the player information. Please try again later.");
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



  playerSeasomHandleChange = (event) => {
    this.setState({season: event.target.value});
    this.setState({ showPlayerStats: false });
  }

  getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
    .then(async res => {
      if(res.data.data[0] === undefined){
        alert(`No player found with the name '${this.state.playerName}' for the season ${this.state.season}.`);
      } else if(res.data.data.length > 1){
        alert("Multiple players found with the same name, please specify the name more.");
      } else{
        this.getPlayerStats(res.data.data[0].id);
        this.getPlayerFullName(res.data.data[0].id);
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
        this.setState({ showPlayerStats: true });
      }
    }).catch(err => {
      console.log(err);
      alert("An error occurred while retrieving the player stats. Please try again later.");
    });
  }

    getPlayerStatsID = (suggestion) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?&player_ids[]=${suggestion.id}`)
    .then(async res => {
      if(res.data.data[0] === undefined){
        alert(`No stats found for the player '${suggestion.first_name}'${suggestion.last_name}' in the season 2022-2023.`);
      }  else{
        this.getPlayerFullName(suggestion.id);
        this.setState({ playerStats: res.data.data[0]});
        this.setState({ showPlayerStats: true });
      }
    }).catch(err => {
      console.log(err);
      alert("An error occurred while retrieving the player stats.");
    });
  }
  

  
  
  render(){//HTML-create table and add more field into the table
    //add season input for checking player different season
    //const { id } = this.props.match.params;
    //this.getPlayerId(id);
    const {suggestions}=this.state;
  return (
    
    <div className="App">  

       <label>
            Player Name
         <input 
          type="text"
          value={this.state.playerName}
          onChange={this.handleInputChange}
          placeholder="please enter players name"
         />
         {suggestions.length > 0 && (
          <ul>
            {suggestions.map((suggestion) => (
              <li onClick={() => this.getPlayerStatsID(suggestion)}>
                 <Link to={{ pathname: "/player/" + suggestion.id }}>
                 {suggestion.first_name} {suggestion.last_name}
          </Link>
              </li>
            ))}
          </ul>
        )}
       </label>
       <br />
       <label for="years">Season (between 1979 and 2022):</label>
  <input type="number" id="season"  min="1979" max="2022" value={this.state.season} onChange={this.playerSeasomHandleChange}></input>
  <Button bsstyle="info" onClick={() =>  {
    this.getPlayerId();
  }}>

Submit

</Button>

     {this.state.showPlayerStats && (
         <PlayerAverage val={this.state} />
       )}
    </div>

  );
}
}
export default player;
