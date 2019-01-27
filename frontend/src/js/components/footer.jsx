import React from 'react';
import { 
    FaLinkedin,
    FaGithub,
    FaMedium,
    FaStackOverflow,
    FaFreeCodeCamp,
    FaCodepen
} from 'react-icons/fa';

const Footer = () => (
    <footer>                  
        <div className="iconsFooter">
            <div className="contacts">
                <i>My professional profiles</i>
                <div className="profiles">
                    <a href="https://www.linkedin.com/in/vitor-prata-a899b16b/" target="_blank">
                        <FaLinkedin className="textColor" size="2em"/>
                    </a>                        
                    <a href="https://github.com/vitorbretasprata" target="_blank">
                        <FaGithub className="textColor" size="2em"/>
                    </a>  
                    <a href="https://medium.com/@vitorbretasprata" target="_blank">
                        <FaMedium className="textColor" size="2em"/>
                    </a> 
                    <a href="https://stackoverflow.com/users/9909060/vitor-prata?tab=profile" target="_blank">
                        <FaStackOverflow className="textColor" size="2em"/>
                    </a>  
                    <a href="https://www.freecodecamp.org/vitorbretasprata" target="_blank">
                        <FaFreeCodeCamp className="textColor" size="2em"/>
                    </a> 
                    <a href="https://codepen.io/imaybebatman/" target="_blank">
                        <FaCodepen className="textColor" size="2em"/>
                    </a>                   
                </div>                                    
            </div>                                    
        </div>    
    </footer>
);

export default Footer;