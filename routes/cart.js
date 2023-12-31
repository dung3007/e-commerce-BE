const Cart = require('../models/Cart');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const CryptoJS = require('crypto-js')

const router = require('express').Router();

// CREATE

router.post('/', verifyToken, async (req, res) => {
    const newCart = new Cart(req.body)

    try {
        const saveCart = await newCart.save();
        res.status(200).json(saveCart)
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE

router.put("/:id", verifyToken, async (req, res) => {
    try {
        const updateCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(updateCart)
    } catch (err) {
        res.status(500).json(err)
    }
})

// // DELETE

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted ...")
    } catch (err) {
        res.status(500).json(err)
    }
})

// // GET USER CART

router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId})
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
})

// // GET ALL CART

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const cart = await Cart.find();
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;