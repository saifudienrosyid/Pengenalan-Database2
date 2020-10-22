import { request } from 'express'
import { ObjectID } from 'mongodb'
import mongoose, { SchemaType } from 'mongoose'

export type CustomerType = {
  first_name: string
	last_name: string
	age: number
	customer_type: string
	street: string
	city: string
	state: string
	zip_code: string
	phone_number: string
}

export type CustomerDocument = mongoose.Document & CustomerType

//schema definition
const CustomerSchema = new mongoose.Schema({
  first_name: String,
	last_name: String,
	age: Number,
	customer_type: String,
	street: String,
	city: String,
	state: String,
	zip_code: String,
	phone_number: String
})

export class Customer {
  private model: mongoose.Model<CustomerDocument>

  constructor() {
    this.model = mongoose.model('customer', CustomerSchema)
  }

  async create(data: CustomerType) {
    try {
      const result = await this.model.create(data)
      console.log(`Insert result %j`, result)
    } catch (error) {
      throw error
    }
  }

  async getAll() {
    let customers: CustomerType[]
    try {
      customers = await this.model.find({})
    } catch (error) {
      throw error
    }

    return customers
  }

  async getByID(customerID: string) {
    let customer: CustomerType | null
    try {
      customer = await this.model.findById(customerID)
    } catch (error) {
      throw error
    }

    return customer
  }

  async update(customerID: string, data: Partial<CustomerType>) {
    try {
      await this.model.findByIdAndUpdate(customerID, { $set: data })
    } catch (error) {
      throw error
    }
  }

  async delete(customerID: string) {
    try {
      await this.model.findByIdAndDelete(customerID)
    } catch (error) {
      throw error
    }
  }
}

// add Account
export type AccountType ={
  cutomer_id: ObjectID
  account_number: string
  balance: number
  account_type: string
}

export type AccountDocument = mongoose.Document & AccountType
//schema definition
const AccountSchema = new mongoose.Schema({
  customer_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer"
  },
  account_number: String,
  balance: Number,
  account_type: String
})

export class Account {
  private model: mongoose.Model<AccountDocument>

  constructor(){
    this.model = mongoose.model('Account', AccountSchema)
  }
  async create(data: AccountType) {
    try {
      const result = await this.model.create(data)
      console.log(`Insert result %j`, result)
    } catch (error) {
      throw error
    }
  }
  async getAllAccount(){
    let accounts: AccountType[]
    try {
      accounts = await this.model.find({})
    } catch (error) {
      throw error
    }

    return accounts
  }
  async updateAccount(accountID: string, data: Partial<AccountType>) {
    try {
      await this.model.findByIdAndUpdate(accountID, { $set: data })
    } catch (error) {
      throw error
    }
  }
  async deleteAccount(accountID : string) {
    try {
      await this.model.findByIdAndDelete(accountID)
    } catch (error) {
      throw error
    }
  }

}

//add transactions
export type TransactionType ={
  account_id: ObjectID
  amount: number
  date: Date
  discription: string
}

export type TransactionDocument = mongoose.Document & TransactionType
//schema definition
const TransactionSchema = new mongoose.Schema({
  account_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account"
  },
  amount: Number,
  date: Date,
  discription: String,
})

export class Transaction {
  private model: mongoose.Model<TransactionDocument>

  constructor(){
    this.model = mongoose.model('Transaction', TransactionSchema)
  } 
  async createTransaction(data: TransactionType) {
    try {
      const result = await this.model.create(data)
      console.log(`Insert result %j`, result)
    } catch (error) {
      throw error
    }
  }
  async getAllTransaction() {
    let transactions: TransactionType[]
    try {
      transactions = await this.model.find({})
    } catch (error) {
      throw error
    }

    return transactions
  }
  async updateTransaction(transactionID: string, data: Partial<AccountType>) {
    try {
      await this.model.findByIdAndUpdate(transactionID, { $set: data })
    } catch (error) {
      throw error
    }
  }
  async delete(transactionID : string) {
    try {
      await this.model.findByIdAndDelete(transactionID)
    } catch (error) {
      throw error
    }
  }
}