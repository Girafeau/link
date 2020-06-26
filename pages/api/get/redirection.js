const validation = require('@hapi/joi');
const base = require('../../../ressources/bdd');
const {
  ERR_ID_INVALIDE,
  ERR_ID_INEXISTANT
} = require('../../../ressources/erreur');

const redirections = base.get('redirections');
redirections.createIndex('identifiant');

const schema = validation.object({
  identifiant: validation.string().error(ERR_ID_INVALIDE)
});

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const {
          identifiant
        } = req.query;
        const valeur = await schema.validateAsync({
          identifiant: identifiant
        });
        const existe = await redirections.findOne({
          identifiant
        });
        if (!existe) {
          throw ERR_ID_INEXISTANT;
        } else {
          res.status(200).json({
            identifiant: existe.identifiant,
            lien: existe.lien,
            duree: existe.duree,
            creation: existe.creation
          });
        }
      } catch (err) {
        res.status(400).json({
          err: 1,
          code: err.code,
          message: err.message
        });
      }
      break;
    default:
      res.status(405).end();
      break;
  }
}
