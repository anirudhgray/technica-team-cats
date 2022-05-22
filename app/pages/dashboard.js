import { useState } from "react";
import styles from "../styles/Dashboard.module.css";
import { useContext } from "react";
import { PharmaContext } from "../context/PharmaContext";
import Link from 'next/link';
import axios from 'axios'
export default function Dashboard() {
  const { appStatus, currentAccount, connectToWallet, email, firstName, lastName, type } =
    useContext(PharmaContext);

  const checkBatch = async (e) => {
    e.preventDefault()
    const url = 'https://pharmatrue.vercel.app/get_med/allegra'
    await axios
    .get(url)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err.data)
    })
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/">
          <p className={styles.title}>PharmaTrue.</p>
        </Link>
        <p className={styles.white}>{email} ({type})</p>
      </header>
      <div className={styles.main}>
        <form onSubmit={checkBatch} className={styles.centered}>
          <input placeholder='Batch to check'></input>
          <button type='submit'>Check</button>
        </form>
      </div>
    </div>
  )
}
