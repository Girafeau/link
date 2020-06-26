import Link from "next/link";

export default function inaccessible() {
    return(<div>
        <section className="hero is-medium">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-vcentered">
                        <div className="column is-half">
                            <h1 className="title is-1 is-spaced">Oups ce lien n'est plus accessible.</h1>
                            <h2 className="subtitle is-4">L'auteur de ce lien a restreint son usage et il n'est désormais plus possible d'y accéder.</h2>
                            <Link href="/">
                                <a className="button is-black is-medium">Retourner à l'accueil</a>
                            </Link>
                        </div>
                        <div className="column is-half">
                            <img src="/hugo-no-connection.png"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>);
}