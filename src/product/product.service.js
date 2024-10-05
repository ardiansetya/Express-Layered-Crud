// service layer bertujuan untuk handle bisnis logic
// dipisah agar tanggung jawabnya ter-isolate dan function-nya reuseable

const prisma = require("../db");

const getAllProduct = async () => {
    const products = await prisma.product.findMany();

    return products
};

const getProductById = async (id) => {
    if (typeof id !== "number") {
        throw Error("ID is not a number")
    }
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
    if (!product) {
        throw Error("Product not found");
    }

    return product;
};


const createProduct = async (newProductData) => {
    const product = await prisma.product.create({
        data: {
            name: newProductData.name,
            description: newProductData.description,
            image: newProductData.image,
            price: newProductData.price
        }
    }
    );

    return product;
}

const deleteProductById = async (id) => {
   
        await getProductById(id)
    
        await prisma.product.delete({
            where: {
                id,
            },
        });
        
    
}
module.exports = {
    getAllProduct,
    getProductById,
    createProduct,
    deleteProductById
}