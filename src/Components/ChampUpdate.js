import React, { Component } from "react";
import axios from "axios";
import { setTimeout } from "timers";


class ChampUpdate extends Component {
    constructor(){
        super()

        this.state = {
            champsarray: []
        }
    }

    componentWillReceiveProps(newProps){
        console.log('new props yo', newProps)
        if (newProps.exist) {
            // this.getChamps()
            // this.PP()
            // this.getChamps()
        }
    }

   getChamps= ()=>{ axios.get("/api/champions").then(res=>{
        console.log(res);
        this.setState ({
            champsarray: res.data
        })
        })
    }

    PP = () => {
        
            let name = this.props.championName;
            this.state.champsarray.map((champion, index)=> {
                if (this.state.champsarray.indexOf(name)!==-1){
                    let id = index;
                    axios.put(`/api/champions/${name}/${id}`).then(res=>{
                       return console.log(res);
                    })
                }
        
            })
        
            axios.post(`/api/champion/${name}`).then(res=>{
                return console.log(res);
            })
        }

render(){

return(
    <p>{JSON.stringify(this.state.champsarray)}</p>
)
}
}

export default ChampUpdate;