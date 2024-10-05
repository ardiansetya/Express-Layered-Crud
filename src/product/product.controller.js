// layer untuk handle req dan res
// biasanya handle validasi body

const express = require('express');
const prisma = require('../db');
const { getAllProduct, getProductById, createProduct, deleteProductById } = require('./product.service');

const router = express.Router();


router.get("/", async (req, res) => {
    const products = await getAllProduct()
    // select * from product

    res.send(products);
})

router.get("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id)
        const product = await getProductById(productId);

        res.send(product)
    } catch (err) {
        res.status(400).send(err.message)
    }


})

// method post butuh req.body()
router.post("/", async (req, res) => {
    try {
        const newProductdata = req.body;

        const product = await createProduct(newProductdata)

        res.send({
            data: product,
            message: "Product created successfully"
        });
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// method delete butuh req.params()
router.delete("/:id", async (req, res) => {

    try {
        const productId = parseInt(req.params.id); //String
        await deleteProductById(productId)
        res.send("Product deleted")
    } catch (error) {
        res.status(400).send(error.message)
    } 
})

// mehtod put butuh req.params() dan req.body()
router.put("/:id", async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    if (!(productData.name && productData.price && productData.description && productData.image)) {
        return res.status(400).send("Some fields are missing");
    }

    const product = await prisma.product.update({
        where: {
            id: parseInt(productId)
        },
        data: {
            description: productData.description,
            name: productData.name,
            price: productData.price,
            image: productData.image
        }
    })

    res.send({
        data: product,
        message: "Product updated successfully updated successfully"
    })
})


router.patch("/:id", async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    const product = await prisma.product.update({
        where: {
            id: parseInt(productId)
        },
        data: {
            description: productData.description,
            name: productData.name,
            price: productData.price,
            image: productData.image
        }
    })

    res.send({
        data: product,
        message: "Product updated successfully updated successfully"
    })
})

module.exports = router;