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
            identifiant: '',
            erreur: ''
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
            this.setState({etat: 1, erreur: donnees.message});
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
                return <Erreur erreur={this.state.erreur}/>;
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
            return (<div className="field">
                    <hr/>

                    <div className="field is-grouped">
                        <div class="control">
                            <label className="label">Durée de validité</label>
                            <input placeholder="2" className="input"
                                   name="duree" value={this.state.duree}
                                   onChange={this.verifier}/>
                        </div>
                        <div className="control">
                            <label className="label">&nbsp;</label>
                            <div className="select">
                                <select>
                                    <option>minutes</option>
                                    <option>heures</option>
                                    <option>jours</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <label className="label">Utilisation max</label>
                            <input placeholder="2" className="input"
                                   name="utilisation" value={this.state.duree}
                                   onChange={this.verifier}/>
                        </div>
                    </div>
                </div>
            );
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
                                    <a className="navbar-item"
                                       href="/informations">
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
                                                <div class="control is-expanded">
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
                                                <label className="label pointer">
                                                <span className="icon">
                                                    {
                                                        this.state.restrictions ?
                                                            <i className="fas fa-chevron-up"></i> :
                                                            <i className="fas fa-chevron-down"></i>
                                                    }

                                            </span>
                                                <span onClick={this.afficher}>
                                            Plus d'options
                                                </span>
                                                </label>
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
    return (<div className="field">

        <div className="message has-border-dashed has-border-success">
             <span className="icon has-text-success">
                <i className="fas fa-lg fa-check-circle"></i>
                       </span>
            <span>

            Votre nouveau lien :
            <Link
                href={'/' + props.identifiant}>
                <a>{props.identifiant}</a>
            </Link>
                </span>
            <span className="icon has-text-success">
        <i className="far fa-lg fa-clipboard"></i>
              </span>
        </div>

    </div>);

}

function Erreur(props) {
    return (<div className="field">
        <div className="message has-border-dashed has-border-danger">
             <span className="icon has-text-danger">
               <i className="fas fa-lg fa-times-circle"></i>
                       </span>

            <span className="has-text-danger">{props.erreur}</span>

        </div>
    </div>);
}
