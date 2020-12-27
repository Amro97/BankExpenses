import React, { Component } from 'react';
import Transaction from './Transaction'

class Transactions extends Component {
  deleteTransaction = (id) => {
    this.props.deleteTransaction(id)
  }
  loadExpenses() {
    return this.props.expenses.map(e => <Transaction id={e.id} amount={e.amount} vendor={e.vendor} category={e.category} deleteTransaction={this.deleteTransaction}/>)
  }
  render() {
    return (<div>{this.loadExpenses()}</div>)
  }
}

export default Transactions;