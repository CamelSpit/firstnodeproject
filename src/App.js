import React, { Component } from 'react';
import './reset.css';
import './App.css';
import Opponent1 from "./Components/Opponent1";
import Opponent2 from "./Components/Opponent2";
import axios from "axios";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';


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
      monsterName: '',
      open: false,
      fight: false,
      pendingStatus: ''
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

handleOpen = () => {
  this.setState({open: true});
};

handleClose = () => {
  this.setState({open: false});
};

pendingBox = () =>{
  setTimeout(
    this.handleOpen, 2000
  );

  setTimeout(
    this.handleClose, 5000
  );

}

fight(){

  this.setState({
    fight: true
  })

  this.pendingBox();

      let pending = axios.get("/api/pending").then(res=>{
        this.setState({
        pendingStatus: pending
       })
      }).catch(console.log());
      console.log(pending);

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

  setTimeout(() =>{
  this.setState({
    loser: loser,
    champion: champion
  })},5000)

}

  render() {
    return (
      <MuiThemeProvider>
        <section>
          <header>
          <div>
          <h1>Welcome to the THUNDERDOME!</h1>
          <h2>Two men enter. One man leaves...</h2>
          </div>
          </header>

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

          </section>

          <section>
            <div className="generates">
            <Opponent1 name={this.state.name1} photo={this.state.photo1} fight={this.state.fight}/>
            <Opponent2 name={this.state.name2} photo={this.state.photo2} fight={this.state.fight}/>
            </div>

            <div className="fight">
              <button onClick={event=>this.fight()}>FIGHT!</button>
                  <Dialog className="pendingDialogue"
                    title="The fight commences..."
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                  >
                  {this.state.pendingStatus}
                </Dialog>
            </div>
          </section>

          <div>
            <p>
            Champion: {this.state.champion} <br/>
            {this.state.joke} <br/>
            Loser: {this.state.loser} <br/>
            </p>
          </div>


        </section>
      </MuiThemeProvider>
    );
  }
}

export default App;
