const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/accounts', (req,res) => {
    db.find()
        .then(account => {
            console.log(account)
            res.status(200).json(account)
        })
        .catch(err => {
            console.log(err)
            res.status(500)
            .json({error: "Account cant be retrieved"}
            );
        });
    });


server.post('/api/accounts', (req,res) => {
    const account = req.body;
    db.add(account)
        .then(account => {
            res.status(201).json(account);
        })
        .catch(error => {
            res.status(500).json({
                error: "Unable to save"
            });
        });
    });

server.put('/api/accounts/:id', (req,res) => {
    const newAccount = req.body;
    const {id} = req.params;
    db.update(newAccount, id)
            .then(updated => {
            if(updated){
                res.status(200).json({message: `${updated} accounts updated`})
            }
            else{
                res.status(404).json({message: "Account not found"});
            }
        })
        .catch(error =>{
            res.status(500).json({
                error: "Unable to update account"
            });
        });
    });
server.delete('/api/accounts/:id', (req,res) => {
    const {id} = req.params;
    db.remove(id)
            .then(deleted => {
            if(deleted){
                res.status(204).end()
         }
            else{
                res.status(404).json({
                    message: "Account not found"});
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "Account couldn't be deleted"
            });
        });
    });

module.exports = server;