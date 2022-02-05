import React from 'react';
import ReactDom from 'react-dom';
// import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: ''
    }
  }

  render() {
    return (
      <div>
        <h1>Atelier</h1>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'));
// ReactDom.render(<App2 />, document.getElementById('app2'));
// ReactDom.render(<App3 />, document.getElementById('app3'));
// ReactDom.render(<App4 />, document.getElementById('app4'));