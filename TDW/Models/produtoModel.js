// definir o modelo do produto (nome, descrição, preço)
const mongoose = require('mongoose');
const Produto = mongoose.model('Produto', new mongoose.Schema({
    nome: String,
    descricao: String,
    preco: Number
  }));
  /* const Produto = new  mongoose.Schema({
    nome: String,
    descricao: String,
    preco: Number
  })
  */

module.exports = Produto;
//module.exports = mongoose.model('Produto', Produto, 'produtos');