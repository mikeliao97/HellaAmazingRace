'use strict';

import React from 'react';

export default class LoginPage extends React.Component {
  render() {
    return (
      <div className="text-center">

        <a href="/auth/facebook">
          <img  className="img-rounded" src="img/fb-login.png"/>
        </a>
        
      </div>
    );
  }
}
