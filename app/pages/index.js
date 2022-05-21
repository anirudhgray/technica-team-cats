import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useContext } from 'react'
import { PharmaContext } from '../context/PharmaContext'

export default function Home() {
  const { appStatus, currentAccount, connectToWallet } = useContext(PharmaContext)

  const app = (status = appStatus) => {
    switch (status) {
      case 'connected':
        return userLoggedIn
      case 'notConnected':
        return noUserFound
      case 'noMetaMask':
        return noMetaMaskFound
      case 'error':
        return error
      default:
        return loading
    }
  }

  const userLoggedIn = (
    <p>Logged in. {currentAccount}</p>
  )

  const noMetaMaskFound = (
    <p>Poops. Get Metamask dweeb.</p>
  )

  const noUserFound = (
    <button onClick={() => connectToWallet()}>Login with Metamask eheh</button>
  )

  const error = (
    <p>Poops, try again or use another browser.</p>
  )

  const loading = (
    <p>Loading...</p>
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>PharmaTrue</title>
        <meta name="description" content="Protecting against counterfeit medication." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.heading}>PharmaTrue.</h1>
        <p className={styles.subheading}>Blah Blah Lorem Ipsum Tagline</p>
        <div>{app(appStatus)}</div>

        <div>
          <h2>About PharmaTrue.</h2>
          <p>Lorem Ipsum stuff.</p>
        </div>

        <img src='#' alt='flowchart'></img>

        <div>
          <h2>About Us.</h2>
          <p>Team Cats!!!!</p>
        </div>
      </main>
    </div>
  )
}