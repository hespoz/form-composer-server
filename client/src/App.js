import React, { Component } from 'react';

import Menu from './common/Menu';
import Content from './common/Content';

class App extends Component {
  render() {
    return (
        <div>
            <Menu/>
            <Content/>
        </div>
    );
  }
}

export default App;
