import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios';
import Transactions from './components/Transactions'
import Operations from './components/Operations'
import './App.css';
import Breakdown from './components/Breakdown';

let ids = 0
class App extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      Balance: 0,
      categories: {}
    }
  }
  depositTransaction = (transaction) => {
    const { amount, vendor, category } = transaction
    const tempTransaction = ({ id: ids++, amount, vendor, category })
    this.postTransaction(tempTransaction)
    window.location.href = 'http://localhost:3000'
  }
  withTransaction = (transaction) => {
    const { amount, vendor, category } = transaction
    const tempTransaction = ({ id: ids++, amount: amount * (-1), vendor, category })
    this.postTransaction(tempTransaction)
    window.location.href = 'http://localhost:3000'
  }

  deleteTransaction = (tId) => {
    this.deleteTransactionReq(tId)
  }



  async getTransactions() {
    const response = await axios.get("http://localhost:1301/transactions")
    const total = response.data.map(d => d.amount)
    const balance = total.reduce((total, amount) => total + amount, 0)
    const categories = this.breakdown(response.data)
    this.setState({
      data: response.data,
      balance,
      categories
    })
  }

  async componentDidMount() {
    await this.getTransactions()
  }

  postTransaction = async (transaction) => {
    await axios.post(`http://localhost:1301/transaction`, transaction)
    this.getTransactions()
  }

  deleteTransactionReq = async (transactionId) => {
    await axios.delete(`http://localhost:1301/transaction`, { data: { id: transactionId } })
    this.getTransactions()
  }

  breakdown = (data) => {
    let categories = { ...this.state.categories }
    data.forEach(d => {
      if (categories[d.category]) {
        categories[d.category] = Number(categories[d.category]) + Number(d.amount)
      }
      else {
        categories[d.category] = Number(d.amount)
      }
    })
    return categories
  }

  async checkBalance() {
    if (await this.props.balance > 500)
      return true
    return false
  }

  render() {
    return (
      <Router>
        <div id='bank'>
          <div className="nav-bar">
            <div className="main-links">
              <Link to="/">Transactions</Link>
              <Link to="/operations">Operations</Link>
              <Link to="/breakdown">Breakdown</Link>
            </div>
            <div className="logo">Bank Expenses</div>
          </div>
          {this.checkBalance ? <h4 className='positive'>Balance: {this.state.balance}$</h4> : <h4 className='negative'>Balance: {this.state.balance}$</h4>}
          <Route path="/" exact render={() => <Transactions expenses={this.state.data} deleteTransaction={this.deleteTransaction} />} />
          <Route path="/operations" exact render={() => <Operations depositTransaction={this.depositTransaction} withTransaction={this.withTransaction} />} />
          <Route path="/breakdown" exact render={() => <Breakdown categories={this.state.categories} />} />
        </div>
      </Router>
    )
  }
}

export default App;
