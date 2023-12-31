const Item = require('../models/itemModel')
const mongoose = require('mongoose')

// get all items
const getItems = async(req, res) => {
    const items = await Item.find({}).sort({ createdAt: -1 })

    res.status(200).json(items)
}

// get a single item
const getItem = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'NO SUCH ITEM' })
    }

    const item = await Item.findById(id)

    if (!item) {
        return res.status(404).json({ error: 'NO SUCH ITEM' })
    }

    res.status(200).json(item)

}

// create new item
const createItem = async(req, res) => {
    const { title, price, stock } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }

    if (!price) {
        emptyFields.push('price')
    }
    if (!stock) {
        emptyFields.push('stock')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the missing fields', emptyFields })
    }


    try {
        const item = await Item.create({ title, price, stock })
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({ error: error.message, emptyFields })
    }
}

// delete an item
const deleteItem = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'NO SUCH ITEM' })
    }

    const item = await Item.findOneAndDelete({ _id: id })

    if (!item) {
        return res.status(404).json({ error: 'NO SUCH ITEM' })
    }

    res.status(200).json(item)
}

// update an item
const updateItem = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'NO SUCH ITEM' })
    }

    const item = await Item.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!item) {
        return res.status(404).json({ error: 'NO SUCH ITEM' })
    }

    res.status(200).json(item)
}

module.exports = {
    getItems,
    getItem,
    createItem,
    deleteItem,
    updateItem
}