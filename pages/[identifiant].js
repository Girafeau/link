import Link from "next/link";

function redirection() {
    return (<div>
        Redirection en cours...
    </div>);
}

export async function getServerSideProps(context) {
    const base = require('../ressources/bdd');
    const redirections = base.get('redirections');
    redirections.createIndex('identifiant');
    const {
        identifiant
    } = context.params;
    const existe = await redirections.findOne({
        identifiant
    });

    if (!existe) {
        context.res.writeHead(302, {Location: '/inexistant'});
        context.res.end();
    } else {
        const accessible = true;
        if(!accessible) {
            context.res.writeHead(302, {Location: '/inaccessible'});
            context.res.end();
        } else {
            context.res.writeHead(302, {Location: existe.lien});
            context.res.end();
        }
    }
}

export default redirection;
