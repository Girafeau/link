import Link from 'next/link';


export default function page() {
  return(<div>
<div>
<p>  Quelque chose c'est mal passé ! Ce lien ne mène nul part.</p>
</div>

<div>
<img src="/fogg-page-not-found-1.png" width="608px" height="456px"/>
<Link href="/">
          <a>Accueil</a>
        </Link>
</div>


    </div>);
}
