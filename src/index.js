const dotenv = require('dotenv');
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();


dotenv.config();

const PORT = process.env.PORT;

app.use(express.json())

const productController = require("./product/product.controller");

app.use("/products", productController);

app.listen(PORT, () => {
    console.log("express api running in port: " + PORT);
})