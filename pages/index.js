import Head from 'next/head';
import * as POST from '../ressources/api/post';
import Link from "next/link";

export default class Principale extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            etat: 0,
            restrictions: false,
            lien: '',
            duree: null,
            identifiant: ''
        }

        this.verifier = this.verifier.bind(this);
        this.envoyer = this.envoyer.bind(this);
        this.afficher = this.afficher.bind(this);
    }

    async envoyer(event) {
        event.preventDefault();
        const objet = {
            lien: this.state.lien
        }
        const donnees = await POST.redirection(objet);
        if (donnees.err) {
            this.setState({etat: 1});
        } else {
            this.setState({identifiant: donnees.identifiant, etat: 2});
        }
    }

    verifier(event) {
        const target = event.target;
        const valeur = target.value;
        const nom = target.name;
        this.setState({[nom]: valeur});
    }

    afficher(event) {
        this.setState({restrictions: !this.state.restrictions});
    }

    message() {
        switch (this.state.etat) {
            case 1:
                return <Erreur/>;
                break;
            case 2:
                return <Succes identifiant={this.state.identifiant}/>;
                break;
            default:
                return '';
        }
    }

    restrictions() {
        if (this.state.restrictions) {
            return ('restrictions');
        } else {
            return ('');
        }
    }

    render() {
        return (<div>
                <Head>
                    <title>Link.to</title>
                </Head>

                <section className="section">
                    <div className="container">
                        <nav className="navbar is-transparent">
                            <div className="navbar-brand">
                                <a className="navbar-item" href="https://bulma.io">
                                    Link.to
                                </a>

                                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                                    <span aria-hidden="true"></span>
                                    <span aria-hidden="true"></span>
                                    <span aria-hidden="true"></span>
                                </a>
                            </div>

                            <div className="navbar-menu">
                                <div className="navbar-end">
                                    <a className="navbar-item" href="https://bulma.io">
                                        <span className="underline">Comment ça fonctionne ?</span>
                                    </a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </section>

                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-vcentered">
                                <div className="column is-half">

                                    <h1 className="title is-1 is-spaced">Créez des liens fantômes.</h1>
                                    <h2 className="subtitle is-4">Des liens masqués avec un accès limité ou non.</h2>
                                    <div className="form">
                                        <form onSubmit={this.envoyer}>
                                            <div className="field is-grouped">
                                                <div class="control">
                                                    <input placeholder="www.google.com" className="input is-medium"
                                                           name="lien" value={this.state.lien}
                                                           onChange={this.verifier}/>
                                                </div>
                                                <div class="control">
                                                    <button className="button is-black is-medium" type="submit">Créer un
                                                        nouveau lien
                                                    </button>
                                                </div>
                                            </div>

                                            {this.message()}

                                            {this.restrictions()}

                                            <div className="field is-grouped">
                                                <span onClick={this.afficher}>
                                            Options de restriction
                                                </span>
                                                <span className="icon">
                                                 <i className="fas fa-chevron-down"></i>
                                            </span>
                                            </div>


                                        </form>
                                    </div>
                                </div>
                                <div className="column is-half">
                                    <img src="/hugo-page-not-found.png"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

function Succes(props) {
    return (<div className="ligne">
        Votre nouveau lien :
        <Link
            href={'/' + props.identifiant}>
            <a>{props.identifiant}</a>
        </Link>
        <span className="icon has-text-success">
        <i className="far fa-copy"></i>
              </span>
    </div>);

}

function Erreur(props) {
    return (<div>
        Echec
    </div>);
}
