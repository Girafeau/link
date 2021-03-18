import Link from "next/link";

function redirection(props) {
    return (
        <div>
            <section className="hero is-medium">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-vcentered">
                            <div className="column is-half">
                                <h1 className="title is-1 is-spaced">{props.titre}</h1>
                                <h2 className="subtitle is-4">{props.texte}</h2>
                                <Link href="/">
                                    <a className="button is-black is-medium is-rounded">Let's go back home please</a>
                                </Link>
                            </div>
                            <div className="column is-half">
                                <img src={props.image}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
        return {
            props: {
                titre: 'Oops this link does\'nt exist.',
                texte: 'Someone played a joke on you.',
                image: '/hugo-bad-gateway.png'
            }
        }
    } else {
        const accessible = true;
        if(!accessible) {
            return {
                props: {
                    titre: 'Oops this link is no more accessible.',
                    texte: 'The author of this link has restricted its use.',
                    image: '/hugo-no-connection.png'
                }
            }
        } else {
            if(existe.lien.includes('http://') || existe.lien.includes('https://')) {
                context.res.writeHead(302, {Location: existe.lien});
                context.res.end();
            } else {
                context.res.writeHead(302, {Location: 'https://' + existe.lien});
                context.res.end();
            }
        }
    }
}

export default redirection;
