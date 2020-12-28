import React, { Component } from 'react';

class Operations extends Component {
  constructor() {
    super()
    this.state = {
      amount: 0,
      vendor: "",
      category: ""
    }

  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  depositTransaction = () => {
    this.props.depositTransaction(this.state)
  }

  withTransaction = () => {
    this.props.withTransaction(this.state)
  }
  
  render() {
    return (
      <div>
        <input id='amountIpt' placeholder='Amount' name="amount" onChange={this.handleInputChange}></input>
        <input id='vendorIpt' placeholder='Vendor' name="vendor" onChange={this.handleInputChange}></input>
        <input id='categoryIpt' placeholder='Category' name="category" onChange={this.handleInputChange}></input>
        <a class="waves-effect waves-light btn" id='depoBtn' onClick={this.depositTransaction}>Deposit</a>
        <a class="waves-effect waves-light btn" id='withBtn' onClick={this.withTransaction}>Withdraw</a>
      </div>
    )
  }
}

export default Operations;