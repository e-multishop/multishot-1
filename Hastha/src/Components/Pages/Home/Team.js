import React from 'react';
import CardTeam from '../../TeamCard/CardTeam';
import imgcheck from "../../../Images/megha.jpg";

const Team =()=>{
    const TeamData=[
        {
            img:imgcheck,
            name:"shiv Pradad",
            designation:"Founder",
            description:"I am a very simple card. I am good at containing small bits of information.I am good at containing small bits of information.I am good at containing small bits of information.",
            fblink:"https://www.facebook.com/Hastha-Katha-1102781866557529/",
            twitterlink:"https://twitter.com/hastha_katha",
            instalink:"https://www.instagram.com/hastha_katha/?hl=en"

        },
        {
            img:imgcheck,
            name:"shiv Pradad",
            designation:"Founder",
            description:"I am a very simple card. I am good at containing small bits of information.I am good at containing small bits of information.I am good at containing small bits of information.",
            fblink:"https://www.facebook.com/Hastha-Katha-1102781866557529/",
            twitterlink:"https://twitter.com/hastha_katha",
            instalink:"https://www.instagram.com/hastha_katha/?hl=en"
        },
        {
            img:imgcheck,
            name:"shiv Pradad",
            designation:"Founder",
            description:"I am a very simple card. I am good at containing small bits of information.I am good at containing small bits of information.I am good at containing small bits of information.",
            fblink:"https://www.facebook.com/Hastha-Katha-1102781866557529/",
            twitterlink:"https://twitter.com/hastha_katha",
            instalink:"https://www.instagram.com/hastha_katha/?hl=en"
        },
        {
            img:imgcheck,
            name:"shiv Pradad",
            designation:"Founder",
            description:"I am a very simple card. I am good at containing small bits of information.I am good at containing small bits of information.I am good at containing small bits of information.",
            fblink:"https://www.facebook.com/Hastha-Katha-1102781866557529/",
            twitterlink:"https://twitter.com/hastha_katha",
            instalink:"https://www.instagram.com/hastha_katha/?hl=en"
        }
    ];
    return (
        <>
        <div>
            <h2 className="hk-feature">Our Team</h2>
        </div>
        <div className="row ">
            {
                TeamData.map((value)=>{
                    return(
                        <div className="col s6 hk-team-col">
                            <CardTeam 
                            images={value.img} 
                            name={value.name} 
                            designation={value.designation}
                            description={value.description}
                            fblink={value.fblink}
                            twitterlink={value.twitterlink}
                            instalink={value.instalink}
                            />
                        </div>
                    );
                })
            }
        </div>
    </>
    );
}

export default Team;