import axios from "axios";
import styles from "../styles/VerfiedComponent.module.css";
export default function VerifiedComponent({
  batch,
  role,
  decorator,
  verified,
}) {
  const verify = () => {
    console.log(batch + " Verified by " + role);
  };

  const imgPath = role + "_" + decorator + ".png";
  return (
    <div className={styles.verfied_card}>
      <img src={imgPath} alt="" />
      {verified === true && (
        <div
          style={{
            color: "green",
          }}
          className={styles.verified_text}
        >
          Verified
        </div>
      )}

      {verified === false &&
        (decorator === "bw" ? (
          <div
            style={{
              color: "yellow",
            }}
            className={styles.verified_text}
          >
            Unverified
          </div>
        ) : (
          <div className={styles.buttons_div}>
            <button
              onClick={verify}
              style={{
                width: "60%",
                aspectRatio: "1",
                backgroundColor: "transparent",
                border: "none",
                backgroundImage: 'url("/verify_bg.svg")',
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              Verify
            </button>
            <button
              style={{
                width: "60%",
                aspectRatio: "1",
                backgroundColor: "transparent",
                border: "none",
                backgroundImage: 'url("/reject.svg")',
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              Report
            </button>
          </div>
        ))}
    </div>
  );
}
