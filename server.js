const express = require("express");

const SchemeRouter = require("./schemes/scheme-router.js");

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use("/api/schemes", SchemeRouter);

module.exports = server;
