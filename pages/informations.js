import Link from 'next/link';


export default function informations() {
    return(<div>
        <section className="hero is-medium">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-vcentered">
                        <div className="column is-half">
                            <h1 className="title is-2 is-spaced">So how does it work ? 👩🏻‍🎓</h1>
                            <hr/>
                            <p>This website offers you the possibility to create manageable hidden links.
                                </p>
                            <p>In other words you can hide your links and choose for each of them a maximum time and use.</p>

                            <p>Just as simple as that.</p>
                            <hr/>
                            <Link href="/">
                                <a className="button is-black is-medium is-rounded">Let's go back home please</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>);
}
