import React, { Component } from 'react'
import styled from 'styled-components'


export default class NavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top">
                    <a className='navbar-brand col align-items-center' style={{textAlign:"center"}}>Pokedex</a>
                </nav>
            </div>
        )
    }
}
