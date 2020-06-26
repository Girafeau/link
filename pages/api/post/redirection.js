const validation = require('@hapi/joi');
const base = require('../../../ressources/bdd');
const {
    nanoid
} = require('nanoid');
const {
    ERR_ID_INVALIDE,
    ERR_LIEN_INVALIDE,
    ERR_DUREE_INVALIDE,
    ERR_ID_UTILISE
} = require('../../../ressources/erreur');

const redirections = base.get('redirections');
redirections.createIndex('identifiant');

const schema = validation.object({
    identifiant: validation.string().error(ERR_ID_INVALIDE),
    lien: validation.string().pattern(new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')).required().error(ERR_LIEN_INVALIDE),
    duree: validation.number().integer().error(ERR_DUREE_INVALIDE)
});

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
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
                const existe = await redirections.findOne({
                    identifiant
                });
                if (existe) {
                    throw ERR_ID_UTILISE;
                }
                const insertion = await redirections.insert({
                    identifiant: identifiant,
                    lien: lien,
                    duree: duree,
                    creation: new Date()
                });
                res.status(200).json({
                    identifiant: identifiant
                });
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
