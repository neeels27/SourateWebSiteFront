// Importer les bibliothèques et les fichiers nécessaires

import { useMantineTheme } from "@mantine/core";
import styles from "../styles/salat.module.css";
import { React, useEffect, useState } from "react";

// Définir le composant principal
export default function Salat() {
  // Récupérer le thème actuel de Mantine
  const { theme } = useMantineTheme();

  // Définir l'URL de l'API et les coordonnées de la ville
  const apiKey =
    "http://api.aladhan.com/v1/calendarByCity/2017/4?city=London&country=United%20Kingdom&method=2";
  const latitude = "48.8566";
  const longitude = "2.3522";

  // Initialiser l'état des horaires de prière
  const [prayerTimes, setPrayerTimes] = useState({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });
  // Utiliser useEffect pour appeler l'API et récupérer les horaires de prière
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

        // Changer le fond d'écran en fonction de la prière en cours
        const now = new Date();
        const fajr = new Date(prayerTimes.Fajr);
        const dohr = new Date(prayerTimes.Dhuhr);
        const asr = new Date(prayerTimes.Asr);
        const maghrib = new Date(prayerTimes.Maghrib);
        const isha = new Date(prayerTimes.Isha);

        const body = document.body;

        if (now < fajr) {
          body.style.backgroundImage =
            "url('/Users/nelson/projet-final-z/islamicwebsite/image/Aube.jpg')";
        } else if (now >= fajr && now < dohr) {
          body.style.backgroundImage =
            "url('/Users/nelson/projet-final-z/islamicwebsite/image/Aube.jpg')";
        } else if (now >= dohr && now < asr) {
          body.style.backgroundImage =
            "url('/Users/nelson/projet-final-z/islamicwebsite/image/Aube.jpg')";
        } else if (now >= asr && now < maghrib) {
          body.style.backgroundImage =
            "url('/Users/nelson/projet-final-z/islamicwebsite/image/Aube.jpg')";
        } else if (now >= maghrib && now < isha) {
          body.style.backgroundImage =
            "url('/Users/nelson/projet-final-z/islamicwebsite/image/Aube.jpg')";
        } else {
          body.style.backgroundImage =
            "url('/Users/nelson/projet-final-z/islamicwebsite/image/Aube.jpg')";
        }
      });
  }, []);

  // Rendre le contenu du composant
  return (
    <div className={`${styles["salat-master"]}`}>
      <h1 className={styles["salat-title"]}>Heures de prières</h1>
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
