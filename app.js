const express = require('express');
const createError = require('http-errors');
const app =express();

const route = require("./routes/route");
require("./db/connection")


app.use(express.json());
app.use('/products',route);


app.use((req,res,next)=>{
    next(createError(404,'Not Found'));
});

app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send(
        {
            error:{
                status:err.status || 500,
                message:err.message
        }
    });
});


app.listen(3000,()=>{
    console.log(`server is started at :3000`)
})