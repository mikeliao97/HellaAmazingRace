'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {



  // removing this.props.children breaks routing for some reason, leave for now
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">
                        <img src="http://placehold.it/150x50&text=Logo" alt="" />
                    </a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li>
                            <a href="#">About</a>
                        </li>
                        <li>
                            <a href="#">Services</a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div>
          <img src="https://maps.googleapis.com/maps/api/staticmap?center=37.783714,-122.408645&zoom=14&size=400x400&markers=37.783714,-122.408645&key=AIzaSyCGPICzsGnm9HgAdoW7nRyZSD1oSaR0IVY"></img>
        </div>

        <div>{this.props.children}</div>

        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                </div>
            </div>
        </div>
    </div>
    );
  }
}
