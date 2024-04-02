const Contato = require('../models/ContatoModel');


exports.index = async (req, res) => {
  const contatos = await Contato.buscaContatos();
  res.render("index", {contatos})
};

exports.home = async (req, res) => {
  res.sendFile("index.html");
}
