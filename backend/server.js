const express= require('express')
const cors= require('cors')
const morgan=require('morgan')
const config = require('./config')
const jwt = require('jsonwebtoken')
const utils = require('./utils')

const app= express();
app.use(cors('*'));
app.use(express.static('images'))
app.use(express.json());
app.use(morgan('combined'));

app.use((request, response, next) => {
    if(request.url == '/user/signup' || request.url == '/user/signin'){
        next()
    }else{
        const token = request.headers["x-token"];
        if (!token) {
          response.send(utils.createErrorResult("token missing"));
        } else {
          try {
            const user = jwt.verify(token, config.key);
    
            request.user = user;
            next();
          } catch (ex) {
            console.log(ex);
            response.send(utils.createErrorResult(ex));
          }
        }
      }
    });
    

const userRouter = require('./routes/user');
const BlogRouter = require("./routes/blogs");

const { request, response } = require('express');
app.use('/user', userRouter);
app.use('/blogs', BlogRouter);


app.listen(4000, '0.0.0.0', () => {
    console.log('server started on port 4000');

});
