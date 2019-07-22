const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const productsController = require("./controllers/products-controller");
const clientsController = require("./controllers/clients-controller");
const adminController = require("./controllers/admin-controller");
const shoppingCartController = require("./controllers/shoppingCart-Controller");
const orderController = require("./controllers/order-Controller");
const cartItemController = require("./controllers/cartItem-Controller");

const server = express();

server.use(morgan('dev'));
server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(bodyParser.json());

server.use(morgan('dev'));
server.use(express.json());
server.use(cors());

//public folder 
server.use(express.static('assets/images'));

server.use("/api/categories", productsController);
server.use("/api/products", productsController);
server.use("/api/customers", clientsController);
server.use("/api/admin", adminController);
server.use("/api/carts" , shoppingCartController);
server.use("/api/cartItems" , cartItemController);
server.use("/api/orders" , orderController);

server.use((req, res, next) => {
    const error = new Error('NOT FOUND');
    error.status = 404;
    next(error);
});

server.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

server.get("*", (request, response) => {
    response.status(404).json({
        message: "Route not found."
    });
});

server.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
});