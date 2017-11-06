const express = require('express')
const next = require('next')
const mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      cookieParser = require('cookie-parser'),
      session = require('express-session')

const secret = require('./config/secret');
const User = require('./models/userlogin');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

//Connect to Db
mongoose.connect(secret.database,(err)=>{
    if(err){console.error(err)}
    else{console.log("Database connected")}
})

app.prepare()
.then(() => {
  const server = express()

  //Middleware
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({extended:false}))

  server.get('/',(req,res)=>{
      if(req.user){
          app.render(req,res,'/index',req.query);
      }else{
          res.redirect('/login');
          res.redirect
      }
  })

  server.post('/signup',(req,res) => {
      var user = new User();
      user.username = req.body.username;
      user.password = req.body.password;

      user.save((err,user) => {
          if(err){console.error("Error: ", err)}
          else{res.redirect('/login')}
      })
  })
  server.get('/login',(req,res)=>{
    if(req.user){
        app.render(req,res,'/login',req.query);
    }else{
        res.redirect('/login');
        res.redirect
    }
  })
  server.post('/login',(req,res)=>{
      var user=new user();
      user.username=req.body.username;
      user.password=rbody.password;
      user.save((err,user) =>{
          if(err){console.error("Error: ",err)}
          else{res.redirect('/signup')}
      })

  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(secret.port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})