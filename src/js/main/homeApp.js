import React, { Component } from 'react';
import HomeTemplate from '../components/templates/homeTemplate';

class HomeApp extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.handleText = this.handleText.bind(this);
        this.checkMessage = this.checkMessage.bind(this);

        this.state = {
            scrolled: false,
            collapsed: '',
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
    
    toggle() {
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

    sendMessage = () => {
        const { first, last, email, message } = this.state;

        


        this.setState({
            messageSent: true
        });
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
        const { first, last, message, email, messageSent} = this.state;

        return (
            <HomeTemplate 
                toggle={this.toggle} 
                collapsed={this.state.collapsed} 
                isScrolled={this.state.scrolled}
                inputEmail={email}
                inputFirst={first}
                inputLast={last}
                inputMessage={message}
                handleEmail={this.handleText}
                handleFirst={this.handleText}
                handleLast={this.handleText}
                handleMessage={this.handleText}
                sendMessage={this.checkMessage}
                messageSent={messageSent}
             />
        )
    }
}

export default HomeApp;