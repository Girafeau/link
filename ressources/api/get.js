async function redirection(serveur, identifiant) {
  let reponse = await fetch(`${serveur}/api/get/redirection?identifiant=${identifiant}`, {
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
  });
  let donnees = await reponse.json();
  console.log(donnees);
  return donnees;
}

export {
  redirection
}
