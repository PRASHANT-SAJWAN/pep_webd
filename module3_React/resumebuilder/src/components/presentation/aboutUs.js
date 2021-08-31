import React from 'react';
import aboutUs from "../../static/images/aboutus.jpg";

import { NavLink } from "react-router-dom";
const AboutUs = () => {

    return (
        <div className=" container med   about-page">
            <div className="section contact-section">
                <div className="  contact-left-section ">
                    <p>
                        Do you have any comments or questions? Our team will be happy to assist you. Send us a message.
                    </p>
                    <h2 className="email text-large">
                        test@gmail.com
                    </h2>
                    <p className="happy-to-help">
                        Contact us on - 1234567890
                    </p>
                </div>
                <div className="contact-right-section">
                    <img src={aboutUs} className=" full-width about-us-img" alt="logo" />
                </div>
            </div>
        </div>

    );
}

export default AboutUs;