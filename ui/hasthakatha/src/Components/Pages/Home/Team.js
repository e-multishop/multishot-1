import React from 'react';
import CardTeam from '../../TeamCard/CardTeam';
import tanisha_kumari from "../../../Images/tanisha_kumari.jpg";
import ruchi_choudhary from "../../../Images/ruchi_choudhary.jpg";
import ekta from "../../../Images/ekta.jpg";
import divya from "../../../Images/divya.jpg";

const Team = () => {
    const TeamData1 = [
        {
            img: divya,
            name: "Divya Lakshmi",
            designation: "Founder",
            description: "",
            fblink: "https://www.facebook.com/Hastha-Katha-1102781866557529/",
            twitterlink: "https://twitter.com/hastha_katha",
            instalink: "https://www.instagram.com/hastha_katha/?hl=en"

        },
        {
            img: ekta,
            name: "Ekta Jaiswal",
            designation: "Creative Head",
            description: "",
            fblink: "https://www.facebook.com/Hastha-Katha-1102781866557529/",
            twitterlink: "https://twitter.com/hastha_katha",
            instalink: "https://www.instagram.com/hastha_katha/?hl=en"
        }
    ];
    const TeamData2 = [
        {
            img: ruchi_choudhary,
            name: "Ruchi Choudhary",
            designation: "Home Decor",
            description: "",
            fblink: "https://www.facebook.com/Hastha-Katha-1102781866557529/",
            twitterlink: "https://twitter.com/hastha_katha",
            instalink: "https://www.instagram.com/hastha_katha/?hl=en"
        },
        {
            img:tanisha_kumari,
            name:"Tanisha Kumari",
            designation:"Social Media Manager",
            description:"",
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
            <div className="row">
                {
                    TeamData1.map((value) => {
                        return (
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
            <div className="row">
                {
                    TeamData2.map((value) => {
                        return (
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