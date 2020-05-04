import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Counter.css';

class CounterButton extends Component { 
    
    render () {
        return (
            <div className = 'counter'>
              <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button> {/* pass a prop - arrow function */}
              <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
            </div>
          );
    }
  }

CounterButton.defaultProps = { by: 1 }

CounterButton.propTypes = {
    by : PropTypes.number
}

export default CounterButton;