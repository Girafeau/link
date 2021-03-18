let ERR_ID_INVALIDE = new Error('Not a valid id.');
ERR_ID_INVALIDE.code = 'ERR_ID_INVALIDE';

let ERR_LIEN_INVALIDE = new Error('Not a valid link.');
ERR_LIEN_INVALIDE.code = 'ERR_LIEN_INVALIDE';

let ERR_DUREE_INVALIDE = new Error('Link expired.');
ERR_DUREE_INVALIDE.code = 'ERR_DUREE_INVALIDE';

let ERR_ID_UTILISE = new Error('Id already used.');
ERR_ID_UTILISE.code = 'ERR_ID_UTILISE';

let ERR_ID_INEXISTANT = new Error('Not an existing id.');
ERR_ID_INEXISTANT.code = 'ERR_ID_INEXISTANT';

export {
  ERR_ID_INVALIDE,
  ERR_LIEN_INVALIDE,
  ERR_DUREE_INVALIDE,
  ERR_ID_UTILISE,
  ERR_ID_INEXISTANT
}
