const express = require("express");
const bodyParser = require("body-parser");
let server = express();
// 监听端口
server.listen(8020);
server.use(bodyParser.urlencoded(
    {
        extended: false
    }
));
// 引入数据库插件
const mysql = require("mysql");

// 连接数据库
let db = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    // 数据库名称
    database: "wang_elm",
    // 连接池最大连接数
    maxConnection: 5
})
// 登录
server.post("/login", (req, res) => {
    console.log(req.body);
    // 用户名为空
    if (!req.body.user) {
        res.write('{"err": 1, "msg": "用户名不能为空"}');
        res.end();
        // 密码为空
    } else if (!req.body.password) {
        res.write('{"err": 1, "msg": "密码不能为空"}');
        res.end();
        // 用户名格式检测
    } else if (!/^[\u4E00-\u9FA5A-Za-z]{2,16}$/.test(req.body.user)) {
        res.write('{"err": 1, "msg": "用户名由4-16位的数字、字母、汉字组成"}');
        res.end();
        // mysql注入
    } else if (/['|"]/.test(req.body.password)) {
        res.write('{"err": 1, "msg": "密码格式不能有特殊字符"}');
        res.end();
        // 密码长度检测
    } else if (!/^[a-zA-Z0-9]{6,16}$/.test(req.body.password)) {
        res.write('{"err": 1, "msg": "密码由6-16为的数字字母组成"}');
        res.end();
    }else {
        // 查询该用户是否已进行注册
        db.query(`SELECT password FROM user WHERE user='${req.body.user}'`,(err,data) => {
            if(err) {
                res.send('{"err": 1,"msg":"error"}');
                res.end();
            }else {
                // 注册，进行登录验证
                if(data.length) {
                    // 密码相同
                    if(req.body.password == data[0]["password"]) {
                        res.send('{"err": 0,"msg":"登录成功"}');
                        res.end();
                        // 密码不同，登录失败
                    }else {
                        res.send('{"err": 1,"msg":"密码错误或用户名已存在，请重新登录！"}');
                        res.end();
                    }
                }else {
                    // 没有注册，进行注册并登录
                    db.query(`INSERT INTO user (id,user,password) VALUES('','${req.body.user}','${req.body.password}')`,(err,data) => {
                        if(err) {
                            res.send('{"err": 1,"msg":"用户不存在，注册失败"}')
                            res.end();
                        }else{
                            res.send('{"err": 0,"msg":"已默认进行注册"}')
                            res.end();
                        }
                    }) 
                } 
            }
        })
    }
})

// 密码重置
server.post("/reset", (req, res) => {
    // console.log(req.body);
    // 用户名为空
    if (!req.body.user) {
        res.write('{"err": 1, "msg": "用户名不能为空"}');
        res.end();
        // 密码为空
    } else if (!req.body.oldPassword || !req.body.endPassword || !req.body.newPassword) {
        res.write('{"err": 1, "msg": "密码不能为空"}');
        res.end();
        // 用户名格式检测
    } else if (!/^[\u4E00-\u9FA5A-Za-z]{2,16}$/.test(req.body.user)) {
        res.write('{"err": 1, "msg": "用户名由4-16位的数字、字母、汉字组成"}');
        res.end();
        // mysql注入
    } else if (/['|"]/.test(req.body.oldPassword) || /['|"]/.test(req.body.endPassword) || /['|"]/.test(req.body.newPassword)) {
        res.write('{"err": 1, "msg": "密码格式不能有特殊字符"}');
        res.end();
        // 密码长度检测
    } else if (!/^[a-zA-Z0-9]{6,16}$/.test(req.body.oldPassword) || /^\[a-zA-Z0-9]{6,16}$/.test(req.body.endPassword) || /^\[a-zA-Z0-9]{6,16}$/.test(req.body.newPassword)) {
        res.write('{"err": 1, "msg": "密码由6-16为的数字字母组成"}');
        res.end();
    }else {
        // 查询该用户是否已进行注册
        db.query(`UPDATE user SET password='${req.body.endPassword}' WHERE user='${req.body.user}'`,(err,data) => {
            if(err) {
                res.send('{"err": 1,"msg":"密码更改失败"}');
                res.end();
            }else {
                res.send('{"err": 0,"msg":"密码更改成功"}');
                res.end();
            }
        })
    }
})

