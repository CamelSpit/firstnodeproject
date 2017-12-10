import React, { Component } from 'react';
import './reset.css';
import './App.css';
import Opponent1 from "./Components/Opponent1";
import Opponent2 from "./Components/Opponent2";
import axios from "axios";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import { setTimeout } from 'timers';
import chrome from "./chrome.png";
import Chromelogo from "./Components/Chromelogo";


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
      open: false,
      fight: false,
      pendingStatus: '',
      openLoser: false,
      openChampion: false,
      champPhoto :'',
      loserPhoto : '',
      champsarray: []
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.loserBox = this.loserBox.bind(this);
    this.loserOpen = this.loserOpen.bind(this);
    this.loserClose = this.loserClose.bind(this);
    this.championClose = this.championClose.bind(this);
    this.championOpen = this.championOpen.bind(this);
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

loserOpen = () => {
  this.setState ({
    openLoser: true
  })
}

loserClose = () => {
  this.setState ({
    openLoser: false
  })
}

loserBox(){
  setTimeout(
    this.loserOpen, 5000
  );

  setTimeout(
    this.loserClose,10000
  );  
}

championOpen(){
  this.setState({
    openChampion : true
  })
}

championClose(){
  this.setState({
    openChampion : false
  })
}

championBox(){
  setTimeout (
    this.championOpen, 10000
  );
}

getChamps= ()=>{
  axios.get("/api/champions").then(res=>{
    console.log(res);
    this.setState ({
        champsarray: res.data
    })
    console.log(this.state.champion, this.state.champsarray);
    let name = this.state.champion;
    let flag = false;
    this.state.champsarray.map((champion, index)=> {
      if (champion.name===this.state.loser)
        axios.delete(`/api/champion/${index}`).then(res=>{
          console.log(res);
        })
      if (champion.name===name){
        flag = true;
        console.log("same champ");
          let id = index;
          axios.put(`/api/champions/${name}/${id}`).then(res=>{
            axios.get("/api/champions").then(res=>{
              console.log('145', res);
              this.setState({
                  champsarray: res.data
              })
              return console.log(res);
            })
          })
        }
      });

    if (!flag) {
      axios.post(`/api/champion/${name}`).then(res=>{
        axios.get("/api/champions").then(res=>{
          console.log('158', res);
          this.setState ({
              champsarray: res.data
          });
        return console.log(res);
        })
      })
    }
  });
}

fight(){

  this.setState({
    fight: true
  })


      axios.get("/api/pending").then(res=>{
        console.log(res);
        this.setState({
        pendingStatus: res.data
       })
      }).catch(console.log());

  this.pendingBox();

  this.loserBox();

  setTimeout(
    this.setState({
      logoDisplay : true
    }), 9000
  )

  this.championBox();

  let ap1 = Math.floor(Math.random()*300) + 1;
  let ap2 = Math.floor(Math.random()*300) + 1;
  var loser = '';
  var champion = "";
  var champPhoto = "";
  var loserPhoto = "";

  if (ap1>ap2) {
    champion = this.state.name1;
    loser = this.state.name2;
    champPhoto = this.state.photo1;
    loserPhoto = this.state.photo2;
    console.log(champion);

  }
  else {
    loser = this.state.name1;
    champion = this.state.name2;
    champPhoto = this.state.photo2;
    loserPhoto = this.state.photo1;
    console.log(champion);
  }
 
  axios.get(`http://api.icndb.com/jokes/random?firstName=${champion}&amp;lastName=nothing`).then(res=>{
    let index = res.data.value.joke.indexOf("Norris");
    let firstpart = res.data.value.joke.substring(0, index);
    let secondpart= res.data.value.joke.substring(index+6,);
    let joke = firstpart+secondpart;
  this.setState({
      joke: joke,
      loser: loser,
      champion: champion,
      champPhoto : champPhoto,
      loserPhoto: loserPhoto
    })
    this.getChamps();
  })


}

  render() {
    return (
      <MuiThemeProvider>
        <section>
          <header>
          <div>
          <h1>Welcome to the THUNDERDOME!</h1><br/>
          <h2>Two men enter. One man leaves...</h2>
          </div>
          </header>

          <section className="topSection">
            <div className="inputs">
            <div className="input1">
              <input placeholder="Insert First Name" onChange={event=>this.updateName1(event.target.value)}/>
              <input placeholder="Insert Photo URL" onChange={event=>this.updatephoto1(event.target.value)}/>
            </div>

            <div className="input2"> 
              <input placeholder="Insert First Name" onChange={event=>this.updateName2(event.target.value)}/>
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
                  
                  <Dialog className="pendingDialog"
                    title="The fight commences..."
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                  >
                  {this.state.pendingStatus}
                </Dialog>

                <Dialog className="loser"
                    title= " The loser is..."
                    open={this.state.openLoser}
                    onRequestClose={this.loserClose}
                  >
                  
                  <p>{this.state.loser}!<br/><br/>
                  {`${this.state.loser} will ride eternal, shiny and CHROME!`}</p>
                  <img src={chrome}/>
                  {/* <Chromelogo lphoto={this.state.loserPhoto}/> */}
                  {/* <img src={this.state.loserPhoto} alt="LLama face"/> */}
                </Dialog>

                <Dialog className="champion"
                    title="The champion is..."
                    open={this.state.openChampion}
                    onRequestClose={this.championClose}
                  >
                  <p>{this.state.champion}! <br/> <br/>
                  {this.state.joke}
                  </p>
                  <img src = {this.state.champPhoto} alt="Look at that beautiful mug!"/>
                </Dialog>

            </div>
            <div>
              {JSON.stringify(this.state.champsarray)}
              {/* <ChampUpdate championName={this.state.champion} exist={this.state.championExist}/> */}
            </div>
          </section>
        </section>
      </MuiThemeProvider>
    );
  }
}

export default App;
