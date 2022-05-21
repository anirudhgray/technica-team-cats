import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const PharmaContext = createContext();

export const PharmaProvider = ({ children }) => {
  const [appStatus, setAppStatus] = useState("loading");
  const [currentAccount, setCurrentAccount] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [type, setType] = useState("");

  const router = useRouter();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkWalletAddress = async (walletAddress) => {
    const docRef = doc(db, "users", walletAddress);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data())
      setEmail(docSnap.data().email)
      setType(docSnap.data().accountType)
      setFirstName(docSnap.data().firstName)
      setLastName(docSnap.data().lastName)
      router.push('/dashboard')
    }
    else {
      router.push('/register')
      console.log("not found")
    };
  };

  const checkWalletAddressInitial = async (walletAddress) => {
    const docRef = doc(db, "users", walletAddress);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data())
      setEmail(docSnap.data().email)
      setType(docSnap.data().accountType)
      setFirstName(docSnap.data().firstName)
      setLastName(docSnap.data().lastName)
    }
    else {
      console.log("not found")
    };
  };

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setAppStatus("noMetaMask");
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        // connected
        setAppStatus("connected");
        setCurrentAccount(addressArray[0]);
        checkWalletAddressInitial(addressArray[0]);
      } else {
        // not connected
        router.push("/");
        setAppStatus("notConnected");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectToWallet = async () => {
    if (!window.ethereum) return setAppStatus("noMetaMask");
    try {
      setAppStatus("loading");
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0]);
        setAppStatus("connected");
        checkWalletAddress(addressArray[0]);
      } else {
        router.push("/");
        setAppStatus("notConnected");
      }
    } catch (error) {
      setAppStatus("error");
    }
  };

  return (
    <PharmaContext.Provider
      value={{ appStatus, currentAccount, connectToWallet, email, firstName, lastName, type }}
    >
      {children}
    </PharmaContext.Provider>
  );
};
