import React from 'react';
import imgcheck from "../../Images/megha.jpg"
import "./CardTeam.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const TeamCard =(props)=>{
    return(
        <div className="card horizontal hk-teamcard">
          <div className="card-image">
            <img src={props.images}/>
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <h2>{props.name}</h2>
              <p>{props.designation}</p>
              <p className="card-desc">
              {props.description}
              </p>
            </div>
            <div className="card-action">
                      <a href={props.fblink} target="_blank">
                        <FontAwesomeIcon icon={faFacebook} size="1x" className="hk-facebook-icon"/>
                      </a>
                      <a href={props.twitterlink} target="_blank">
                        <FontAwesomeIcon icon={faTwitter} size="1x" className="hk-twitter-icon"/>
                      </a>
                      <a href={props.instalink} target="_blank">
                        <FontAwesomeIcon icon={faInstagram} size="1x" className="hk-instagram-icon" />
                      </a>
            </div>
          </div>
        </div>
    );
}

export default TeamCard;