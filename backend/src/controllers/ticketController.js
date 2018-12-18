const express = require('express')
const Ticket = require('../models/ticket')

const router = express();

router.get('/getTickets', (req, res) => {

    Ticket.find({}, (err, tickets) => {
        if(err){
            return res.status(500).send({ error: err});
        }

        return res.status(200).send({ Tickets: tickets});
    })
})

router.get('/getTicket/:id', (req, res) => {

    Ticket.findById(req.params.id,
        (err, Ticket) => {
            if(err){
            return res.status(500).send({ error: err });
        }

        return res.status(200).send({ Ticket: Ticket });
    })
})

router.post('/createTicket', (req, res) => {

    Ticket.create({
        Title: req.body.ticketInfo.title,
        Description: req.body.ticketInfo.description,
        Importance: req.body.ticketInfo.importance,
        Author: req.body.ticketInfo.author,
        Client: req.body.ticketInfo.client,
        Term: req.body.ticketInfo.term,
        State: req.body.ticketInfo.state,
        Comments: []
    }, (err, Ticket) => {
        if(err){
            return res.status(500).send({ Error: err })
        }

        return res.status(200).send({ Ticket: Ticket })
    })
})

router.put('/addComment/:id', (req, res) => {

    let Comment = {         
        Title: req.body.Title,
        Description: req.body.Description,
        Author: req.body.Author              
    }

    Ticket.findByIdAndUpdate(req.params.id, 
    {
        $push: {
            Comments: [{
                Comment: Comment 
            }]            
        }
    }, { new: true } ,
    (err, Ticket) => {
        if(err){
            return res.status(500).send({ error: err })
        }  
        return res.status(200).send({ Comments: Ticket.Comments });               
    });    
});

router.delete('/deleteTicket/:id',  (req, res) => {

    Ticket.findByIdAndDelete(req.params.id, (err, Ticket) => {
        if(err){
            return res.status(500).send({ error: err })
        }

        return res.status(200).send({ Ticket: Ticket })
    });
});

router.put('/alterTicket/:id', (req, res) => {

    Ticket.findByIdAndUpdate(req.params.id, {

        Title: req.body.ticketInfo.title,
        Description: req.body.ticketInfo.description,
        Importance: req.body.ticketInfo.importance,
        Author: req.body.ticketInfo.author,
        Client: req.body.ticketInfo.client,
        Term: req.body.ticketInfo.term,
        State: req.body.ticketInfo.state

     }, { new: true } , (err, Ticket) => {
        if(err){
            return res.status(500).send({ error: err });
        }
        return res.status(200).send({ Ticket: Ticket }) ;    
    });    
});

module.exports = router