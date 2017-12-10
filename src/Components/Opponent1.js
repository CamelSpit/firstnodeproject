import React, {Component} from "react";
import axios from "axios";
import "../App.css";
import styles from "../styles.js";


class Opponent1 extends Component {
    constructor(){
        super()

        this.state = {
            id: 0,
            monsterName: "",
            baseXP: 0,
            height: 0,
            weight: 0,
            abilities: [], 
            display: false
        }
    }

    generate(){
        let id = Math.floor(Math.random()*100) + 1;
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res=>{
            this.setState({
                    id: res.data.id,
                    name: res.data.name, 
                    baseXP: res.data.base_experience,
                    height: res.data.height,
                    weight: res.data.weight,
                    abilities: res.data.abilities[0].ability.name
            })
        })
        this.setState({
            display: true
        })

    }

    render(){
        let op1 = (
            <div>
                <div style={Object.assign({}, styles.image1, this.props.fight && styles.image1.hover)}>
                <img src={this.props.photo} alt="This is the last face you will see."/>
                </div>
                <p>
                Name: {this.props.name}<br/>
                Base XP:{this.state.baseXP}<br/>
                Height: {this.state.height}<br/>
                Weight: {this.state.weight}<br/>
                Ability: {this.state.abilities}
                </p>
            </div>
        )

        return(
        <div>
            <button onClick={event=>this.generate()}>Generate Opponent 1</button>
            {(this.state.display===true) ? op1 : null}
        </div>
        )
    }
}


export default Opponent1;
