import Link from "next/link";

export default function inexistant() {
    return(<div>
        <section className="hero is-medium">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-vcentered">
                        <div className="column is-half">
                            <h1 className="title is-1 is-spaced">Oups ce lien n'existe pas.</h1>
                            <h2 className="subtitle is-4">Soit vous vous êtes trompé soit on vous a fait une mauvaise farce.</h2>
                            <Link href="/">
                                <a className="button is-black is-medium">Retourner à l'accueil</a>
                            </Link>
                        </div>
                        <div className="column is-half">
                            <img src="/hugo-bad-gateway.png"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>);
}