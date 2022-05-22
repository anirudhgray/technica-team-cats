import axios from "axios";
import { useState } from "react";

export default function create() {
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");

  const submit = async () => {
    await axios.get(
      "https://pharmatrue.vercel.app/set_med/" + name + "/" + uid
    );
  };

  return (
    <div>
      <p>Name : </p>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          e.preventDefault();
          setName(e.target.value);
        }}
      />
      <br />
      <p>UID :</p>
      <input
        type="text"
        value={uid}
        onChange={(e) => {
          e.preventDefault();
          setUid(e.target.value);
        }}
      />
      <button onClick={submit}>Submit</button>
    </div>
  );
}
