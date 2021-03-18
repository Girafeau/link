import Head from 'next/head';
import * as POST from '../ressources/api/post';
import Link from "next/link";

export default class Principale extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            etat: 0,
            restrictions: false,
            link: '',
            duree: null,
            identifiant: '',
            erreur: ''
        }

        this.verify = this.verify.bind(this);
        this.send = this.send.bind(this);
        this.display = this.display.bind(this);
    }

    async send(event) {
        event.preventDefault();
        const objet = {
            lien: this.state.link
        }
        const donnees = await POST.redirection(objet);
        if (donnees.err) {
            this.setState({etat: 1, erreur: donnees.message});
        } else {
            this.setState({identifiant: donnees.identifiant, etat: 2});
        }
    }

    verify(event) {
        const target = event.target;
        const valeur = target.value;
        const nom = target.name;
        this.setState({[nom]: valeur});
    }

    display(event) {
        this.setState({restrictions: !this.state.restrictions});
    }

    message() {
        switch (this.state.etat) {
            case 1:
                return <Error erreur={this.state.erreur}/>;
                break;
            case 2:
                return <Success identifiant={this.state.identifiant}/>;
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
                            <label className="label">Time</label>
                            <input placeholder="2" className="input is-medium is-rounded"
                                   name="duree" value={this.state.duree}
                                   onChange={this.verify}/>
                        </div>
                        <div className="control">
                            <label className="label">&nbsp;</label>
                            <div className="select is-medium is-rounded">
                                <select>
                                    <option>minutes</option>
                                    <option>hours</option>
                                    <option>days</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <label className="label">Maximum use</label>
                            <input placeholder="2" className="input is-medium is-rounded"
                                   name="utilisation" value={this.state.duree}
                                   onChange={this.verify}/>
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
                    <title>Link to</title>
                </Head>
                <section className="section">
                    <div className="container">
                        <nav className="navbar is-transparent">
                            <div className="navbar-brand">
                                <a className="navbar-item">

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
                                        <span className="underline">How does it work ?</span>
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

                                    <h1 className="title is-2 is-spaced">Ghost links 👻</h1>
                                    <h2 className="subtitle is-5">Create hidden links and easily manage their access.</h2>
                                    <div className="form">
                                        <form onSubmit={this.send}>
                                            <div className="field is-grouped">
                                                <div class="control is-expanded">
                                                    <input placeholder="www.google.com" className="input is-medium is-rounded"
                                                           name="link" value={this.state.link}
                                                           onChange={this.verify}/>
                                                </div>
                                                <div class="control">
                                                    <button className="button is-black is-medium is-rounded" type="submit">Create a link
                                                    </button>
                                                </div>
                                            </div>

                                            {this.message()}

                                            {this.restrictions()}

                                            <hr/>

                                            <div className="field is-grouped">
                                                <label className="label pointer">
                                                    <span className="icon">
                                                    {
                                                        this.state.restrictions ?
                                                            <i className="fas fa-chevron-up"></i> :
                                                            <i className="fas fa-chevron-down"></i>
                                                    }
                                                    </span>
                                                    <span onClick={this.display}>
                                                    {
                                                        this.state.restrictions ?
                                                            " Hide options (under development)" :
                                                            " Show options (under development)"
                                                    }
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

function Success(props) {
    return (
        <div className="field">
            <div className="message has-border-dashed has-border-success">
             <span className="icon has-text-success">
                <i className="fas fa-lg fa-check-circle"></i>
             </span>

                <span>
            <Link
                href={window.location.hostname + '/' + props.identifiant}>
                <a>{props.identifiant}</a>
            </Link>
                </span>
                <span className="icon has-text-success">
        <i className="far fa-lg fa-clipboard"></i>
              </span>
            </div>

        </div>);

}

function Error(props) {
    return (
        <div className="field">
            <div className="message has-border-dashed has-border-danger">
             <span className="icon has-text-danger">
               <i className="fas fa-lg fa-times-circle"></i>
                       </span>
                <span className="has-text-danger">{props.erreur}</span>
            </div>
        </div>);
}
