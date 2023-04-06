import { useMantineTheme } from "@mantine/core";
import styles from "../styles/Home.module.css";
import { React, useEffect, useState } from "react";

export default function Salat() {
  const { theme } = useMantineTheme();
  const apiKey =
    "http://api.aladhan.com/v1/calendarByCity/2017/4?city=London&country=United%20Kingdom&method=2";
  const latitude = "48.8566";
  const longitude = "2.3522";

  const [prayerTimes, setPrayerTimes] = useState({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });

  useEffect(() => {
    // Appeler l'API pour récupérer les heures de prière
    fetch(
      `https://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=2&month=${
        new Date().getMonth() + 1
      }&year=${new Date().getFullYear()}&adjustment=1&api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const prayerTimes = data.data[new Date().getDate() - 1].timings;
        // Stocker les heures de prière dans l'état
        setPrayerTimes(prayerTimes);
      });
  }, []);

  return (
    <div className={`${styles["salat-master"]}`}>
      <h1 className={styles["salat-title"]}>Horaire de prière</h1>
      <div className={`${styles["salat-day"]}`}>
        <p className={`${styles["salat-fajr"]}`}>
          Fajr: <span>{prayerTimes.Fajr}</span>
        </p>
        <p className={`${styles["salat-duhr"]}`}>
          Dhuhr: <span>{prayerTimes.Dhuhr}</span>
        </p>
        <p className={`${styles["salat-asr"]}`}>
          Asr: <span>{prayerTimes.Asr}</span>
        </p>
        <p className={`${styles["salat-maghrib"]}`}>
          Maghrib: <span>{prayerTimes.Maghrib}</span>
        </p>
        <p className={`${styles["salat-isha"]}`}>
          Isha: <span>{prayerTimes.Isha}</span>
        </p>
      </div>
    </div>
  );
}
