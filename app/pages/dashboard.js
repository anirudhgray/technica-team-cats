import { useState } from "react";
import styles from "../styles/Dashboard.module.css";
import { useContext } from "react";
import { PharmaContext } from "../context/PharmaContext";
import Link from 'next/link';
export default function Dashboard() {
  const { appStatus, currentAccount, connectToWallet, email, firstName, lastName, type } =
    useContext(PharmaContext);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/">
          <p className={styles.title}>PharmaTrue.</p>
        </Link>
        <p className={styles.white}>{email} ({type})</p>
      </header>
      <div className={styles.main}>
        <form className={styles.centered}>
          <input placeholder='Batch to check'></input>
          <button type='submit'>Check</button>
        </form>
      </div>
    </div>
  )
}
