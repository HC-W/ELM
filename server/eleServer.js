const express = require('express')
let server = express()
const path = require('path')
server.listen(8030)

let shoppingRoute = express.Router()

server.use('/shopping',shoppingRoute)
// 商品接口
shoppingRoute.get("/v3",(req,res) => {
    res.sendFile(path.resolve('./eleJson/shopping.json'));
})

shoppingRoute.get("/pizza",(req,res) => {
    res.sendFile(path.resolve('./eleJson/pizza.json'));
})
// 评价
shoppingRoute.get("/ratting",(req,res) => {
    res.sendFile(path.resolve('./eleJson/ratting.json'));
})
// 优惠接口
shoppingRoute.get("/booking",(req,res) => {
    res.sendFile(path.resolve('./eleJson/booking.json'));
})



