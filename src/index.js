import express from 'express';
import path from 'path';
import socketio from 'socket.io';
import http from 'http';
import 'dotenv/config';
import {getTransactions, saveTransaction} from './controllers/transactionsController';
import {transactionExist} from './middlewares/transactionExistMid';

import './database/models';
const BASE_URL = process.env.BASE_URL;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (_,res)=> {
    return res.status(200).json({message: 'Welcome to IOT server 👏👏'});
})

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (user)=> {
    io.emit('welcome',{message:'let us get started'})
})

// app.use('/transactions', (_,res) => {
//     res.render('transactions.html')
// })

app.get(`${BASE_URL}`, async(_,res) => {
    let transactions = await getTransactions();
    return res.status(200).json(transactions)
})

app.post(`${BASE_URL}`, async(req,res) => {
   let transaction = await saveTransaction(req.body);
   if(!transaction)
     return res.status(400).json({message: 'Transaction not saved!'});
    return res.status(201).json({
        message: 'Transaction saved!',
        data: transaction
    })
})

app.put(`${BASE_URL}/:transactionId`, transactionExist, async(req,res) => {
  
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("IOT server 🏃🏃🏃 on port "+PORT))