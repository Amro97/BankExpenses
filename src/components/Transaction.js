import React, { Component } from 'react';

class Transaction extends Component {

  deleteTransaction = () => {
    this.props.deleteTransaction(this.props.id)
  }

  render() {
    return (
      this.props.amount > 0
      ? <div class='green'>
        {this.props.amount} {this.props.vendor} {this.props.category}
        <i class="fas fa-minus-circle" onClick={this.deleteTransaction}></i>
      </div>
      : <div class='red'>
      {this.props.amount} {this.props.vendor} {this.props.category}
      <i class="fas fa-minus-circle" onClick={this.deleteTransaction}></i>
    </div>
    )
  }
}

export default Transaction;