import { useState } from "react";
import styles from "../styles/Register.module.css";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useContext } from "react";
import { PharmaContext } from "../context/PharmaContext";
export default function Register() {
  const initialState = {
    email: "",
    fname: "",
    lname: "",
    accountType: "patient",
  };
  const [formState, setFormState] = useState(initialState);
  const { appStatus, currentAccount, connectToWallet } =
    useContext(PharmaContext);
  const submit = async (e) => {
    e.preventDefault();
    console.log(formState);

    const res = await setDoc(doc(db, "users", currentAccount), formState);
    console.log("res = ", res);
  };
  return (
    <div className={styles.form_container}>
      <h1>Register</h1>
      <form className={styles.form} onSubmit={submit}>
        <input
          className={styles.input_text}
          type="text"
          placeholder="First Name"
          onChange={(e) =>
            setFormState((formState) => ({
              ...formState,
              fname: e.target.value,
            }))
          }
          value={formState.fname}
        />
        <input
          className={styles.input_text}
          type="text"
          placeholder="Last Name"
          onChange={(e) =>
            setFormState((formState) => ({
              ...formState,
              lname: e.target.value,
            }))
          }
          value={formState.lname}
        />
        <input
          className={styles.input_text}
          type="text"
          placeholder="Email"
          onChange={(e) =>
            setFormState((formState) => ({
              ...formState,
              email: e.target.value,
            }))
          }
          value={formState.email}
        />
        <select
          name=""
          className={styles.input_text}
          id=""
          onChange={(e) =>
            setFormState((formState) => ({
              ...formState,
              accountType: e.target.value,
            }))
          }
          value={formState.accountType}
        >
          <option value="manufacturer">Manufacturer</option>
          <option value="distributor">Distributor</option>
          <option value="pharmacy">Pharmacy</option>
          <option value="patient">Patient</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
