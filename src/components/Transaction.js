import React, { Component } from 'react';

class Transaction extends Component {

  deleteTransaction = () => {
    this.props.deleteTransaction(this.props.id)
  }

  render() {
    return (
      this.props.amount > 0
      ? <div className='positive transaction'>
        {this.props.amount} {this.props.vendor} {this.props.category}
        <i className="fas fa-minus-circle" onClick={this.deleteTransaction}></i>
      </div>
      : <div className='negative transaction'>
      {this.props.amount} {this.props.vendor} {this.props.category}
      <i className="fas fa-minus-circle" onClick={this.deleteTransaction}></i>
    </div>
    )
  }
}

export default Transaction;