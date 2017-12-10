import React, {Component} from "react";
import "../App.css";
import chrome from "../chrome.png";

class Chrome extends Component {
    constructor(){
        super()

    this.state = {
        display: false
    }
    }

    render(){

        let logo = (
            <div>
                <img src={chrome} alt="chrome logo"/>
            </div>
        )
        return(
            <div>
                {(this.props.display===true) ? logo : null}
            </div>
        )
    }
}

export default Chrome;