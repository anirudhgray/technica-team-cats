import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useContext } from "react";
import { PharmaContext } from "../context/PharmaContext";
import Link from "next/link";
export default function Home() {
  const { appStatus, currentAccount, connectToWallet } =
    useContext(PharmaContext);

  const app = (status = appStatus) => {
    switch (status) {
      case "connected":
        return userLoggedIn;
      case "notConnected":
        return noUserFound;
      case "noMetaMask":
        return noMetaMaskFound;
      case "error":
        return error;
      default:
        return loading;
    }
  };

  const userLoggedIn = (
    <div>
      <button className={styles.login_button} onClick={() => connectToWallet()}>
        Continue with Metamask
      </button>
    </div>
  );

  const noMetaMaskFound = <p>Poops. Get Metamask dweeb.</p>;

  const noUserFound = (
    <button onClick={() => connectToWallet()}>Login with Metamask eheh</button>
  );

  const error = <p>Poops, try again or use another browser.</p>;

  const loading = <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <Head>
        <title>PharmaTrue</title>
        <meta
          name="description"
          content="Protecting against counterfeit medication."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.title}>
          <h1 className={styles.heading}>PharmaTrue.</h1>
          <p className={styles.subheading}>Blah Blah Lorem Ipsum Tagline</p>
        </div>
        <div>{app(appStatus)}</div>
      </main>
      <div className={styles.about_pharma}>
        <h2>About PharmaTrue</h2>
        <br />
        <p>
          Bacon ipsum dolor amet tenderloin shoulder meatloaf flank. Doner shank
          t-bone fatback jerky chuck. Pork loin landjaeger corned beef ribeye
          doner, shankle sirloin spare ribs brisket pork pork chop. Spare ribs
          filet mignon pastrami, chuck salami beef turducken pig t-bone
          frankfurter. T-bone sausage beef ribs prosciutto leberkas cupim. Beef
          ribs t-bone strip steak fatback pork. Brisket cow turkey chicken,
          short ribs ham hock alcatra jerky corned beef shank ground round
          kielbasa capicola andouille.Bacon ipsum dolor amet tenderloin shoulder
          meatloaf flank. Doner shank t-bone fatback jerky chuck. Pork loin
          landjaeger corned beef ribeye doner, shankle sirloin spare ribs
          brisket pork pork chop. Spare ribs filet mignon pastrami, chuck salami
          beef turducken pig t-bone frankfurter. T-bone sausage beef ribs
          prosciutto leberkas cupim. Beef ribs t-bone strip steak fatback pork.
          Brisket cow turkey chicken, short ribs ham hock alcatra jerky corned
          beef shank ground round kielbasa capicola andouille.
        </p>
      </div>
      <div className={styles.flowchart_div}>
        <img src="/flowchart.svg" alt="" className={styles.flowchart_img} />
      </div>
      <footer className={styles.footer}>
        <Link href="/dashboard">
          <div className={styles.github_text}>
            <p>Find Us on Github</p>
            <img src="/github.svg" alt="" />
          </div>
        </Link>
      </footer>
    </div>
  );
}
