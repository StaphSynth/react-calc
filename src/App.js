import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Calculator />
      </div>
    );
  }
}

class Calculator extends Component {
  render() {
    return (
      <div className="calc">
        <Display />
        <Keypad />
      </div>
    );
  }
}

class Display extends Component {
  render() {
    return <div>The Display</div>;
  }
}

class Keypad extends Component {
  render() {
    const keypad = [
      [':)','*','/','C'],
      [7,8,9,'+'],
      [4,5,6,'-'],
      [1,2,3,'=']
    ];
    var keys = [];

    for(let i = 0; i < keypad.length; i++) {
      var row = [];

      for(let j = 0; j < keypad[i].length; j++) {
        row.push(<td><Key value={ keypad[i][j] }></Key></td>);
      }
      keys.push(<tr>{ row }</tr>);
    }
    return <table>{ keys }</table>;
  }
}

class Key extends Component {
  render() {
    return <button value={ this.props.value }>{ this.props.value }</button>;
  }
}

export default App;
