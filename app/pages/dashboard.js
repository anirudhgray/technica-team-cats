import { useState } from "react";
import styles from "../styles/Dashboard.module.css";
import { useContext } from "react";
import { PharmaContext } from "../context/PharmaContext";
import Link from "next/link";
import axios from "axios";
export default function Dashboard() {
  const {
    appStatus,
    currentAccount,
    connectToWallet,
    email,
    firstName,
    lastName,
    type,
  } = useContext(PharmaContext);

  const [medName, setMedName] = useState("");
  const [uid, setUid] = useState("");
  const [batchName, setBatchName] = useState("");
  const [manufacturer, setManufacturer] = useState(false);
  const [distributor, setDistributor] = useState(false);
  const [smalldist, setSmalldist] = useState(false);
  const [pharmacist, setPharmacist] = useState(false);
  const [verified, setVerified] = useState([false, false, false, false, false]);

  const updateMedName = (e) => {
    setMedName(e.target.value);
  };

  const checkBatch = async (e) => {
    e.preventDefault();
    const url = "https://pharmatrue.vercel.app/get_med/" + medName;
    console.log(medName);
    await axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setUid(res.data.uid);
        setBatchName(res.data.name);
      })
      .then(async () => {
        for (let i = 0; i < 4; i++) {
          console.log(batchName)
          url = "https://pharmatrue.vercel.app/verified/" + batchName + "/" + i;
          await axios.get(url).then((res) => {
            console.log(url)
            console.log(res.data);
            const tempVerified = verified;
            tempVerified[i] = res.data.verified;
            setVerified(tempVerified);
          });
        }
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/">
          <p className={styles.title}>PharmaTrue.</p>
        </Link>
        <div className={styles.avatar_div}>
          <div className={styles.avatar_text}>
            <p style={{ fontWeight: 600 }} className={styles.white}>
              {email}
            </p>
            <p className={styles.white}>({type})</p>
          </div>
          <img src="/avatar.png" alt="" />
        </div>
      </header>
      <div className={styles.main}>
        <form onSubmit={checkBatch} className={styles.centered}>
          <input
            value={medName}
            onChange={updateMedName}
            placeholder="Batch to check"
          ></input>
          <button type="submit">Check</button>
        </form>
      </div>
      {uid ? (
        <div className={styles.centered}>
          <p>{uid}</p>
          <p>Manufacturer: {verified[0] ? "true" : "false"}</p>
          <p>Distributor: {verified[1] ? "true" : "false"}</p>
          <p>Small Distributor: {verified[2] ? "true" : "false"}</p>
          <p>Pharmacist: {verified[3] ? "true" : "false"}</p>
          <button>Verify as Patient</button>
        </div>
      ) : null}
    </div>
  );
}
