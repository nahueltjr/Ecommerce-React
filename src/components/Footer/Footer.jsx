import React from 'react';
import "./Footer.css"
import { BsLinkedin } from 'react-icons/bs';
import { BsWhatsapp } from 'react-icons/bs';

const Footer = () => {

return (
        <div className='Footer'>
            <div className='Academlo'>
                <h4>Academlo 2022</h4>
            </div>
            <div className='Footer_icons'>
                <div className='Bslinked'>
                    <a target="_blank" href='https://www.linkedin.com/in/nahuel-tejerina-3159b9206?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BFvfk4Zf2TU6YKsBMlqMZaA%3D%3D'><span><BsLinkedin/></span></a> 
                </div>
                <div className='Bswhats'>
                    <a target="_blank" href='https://walink.co/5c5b81'><span><BsWhatsapp/></span></a>
                </div>
            </div>
        </div>
    );
};

export default Footer;