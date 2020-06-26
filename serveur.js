const validation = require('@hapi/joi');
const path = require('path');
const next = require('next');
const {
  nanoid
} = require('nanoid');
const parser = require('body-parser')
const express = require('express');
const port = process.env.PORT || 8000;
const cors = require('cors')

const base = require('monk')(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017');
const directions = base.get('directions');
directions.createIndex('identifiant');

const dev = process.env.NODE_ENV !== 'production';
const service = next({
  dev
});
const gestionnaire = service.getRequestHandler();

service.prepare().then(() => {

  const serveur = express();
  serveur.use(parser.json());
  serveur.use(express.static(__dirname + '/public'));
  serveur.use(cors());

  serveur.get('/', (req, res) => {
    service.render(req, res, '/index');
  });

  serveur.get('/:identifiant', async (req, res) => {
    console.log(1);
    let {
      identifiant
    } = req.params;
    const existe = await directions.findOne({
      identifiant
    });
    if (existe) {
      res.redirect(existe.lien);
    } else {
      service.render(req, res, '/oops', {identifiant: identifiant});
    }
  });

  const schema = validation.object({
    identifiant: validation.string().error(new Error('ERR_OBJET_INVALIDE : L\'identifiant n\'est pas valide.')),
    lien: validation.string().uri().required().error(new Error('ERR_OBJET_INVALIDE : Le lien n\'est pas valide.')),
    duree: validation.number().integer().error(new Error('ERR_OBJET_INVALIDE : La durée de validité n\'est pas valide.'))
  });

  serveur.post('/url', async (req, res, next) => {
    let {
      identifiant,
      lien,
      duree
    } = req.body;

    try {
      const valeur = await schema.validateAsync({
        identifiant: identifiant,
        lien: lien,
        duree: duree
      });
      if (!identifiant) {
        identifiant = nanoid();
      }
      const existe = await directions.findOne({
        identifiant
      });

      if (existe) {
        throw new Error('ERR_ID_UTILISE : L\'identifiant est déjà utilisé.');
      }
      const insertion = await directions.insert({
        identifiant: identifiant,
        lien: lien,
        duree: duree
      });
      res.status(200).json({
        message: 'La redirection a été créée avec succès.',
        lien: identifiant
      });
    } catch (err) {
      next(err);
    }
  });

  serveur.use((err, req, res, next) => {
    res.status(400).json(err.message);
  });

  serveur.get('*', (req, res) => {
    return gestionnaire(req, res);
  });

  serveur.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
  });

});
