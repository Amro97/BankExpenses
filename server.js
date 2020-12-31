const express = require(`express`)
const bodyParser = require(`body-parser`)
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

const mongoose = require(`mongoose`)
mongoose.connect("mongodb://localhost/BankExpensesDB", { useNewUrlParser: true, useUnifiedTopology: true })
const Schema = mongoose.Schema
const transactionSchema = new Schema({
    id: Number,
    amount: Number,
    category: String,
    vendor: String,
})

const Transaction = mongoose.model(`Transaction`, transactionSchema)

app.get(`/transactions`, async (req, res) => {
    await Transaction.find({}).exec(function (err, transactions) {
        res.send(transactions)
    })
})

app.post(`/transaction`, async (req, res) => {
    const transaction = await new Transaction(req.body)
    transaction.save()
    res.send(transaction)
})

app.delete(`/transaction`, async (req, res) => {
    const {id} = req.body
    const document = await Transaction.deleteOne({id})
    res.send(document)
})

port = 1301
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})