import { useState } from "react";
import styles from "../styles/Register.module.css";
import { useContext } from "react";
import { PharmaContext } from "../context/PharmaContext";
export default function Dashboard() {
  const { appStatus, currentAccount, connectToWallet, email, firstName, lastName, type } =
    useContext(PharmaContext);

  return (
    <div>
      <p>{email}</p>
    </div>
  )
}
