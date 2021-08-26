import React from 'react';
import "./about.scss";
import img1 from "../../../Images/aboutimage.jpg";
import img2 from "../../../Images/aboutusimage2.jpg"
const About = () => {
    return (
        <>
            <div className="row hk-aboutus">
                <div className="col s6 aboutusimg">
                    <img src={img1} alt="about us image" />
                </div>
                <div className="col s6 aboutuscontent">
                    <h2>
                    Welcome to Hasthakatha! The rural folk art and textiles of India is the true reflection of the rich heritage of the country.
                        </h2>
                    <p>
                        If the cultural diversity and traditional vibrancy of India intrigues you, then you are in the right place.
                        {/* Welcome to Hasthakatha! The rural folk art and textiles of India is the true reflection of the rich heritage of the country. */}
                        </p>
                    <p>
                        The artistry and intricacy achieved by Indian handmade textiles is supreme and beyond the reach of modern machinery.
                        At Hasthakatha we intend to combine folk art and traditional textiles with modern aesthetics to retain the heritage vale of handmade art work.
                        </p>
                    <p>
                        The brand aims to create unique, comfortable and wearable handmade garments for the modern women at the same time enabling a better livelihood for rural Indian artisans and craftsmen.
                        I like to keep the silhouette of my garment simple so that it can suit anybody irrespective of their body type. What sets
                        my garment apart is that I experiment with different kinds of hand embroideries, hand paintings and mirror work.
                        </p>
                    {/* <h3>
                        Welcome to Hasthakatha. Discover handcrafted comfort.
                        </h3> */}
                </div>
            </div>
            {/* <div className="row hk-aboutus bg-color">
                <div className="col s6 aboutuscontent">
                    <h2>
                        When everyday fashion meets form. And where comfort seamlessly blends with art, Hastha is born
                        </h2>
                    <p>
                        For over 7 years, Hastha has been turning heads with its hand block printed 100% cotton t-shirts. Each cut and crafted
                        to suit the Indian body type and enhance the fashion quotient
                        </p>
                    <p>
                        Pioneering the concept of hand block prints on t-shirts. Hastha has a unique range of
                        contemporary tees that are trendy yet rooted with their quirky
                        depictions of traditional Indian motifs.
                        </p>
                    <p>
                        Starting off with tees for the modern Indian woman, today, Hastha has a range of t-shirts for
                        men and kids alike. Hastha’s unique hand block printed range of umbrellas complete the line-up.
                        </p>
                    <h3>
                        Welcome to Hasthakatha. Discover handcrafted comfort.
                        </h3>
                </div>
                <div className="col s6 aboutusimg">
                    <img src={img2} alt="about us image" />
                </div>
            </div> */}
        </>
    );
}

export default About;