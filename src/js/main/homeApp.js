import React, { Component } from 'react';
import HomeTemplate from '../components/templates/homeTemplate';

class HomeApp extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.handleLeave = this.handleLeave.bind(this);

        this.state = {
          collapsed: '',
          showSubMenu: false
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

    handleHover = (e) => {
        this.setState({ showSubMenu: true });
    };
      
    handleLeave = (e) => {
        this.setState({ showSubMenu: false });
    };

    render(){                
        return <HomeTemplate toggle={this.toggle} collapsed={this.state.collapsed} handleHover={this.handleHover} handleLeave={this.handleLeave} subMenu={this.state.showSubMenu} />
    }
}

export default HomeApp;