import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import './player.css';


class Top10 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: [],
      startDate: '',
      endDate: '',
      selectedStat: 'pts'
    };
  }

 
    getPageNum= () => { 
          axios.get(`https://www.balldontlie.io/api/v1/stats?seasons[]=2022&start_date=${this.state.startDate.toISOString()}&end_date=${this.state.endDate.toISOString()}&per_page=100`)
            .then(async res => {
               this.getTop10(res.data.meta.total_pages);
             
            }).catch(err => {
              console.log(err);
              alert("An error occurred while retrieving the information. Please try again later.");
            });
        }

        getTop10=(pageNum) => {
            let allstats= [];
            let promises = [];
            for (var i=1; i < pageNum+1; i++) {
              promises.push(axios.get(`https://www.balldontlie.io/api/v1/stats?seasons[]=2022&start_date=${this.state.startDate.toISOString()}&end_date=${this.state.endDate.toISOString()}&page=${i}&per_page=100`));
            }
          
            Promise.all(promises)
              .then((responses) => {
                responses.forEach((res) => {
                  allstats = allstats.concat(res.data.data);
                });
                this.setState({stats : allstats});
              })
              .catch((err) => {
                console.log(err);
                alert("An error occurred while retrieving the information. Please try again later.");
              });
          }
          getSelectedStatName() {
            switch (this.state.selectedStat) {
              case "pts":
                return "Points";
              case "ast":
                return "Assists";
              case "reb":
                return "Rebounds";
              case "stl":
                return "Steals";
              case "blk":
                return "Blocks";
              case "fg3m":
                return "3 Point Made";
              case "fgm":
                return "Field Goals Made";
                case "ftm":
                    return "Free Throws Made";
                  case "fg3_pct":
                    return "Three-Point Field Goals Percentage";
                  case "fg_pct":
                    return "Field Goals Percentage";
                  case "fg3a":
                    return "Three-Point Field Goals Attempted";
                  case "fga":
                    return "Field Goals Attempted";
            }
        }


          handleStatChange = (event) => {
            this.setState({selectedStat: event.target.value});
          }
          handleChange = (event) => {
            this.setState({ [event.target.name]: event.target.value });
          };
        
          handleSubmit = (event) => {
            event.preventDefault();
            this.getPageNum();
          };

          handleStartDateChange = (date) => {
            this.setState({ startDate: date });
          };
        
          handleEndDateChange = (date) => {
            this.setState({ endDate: date });
          };
        
          render() {
            let top10 = this.state.stats
              .sort((a, b) => b[this.state.selectedStat] - a[this.state.selectedStat])
              .slice(0, 10)
              .map((stat, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
          <Link to={{ pathname: "/player/" + stat.player.id }}>
            {stat.player.first_name} {stat.player.last_name}
          </Link>
        </td>
                  <td>{stat.team.full_name}</td>
                  <td>{stat[this.state.selectedStat]}</td>
                </tr>
              ));
        
            return (
              <div>
             <form onSubmit={this.handleSubmit}>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleStartDateChange}
            placeholderText="Start Date"
          />
          <DatePicker
            selected={this.state.endDate}
            onChange={this.handleEndDateChange}
            placeholderText="End Date"
          />
          <button type="submit">Get Top 10 Players</button>
        </form>
                <h2>Top 10 NBA Players Stat base on date:</h2>
                <select onChange={this.handleStatChange} value={this.state.selectedStat}>
                <option value="pts">Points</option>
                  <option value="ast">Assists</option>
                  <option value="reb">Rebounds</option>
                  <option value="stl">Steals</option>
                  <option value="blk">Blocks</option>
                  <option value="fg3m">Three-Point Field Goals Made</option>
                  <option value="fgm">Field Goals Made</option>
                  <option value="ftm">Free Throws Made</option>
                  <option value="fg3_pct">Three-Point Field Goals Percentage</option>
                  <option value="fg_pct">Field Goals Percentage</option>
                  <option value="fg3a">Three-Point Field Goals Attempted</option>
                  <option value="fga">Field Goals Attempted</option>
                </select>
                <table>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Player</th>
                      <th>Team</th>
                      <th>{this.getSelectedStatName()}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {top10}
                  </tbody>
                </table>
              </div>
            );
          }
        }
export default Top10;
