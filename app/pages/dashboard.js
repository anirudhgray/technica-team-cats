import { useEffect, useState } from "react";
import styles from "../styles/Dashboard.module.css";
import { useContext } from "react";
import { PharmaContext } from "../context/PharmaContext";
import Link from "next/link";
import axios from "axios";
import VerifiedComponent from "../components/VerfiedComponent";
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
  const roles = ["manufacturer", "distributor", "pharmacist", "patient"];

  const [medName, setMedName] = useState("");
  const [uid, setUid] = useState("");
  const [batchName, setBatchName] = useState("");
  const [manufacturer, setManufacturer] = useState(false);
  const [distributor, setDistributor] = useState(false);
  const [smalldist, setSmalldist] = useState(false);
  const [pharmacist, setPharmacist] = useState(false);
  const [verified, setVerified] = useState([false, false, false, false]);

  const updateMedName = (e) => {
    setMedName(e.target.value);
  };
  const sendBatchRequest = async (url) => {
    await axios.get(url).then((res) => {
      console.log(res.data);
      setUid(res.data.uid);
      setBatchName(res.data.name);
    });
  };
  const sendVerifiedRequest = async (url, i) => {
    await axios.get(url).then((res) => {
      console.log(url);
      console.log(res.data);

      setVerified((verified) => {
        const arr = [...verified];
        arr[i] = res.data.verified;
        return arr;
      });
    });
  };

  const checkBatch = async (e) => {
    e.preventDefault();
    const url = "https://pharmatrue.vercel.app/get_med/" + medName;

    console.log(medName);
    await sendBatchRequest(url);
  };
  useEffect(() => {
    if (batchName.length === 0) return;

    const setVerifyArray = async () => {
      for (let i = 0; i < 4; i++) {
        console.log(batchName);
        const url =
          "https://pharmatrue.vercel.app/verified/" + batchName + "/" + i;
        sendVerifiedRequest(url, i);
      }
    };
    setVerifyArray();
  }, [batchName]);

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
            className={styles.input_field}
            value={medName}
            onChange={updateMedName}
            placeholder="Batch to check"
          ></input>
          <button className={styles.check_btn} type="submit">
            Check
          </button>
        </form>
      </div>
      {uid ? (
        <div className={styles.centered}>
          {roles.map((role, i) => (
            <VerifiedComponent
              key={"role-" + i}
              roleid={i}
              batch={batchName}
              role={role}
              decorator={type == role ? "colored" : "bw"}
              verified={verified[i]}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
