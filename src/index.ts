// register root file untuk menggunakan sourcemap
import 'source-map-support/register'

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { Customer, CustomerType } from './mongoose'
import {Account, AccountType} from './mongoose'
import {Transaction, TransactionType} from './mongoose'

async function initApp() {
  const app = express()

  // init db
  await mongoose.connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true })
  const customerModel = new Customer()
  const accountModel= new  Account()
  const transactionModel = new Transaction()

  app.use(bodyParser.json())

  app.post('/customer', async function(req, res, next) {
    try {
      await customerModel.create(req.body)
    } catch (error) {
      return next(error)
    }

    return res.send({ success: true })
  })

  app.get('/customer', async function(req, res, next) {
    let customers: CustomerType[]
    try {
      customers = await customerModel.getAll()
    } catch (error) {
      return next(error)
    }

    return res.send(customers)
  })

  app.get('/customer/:id', async function(req, res, next) {
    let customer: CustomerType | null
    try {
      customer = await customerModel.getByID(req.params.id)
    } catch (error) {
      return next(error)
    }

    return res.send(customer)
  })

  app.put('/customer/:id', async function(req, res, next) {
    try {
      await customerModel.update(req.params.id, req.body)
    } catch (error) {
      return next(error)
    }

    res.send({ success: true })
  })

  app.delete('/customer/:id', async function(req, res, next) {
    try {
      await customerModel.delete(req.params.id)
    } catch (error) {
      return next(error)
    }

    res.send({ success: true })
  })

  //add CRUD for account
  app.post('/account/:id/create', async function(req, res, next) {
    try {
      await accountModel.create(req.body)
    } catch (error) {
      return next(error)
    }

    return res.send({ success: true })
  })
  app.get('/account/:id/allAccount', async function(req, res, next) {
    let accounts: AccountType[]
    try {
      accounts = await accountModel.getAllAccount()
    } catch (error) {
      return next(error)
    }

    return res.send(accounts)
  })

  app.put('/account/:id', async function(req, res, next) {
    try {
      await accountModel.updateAccount(req.params.id, req.body)
    } catch (error) {
      return next(error)
    }

    res.send({ success: true })
  })

  app.delete('/account/:id', async function(req, res, next) {
    try {
      await accountModel.deleteAccount(req.params.id)
    } catch (error) {
      return next(error)
    }

    res.send({ success: true })
  })

//CRUD for transaction
app.post('/transaction', async function(req, res, next) {
  try {
    await transactionModel.createTransaction(req.body)
  } catch (error) {
    return next(error)
  }

  return res.send({ success: true })
})
app.get('/transaction', async function(req, res, next) {
  let transactions: TransactionType[]
  try {
    transactions = await transactionModel.getAllTransaction()
  } catch (error) {
    return next(error)
  }

  return res.send(transactions)
})

app.put('/transaction/:id', async function(req, res, next) {
  try {
    await transactionModel.updateTransaction(req.params.id, req.body)
  } catch (error) {
    return next(error)
  }

  res.send({ success: true })
})

app.delete('/transaction/:id', async function(req, res, next) {
  try {
    await transactionModel.delete(req.params.id)
  } catch (error) {
    return next(error)
  }

  res.send({ success: true })
})



  app.use(function(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(500).send({
      success: false,
      message: err.message
    })
  })

  app.listen(process.env.PORT || 8000, () => {
    console.log(`App listen on port ${ process.env.PORT || 8000 }`)
  })
}

initApp()