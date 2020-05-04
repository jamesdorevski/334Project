import React, { Component } from 'react';
import CounterButton from './CounterButton';
import './Counter.css';

class Counter extends Component {

    //define initial state in constructor
    constructor() {
        super();

        this.state = {
            counter : 0
        }
    }

    increment = (by) => { //update state of count
        this.setState(
            (prevState) => {
            return {counter: prevState.counter + by}
            }
        );
    }

    decrement = (by) => { //update state of count
        this.setState(
            (prevState) => {
            return {counter: prevState.counter - by}
            }
        );
    }

    reset = () => { //reset count
        this.setState( {counter: 0} );
    }

    render () {
        return (
            <div className="Counter">
              <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}/>
              <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
              <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}/>

              <span className = "count">{this.state.counter}</span>
              <div><button className="reset" onClick={this.reset}>Reset</button></div>
            </div>
        );
    }
}

export default Counter;