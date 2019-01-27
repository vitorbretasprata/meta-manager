import React, { Component } from 'react';
import Header from '../components/header'
import Footer from '../components/footer'

class Encapsulation extends Component{
    constructor(){
        super();

    }

    render(){
        return (
            <div>
                <Header/>
                    {this.props.children}
                <Footer />
            </div>
        )
    }
}

export default Encapsulation;
