// backend/src/routes/user.routes.js
import express from 'express';
const router = express.Router();
import express from "express";
import { match, pathToRegexp, compile, parse, stringify } from "path-to-regexp";

// Now you can use those functions below


const route = "/user/:id";
const keys = [];
const regexp = pathToRegexp(route, keys);


router.get("/", (req, res) => {
  res.send("User route works!");
});

export default router;
