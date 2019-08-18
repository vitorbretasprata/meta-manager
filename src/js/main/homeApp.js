import React, { Component } from 'react';
import HomeTemplate from '../components/templates/homeTemplate';
import checkError from '../components/utils/checkError';
import Axios from 'axios';

class HomeApp extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.dropToggle = this.dropToggle.bind(this);
        this.handleText = this.handleText.bind(this);
        this.checkMessage = this.checkMessage.bind(this);

        this.state = {
            scrolled: false,
            collapsed: '',
            dropVisible: '',
            first: '',
            last: '',
            email: '',
            message: '',
            firstValid: false,
            lastValid: false,
            emailValid: false,
            messageValid: false,
            firstMSG: '',
            lastMSG: '',
            emailMSG: '',
            messageMSG: '',
            messageSent: false
        };
    }
    
    toggle = () => {
        const { collapsed } = this.state;

        if(collapsed === '') {
            this.setState({
                collapsed: 'nav-active',
            });           
        } else {
            this.setState({
                collapsed: '',
            }); 
        }
    } 

    dropToggle = () => {
        const { dropVisible } = this.state;
        
        if(dropVisible === '') {
            this.setState({
                dropVisible: 'drop-toggle',
            });           
        } else {
            this.setState({
                dropVisible: '',
            }); 
        }
    }
    
    handleScroll = () => {
        const isTop = window.scrollBy < 100;

        if(isTop !== true) {
            this.setState({ scrolled: true });
        } else {
            this.setState({ scrolled: false });
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);        
    }

    checkMessage = (e) => {
        e.preventDefault();
        
        let { first, last, email, message, firstValid, lastValid, emailValid, messageValid, firstMSG, lastMSG, emailMSG, messageMSG } = this.state;

        if(first == "") {
            firstValid = false;
            firstMSG = "First Name is Required";
        } else {
            firstValid = true;
            firstMSG = ''
        }

        if(last == "") {
            lastValid = false;
            lastMSG = "Last Name is Required";
        } else {
            lastValid = true;
            lastMSG = ''
        }

        if(email == "") {
            emailValid = false;
            emailMSG = "Email is Required";
        } else {
            emailValid = true;
            emailMSG = ''
        }

        if(message == "") {
            messageValid = false;
            messageMSG = "First Name is Required";
        } else {
            messageValid = true;
            messageMSG = ''
        }

        this.setState({
            firstValid: firstValid,
            firstMSG: firstMSG,                     
            emailValid: emailValid,
            emailMSG: emailMSG,
            lastValid: lastValid,
            lastMSG: lastMSG,
            messageValid: messageValid,
            messageMSG: messageMSG            
        }, () => this.checkValidation(firstValid, lastValid, emailValid, messageValid));
    }

    checkValidation = (fist, last, email, message) => {
        if(fist || last || email || message) {
            this.sendMessage();
        }
    }

    sendMessage = async () => {
        const { first, last, email, message } = this.state;

        const body = {
            firstName: first, 
            lastName: last,
            email,
            message
        }

        const msg = await Axios.post("http://localhost:2000/api/auth/sendEmail", body);

        const checked = checkError(msg);

        if (checked.code) {
            this.setState({
                messageSent: true,
                messageMSG: checked.message
            });
        } else {
            this.setState({
                messageSent: true,
                messageMSG: checked.message
            });
        }
    }

    handleText = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }
  
    componentWillUnmount() {
       window.removeEventListener('scroll', this.handleScroll);
    }
    

    render(){    
        const { first, last, message, email, messageSent, dropVisible, messageMSG } = this.state;

        return (
            <HomeTemplate 
                toggle={this.toggle} 
                collapsed={this.state.collapsed} 
                isScrolled={this.state.scrolled}
                inputEmail={email}
                inputFirst={first}
                inputLast={last}
                inputMessage={message}
                classToggle={dropVisible}
                dropToggle={this.dropToggle}
                handleEmail={this.handleText}
                handleFirst={this.handleText}
                handleLast={this.handleText}
                handleMessage={this.handleText}
                sendMessage={this.checkMessage}
                messageSent={messageSent}
                Msg={messageMSG}
             />
        )
    }
}

export default HomeApp;