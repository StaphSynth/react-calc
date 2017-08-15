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
  constructor() {
    super();

    this.state = {
      operand1: 0,
      operand2: 0,
      operator: null,
      decimal: false,
      output: 0
    };

    this.updateDisplay = this.updateDisplay.bind(this);
  }

  reset() {
    this.setState(
      {
        operand1: 0,
        operand2: 0,
        operator: null,
        decimal: false,
        output: 0
      }, this.updateDisplay
    );
  }

  handleKeyPress(key) {
    if(key.type === 'number')
      this.acceptInput(key.value);
    else if(key.type === 'operator')
      this.setState({ operator: key.value }, this.updateDisplay);
    else if(key.type === 'decimal')
      this.setState({ decimal: true });
    else if(key.type === 'clear')
      this.reset();
    else
      this.resolve();
  }

  updateDisplay() {
    if(this.state.operand1 && !this.state.operator)
      this.setState({ output: this.state.operand1 });
    else if(this.state.operand1 && this.state.operator)
      this.setState({ output: this.state.operand2 });
    else if(!this.state.operand1 && !this.state.operand2)
      this.setState({ output: 0 });
  }

  acceptInput(value) {
    if(this.state.operator)
      this.setState({ operand2: (this.state.operand2 * 10) + value }, this.updateDisplay);
    else
      this.setState({ operand1: (this.state.operand1 * 10) + value }, this.updateDisplay);
  }

  resolve() {
    const operator = {
      '+': (val1, val2) => { return val1 + val2 },
      '-': (val1, val2) => { return val1 - val2 },
      '*': (val1, val2) => { return val1 * val2 },
      '/': (val1, val2) => { return val1 / val2 }
    };

    var product = operator[this.state.operator](this.state.operand1, this.state.operand2);

    this.setState(
      {
        operand1: product,
        operand2: 0,
        operator: null,
        decimal: (product % 1 !== 0)
      },
      this.updateDisplay
    );
  }

  render() {
    return (
      <div className="calc">
        <div className="display">{ this.state.output }</div>
        <Keypad parentCallback = { (key) => this.handleKeyPress(key) } />
      </div>
    );
  }
}

class Keypad extends Component {
  onKeyPress(key) {
    var keypadResponse = {};
    keypadResponse.value = key;

    if(!isNaN(key))
      keypadResponse.type = 'number';
    else if(key === '.')
      keypadResponse.type = 'decimal';
    else if(key === '=')
      keypadResponse.type = 'resolve';
    else if(key === 'C')
      keypadResponse.type = 'clear';
    else
      keypadResponse.type = 'operator';

    this.props.parentCallback(keypadResponse);
  }

  render() {
    const keypad = [
      [':)',';)',':D','C'],
      [7,8,9,'/'],
      [4,5,6,'*'],
      [1,2,3,'+'],
      [0,'.','=', '-']
    ];
    var keys = [];

    for(let i = 0; i < keypad.length; i++) {
      var row = [];

      for(let j = 0; j < keypad[i].length; j++) {
        row.push(
          <td key = { j }>
            <Key
              parentCallback = { (key) => this.onKeyPress(key) }
              value = { keypad[i][j] }
              key = { j }>
            </Key>
          </td>
        );
      }
      keys.push(<tr key = { i }>{ row }</tr>);
    }
    return <table><tbody>{ keys }</tbody></table>;
  }
}

class Key extends Component {
  render() {
    return (
      <button
        value = { this.props.value }
        onClick = { () => this.props.parentCallback(this.props.value) }>
      { this.props.value }</button>
    );
  }
}

export default App;
