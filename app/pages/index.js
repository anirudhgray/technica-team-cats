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
    <p>Logged in.</p>
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
      </Head>

      <main className={styles.main}>
        <h1>PharmaTrue</h1>
        <div>{app(appStatus)}</div>
      </main>
    </div>
  )
}
