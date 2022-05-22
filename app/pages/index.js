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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.title}>
          <h1 className={styles.heading}>PharmaTrue.</h1>
          <p className={styles.subheading}>Protecting You.</p>
        </div>
        <div>{app(appStatus)}</div>
      </main>
      <div className={styles.about_pharma}>
        <h2>About PharmaTrue</h2>
        <br />
        <p>
        Medicines fall under essential commodities and it is very important that pharmacies deliver the correct medicine which is verified by licensed professionals for the well being of patients. However, there are a lot of fake and counterfeit medicines and drugs in the marketplace today, which can cause grave damage to end users, on a massive scale — in fact the global sales of counterfeit drugs can range up to 200 billion USD per year.
        </p>
        <p style={{'marginTop':'1.5rem'}}>At its core, our solution is a blockchain-based application which would ensure the validity and genuineness of a drug throughout the supply chain, from the manufacturer to the end user.</p>
      </div>
      <div className={styles.flowchart_div}>
        <img src="/flowchart.svg" alt="" className={styles.flowchart_img} />
      </div>
      <footer className={styles.footer}>
        <div className={styles.white}>
          <h3>Team Cats</h3>
          <p>Sankhayan Bhattacharjee</p>
          <p>Sayar Bhattacharyya</p>
          <p>Tanushree Madaan</p>
          <p>Anirudh Mishra</p>
        </div>
        <div className={styles.white}>
          <h3>Reach Us At</h3>
          <Link href="https://github.com/anirudhgray/technica-team-cats">
          <div className={styles.github_text}>
            <p>Github</p>
            <img height={30} src="/github.svg" alt="" />
          </div>
          </Link>
          <Link href="https://devpost.com/software/PharmaTrue">
          <div className={styles.github_text}>
            <p>Devpost</p>
            <img height={30} src="/github.svg" alt="" />
          </div>
          </Link>
        </div>
      </footer>
    </div>
  );
}
