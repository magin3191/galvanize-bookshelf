'use strict';

const express = require('express');
const knex = require('../knex')
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/books',function(req,res,next){
  knex('books')
  .orderBy('title','asc')
  .select('id','title','author','genre','description','cover_url AS coverUrl','created_at AS createdAt','updated_at AS updatedAt')
  .then(function(books){
    res.status(200).send(books)
  })

})

router.get('/books/:id', function(req,res,next){
  knex('books')
  .where('id',req.params.id)
  .first()
  .select('id','title','author','genre','description','cover_url AS coverUrl','created_at AS createdAt','updated_at AS updatedAt')
  .then(function(book){
    res.status(200).send(book)
  })
})

router.post('/books',function(req,res,next){
  knex('books')
  .insert({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.coverUrl
  },'*')
  .then(function(book){
    let data = {
      id: book[0].id,
      title: book[0].title,
      author: book[0].author,
      genre: book[0].genre,
      description: book[0].description,
      coverUrl: book[0].cover_url
    }
    res.send(data)
  })
  .done()
})


router.patch('/books/:id',function(req,res,next){
  knex('books')
  .where('id',req.params.id)
  .update({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description,
      cover_url: req.body.coverUrl
  },'*')
  .then(function(book){
      let data = {
    id: book[0].id,
    title: book[0].title,
    author: book[0].author,
    genre: book[0].genre,
    description: book[0].description,
    coverUrl: book[0].cover_url
  }
    res.send(data)
  })


})


router.delete('/books/:id',function(req,res,next){
  knex('books')
  .where('id',req.params.id)
  .then(function(book){
  let data={
      title: book[0].title,
      author: book[0].author,
      genre: book[0].genre,
      description: book[0].description,
      coverUrl: book[0].cover_url
    }
    res.send(data)
  }).then(function(){
    knex('books').where('id',req.params.id).del()
  })
})





router.use((err,req,res,next)=>{
  const status = err.status||500
  res.status(status).json({error:err})
})

router.use((req,res,next)=>{
  res.status(404).json({error:{message:'Not Found'}})
})



// YOUR CODE HERE

module.exports = router;
