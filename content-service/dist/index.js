"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const Post_1 = __importDefault(require("./Post"));
const fs = require("fs");
const app = express();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
const Keycloak = require('keycloak-connect');
const session = require('express-session');
const memoryStore = new session.MemoryStore();
app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));
const keycloak = new Keycloak({
    store: memoryStore
});
app.use(keycloak.middleware({
    logout: '/logout',
    admin: '/',
    protected: '/protected/resource'
}));
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: './public'
});
const uri = "mongodb://localhost:27017/weConnect";
mongoose_1.default.connect(uri, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Mongo db connection success");
    }
});
// ------------------ Eureka Config --------------------------------------------
const Eureka = require('eureka-js-client').Eureka;
const eureka = new Eureka({
    instance: {
        app: 'node-microservice',
        instanceId: 'node-microservice',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: {
            '$': 8011,
            '@enabled': 'true',
        },
        vipAddress: 'node-microservice',
        statusPageUrl: 'http://localhost:8011/',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
        registerWithEureka: true,
        fetchRegistry: true
    },
    eureka: {
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps/'
    }
});
eureka.logger.level('debug');
eureka.start((error) => {
    console.log(error || 'complete');
});
// ------------------ Server Config --------------------------------------------
app.get("/", (req, resp) => {
    resp.send("hello world");
});
app.get("/posts", (req, resp) => {
    Post_1.default.find((err, users) => {
        if (err) {
            resp.status(500).send(err);
        }
        else {
            resp.send(users);
        }
    });
});
app.post("/posts", multipartMiddleware, (req, resp) => {
    let post = new Post_1.default({
        title: req.body.title,
        description: req.body.description,
        userName: req.body.userName,
        userId: req.body.userId,
        ImageName: req.body.ImageName,
        fileType: req.body.fileType
    });
    post.save(err => {
        if (err)
            resp.status(500).send(err);
        else {
            resp.send(post);
        }
        ;
    });
});
app.patch("/:postId", (req, resp) => {
    try {
        const updatePost = Post_1.default.updateOne({ _id: req.params.postId }, { $set: {
                title: req.body.title,
                description: req.body.description,
            } });
        resp.json(updatePost);
    }
    catch (err) {
        resp.json({ message: err });
        //res.json("post not found to updated");
    }
});
app.get("/posts/:id", (req, resp) => {
    Post_1.default.findOne({
        '_id': req.params.id
    }, (err, posts) => {
        if (err) {
            resp.status(500).send(err);
        }
        else {
            resp.send(posts);
        }
    });
});
app.delete("/posts/:postId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const removePost = yield Post_1.default.deleteOne({ _id: req.params.postId });
        res.json(removePost);
        //res.json("Post succefully deleted");
    }
    catch (err) {
        res.json({ message: err });
        //res.json("post not found to deleted");
    }
}));
app.use(express.static('public'));
app.listen(8011, () => {
    console.log("Server Started on port 8011");
});
