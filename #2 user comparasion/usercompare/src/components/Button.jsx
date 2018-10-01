import React from 'react';
import './button.css'

class Button extends React.Component{ 
render () {
  return (
    <button onClick ={ this.props.onClick} className={this.props.className}>{this.props.text}</button>
  )
}

}

export default Button;