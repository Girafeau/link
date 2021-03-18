import Link from 'next/link';


export default function page() {
  return(<div>
      <section className="hero is-medium">
          <div className="hero-body">
              <div className="container">
                  <div className="columns is-vcentered">
                      <div className="column is-half">
                          <h1 className="title is-2 is-spaced">404</h1>
                          <h2 className="subtitle is-5">The page you're looking for doesn't exist.</h2>
                          <Link href="/">
                              <a className="button is-black is-medium is-rounded">Let's go back home please</a>
                          </Link>
                      </div>
                      <div className="column is-half">
                          <img src="/hugo-fatal-error.png"/>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  </div>);
}
