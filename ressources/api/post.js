async function redirection(objet) {
  let reponse = await fetch('/api/post/redirection', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(objet)
  });
  let donnees = await reponse.json();
  console.log(donnees);
  return donnees;
}

export {
  redirection
}
