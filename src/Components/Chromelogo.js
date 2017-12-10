import React, {Component} from "react";
import chrome from "../chrome.png";

function Chromelogo (){
    return(
        <div className="parent">
        <img src={this.props.lphoto}/>
        <img src={chrome}/>
            </div>
    )
}

export default Chromelogo;