let ERR_ID_INVALIDE = new Error('L\'identifiant n\'est pas valide.');
ERR_ID_INVALIDE.code = 'ERR_ID_INVALIDE';

let ERR_LIEN_INVALIDE = new Error('Le lien n\'est pas valide.');
ERR_LIEN_INVALIDE.code = 'ERR_LIEN_INVALIDE';

let ERR_DUREE_INVALIDE = new Error('La durée de validité n\'est pas valide.');
ERR_DUREE_INVALIDE.code = 'ERR_DUREE_INVALIDE';

let ERR_ID_UTILISE = new Error('L\'identifiant est déjà utilisé.');
ERR_ID_UTILISE.code = 'ERR_ID_UTILISE';

let ERR_ID_INEXISTANT = new Error('L\'identifiant n\'existe pas.');
ERR_ID_INEXISTANT.code = 'ERR_ID_INEXISTANT';

export {
  ERR_ID_INVALIDE,
  ERR_LIEN_INVALIDE,
  ERR_DUREE_INVALIDE,
  ERR_ID_UTILISE,
  ERR_ID_INEXISTANT
}
