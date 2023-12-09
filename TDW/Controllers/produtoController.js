const mongoose = require('mongoose');

const Produto = require('../Models/produtoModel');

module.exports = function (app) {
    app.get("/list", async (req, res) => {
        const produtos = await Produto.find({});
        res.send(produtos);
    });

    app.get("/id/:id", async (req, res) => {
        try {
        const produto = await Produto.findById(req.params.id);
        res.send(produto);
        } catch (error) {
        res.status(404).send({ error: "Produto não encontrado!" });
        }
    });

    app.post("/new", async (req, res) => {
        const {nome, descricao, preco} = req.body;
        const produto = new Produto({ nome, descricao, preco });
        await produto.save();
        res.status(200).json({success : true, data: produto});
    });

    app.put("/edit/:id", async (req, res) => {
        try {
        const {nome, descricao, preco} = req.body;
        const produto = await Produto.findByIdAndUpdate(req.params.id, { nome, descricao, preco }, { new: true });
        res.send(produto);
        } catch (error) {
        res.status(404).send({ error: "Produto não encontrado!" });
        }
    });

    app.delete("/delete/:id", async (req, res) => {
        try {
        await Produto.findByIdAndRemove(req.params.id);
        res.send({ success: true });
        } catch (error) {
        res.status(404).send({ error: "Produto não encontrado!" });
        }
    });
};