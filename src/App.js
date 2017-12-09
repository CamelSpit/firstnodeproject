import React, { Component } from 'react';
import './reset.css';
import './App.css';
import Opponent1 from "./Components/Opponent1";
import Opponent2 from "./Components/Opponent2";
import axios from "axios";

class App extends Component {
  constructor(){
    super()

    this.state = {
      name1: "",
      name2: "",
      photo1: "",
      photo2: "",
      loser: '',
      champion: '',
      joke: '',
      monsterName: ''
    }
  }

updateName1 (newString){
  this.setState({
    name1: newString
  })
}

updateName2 (newString){
  this.setState({
    name2: newString
  })
}

updatephoto1(newurl){
  this.setState({
    photo1: newurl
  })
}

updatephoto2(newurl){
  this.setState({
    photo2: newurl
  })
}

fight(){
  let joke = axios.get(`	
  http://api.icndb.com/jokes/random?firstName=${this.state.name1}&amp;lastName=${this.state.monsterName}`).then(res=>{
    this.setState({
      joke: res.data.value.joke
    })
  })
  let ap1 = Math.floor(Math.random()*300) + 1;
  let ap2 = Math.floor(Math.random()*300) + 1;
  var loser = '';
  var champion = '';

  if (ap1>ap2) {
    champion = this.state.name1;
    loser = this.state.name2;
  }
  else {
    loser = this.state.name1;
    champion = this.state.name2;
  }
  console.log(loser);
  console.log(champion);

  axios.get("/api/pending").then(res=>{
    console.log(res)
    }).catch(console.log());

  setTimeout(() =>{
  this.setState({
    loser: loser,
    champion: champion
  })},5000)

}

  render() {
    console.log(this.state.champion);
    console.log(this.state.loser);
    return (
      <section>
        <div>
        <h1>Welcome to the THUNDERDOME!</h1>
        <h2>Two men enter. One man leaves...</h2>
        </div>

        <section className="topSection">
          <div className="inputs">
          <div className="input1">
            <input placeholder="Insert Name" onChange={event=>this.updateName1(event.target.value)}/>
            <input placeholder="Insert Photo URL" onChange={event=>this.updatephoto1(event.target.value)}/>
          </div>

          <div className="input2"> 
            <input placeholder="Insert Name" onChange={event=>this.updateName2(event.target.value)}/>
            <input placeholder="Insert Photo URL" onChange={event=>this.updatephoto2(event.target.value)}/>
          </div>
          </div>

          <div>
            <button onClick={event=>this.fight()}>FIGHT!</button>
          </div>
        </section>

        <section>
          <Opponent1 name={this.state.name1} photo={this.state.photo1}/>
          <Opponent2 name={this.state.name2} photo={this.state.photo2}/>
        </section>

        <div>
          <p>
          Champion: {this.state.champion} <br/>
          {this.state.joke} <br/>
          Loser: {this.state.loser} <br/>
          </p>
        </div>


      </section>
    );
  }
}

export default App;
