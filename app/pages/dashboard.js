import { useState } from "react";
import styles from "../styles/Dashboard.module.css";
import { useContext } from "react";
import { PharmaContext } from "../context/PharmaContext";
export default function Dashboard() {
  const { appStatus, currentAccount, connectToWallet, email, firstName, lastName, type } =
    useContext(PharmaContext);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p className={styles.title}>PharmaTrue.</p>
        <img src='#'></img>
      </header>
      <div className={styles.main}>
        <div className={styles.container}>
          <p className={styles.centered}>Logged in as {email} with wallet {currentAccount}</p>
        </div>
        <form className={styles.centered}>
          <input placeholder='Batch to verify'></input>
          <button type='submit'>Verify</button>
        </form>
      </div>
    </div>
  )
}
