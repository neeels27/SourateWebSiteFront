import styles from "../pages/index.module.css";
import React from "react";
import { Text } from "@mantine/core";

const Home = () => {
  return (
    <div className={`${styles["main-page"]}`}>
      <h1 className={`${styles["main-title"]}`}>Mon Islam</h1>

      <h2 className={`${styles["sous-titre-home-page"]}`}>
        Qu'est ce que l'Islam ?
      </h2>
      <p className={`${styles["main-text-home-page"]}`}>
        <br />
        De par son origine arabe, le terme "Islam" est intrinsèquement associé à
        l'idée de "soumission à la volonté de Dieu. Son étymologie est également
        rattachée au mot "salam", signifiant "paix". En qualité de religion
        monothéiste, l'Islam constitue la révélation divine transmise par
        l'intermédiaire de l'ange Gabriel au prophète Mohamed (c. 570-632). En
        tant que "Dernier messager" issu de la lignée des prophètes bibliques
        tels qu'Adam, Abraham, Moïse et Jésus, le caractère divin de ces
        derniers est rejeté par les musulmans."
        <br />
        <br />
      </p>
      <ul className={`${styles["pilier-islam-home-page"]}`}>
        <li>
          La Chahada, profession de foi, consiste à adhérer à la croyance en
          Allah, unique créateur, ainsi qu'en son prophète Mouhammed, envoyé à
          l'humanité tout entière.{" "}
        </li>
        <br />
        <li>
          La prière (A-Salat) doit être accomplie cinq fois par jour, à des
          heures déterminées et en direction de La Mecque. <br />
        </li>
        <br />
        <li>
          Durant le mois de Ramadan, le Saoum ou jeûne doit être observé du
          lever au coucher du soleil. <br />
        </li>
        <br />
        <li>
          Az-Zakat ou l'aumône doit être donnée aux pauvres, en fonction de ses
          moyens.
        </li>
        <br />
        <li>
          Le Hajj ou pèlerinage doit être effectué au moins une fois dans sa vie
          si le croyant en a les moyens physiques et matériels. <br />
        </li>
      </ul>
      <br />
      <p className={`${styles["main-text-home-page"]}`}>
        Le croyant doit s'en remettre entièrement à Allah, adhérer sincèrement à
        l'Islam, avoir une confiance absolue en Dieu et chercher à parfaire son
        comportement. Les principes fondamentaux de l'Etat islamique sont
        définis dans le Coran et la Sunna, qui regroupent les paroles et les
        actes du prophète. L'Islam, qui ne se considère pas comme une religion
        nouvelle, rétablit la révélation faite par Dieu aux prophètes.
        Contrairement à d'autres religions, il n'y a pas de prêtres dans
        l'Islam, mais des oulémas jurisconsultes et des imams qui dirigent la
        prière. Grâce aux efforts exceptionnels des Arabes pour transmettre le
        message du prophète, l'Islam s'est répandu dans le monde entier.
        Aujourd'hui, un cinquième des musulmans est de langue arabe,
        majoritairement présents en
        </p>
        <Text >
          <ul className={`${styles["mot-mise-evidence"]}`}>
            <li className={`${styles["indonesie-pays"]}`}>Indonésie</li>
            <li>Pakistan</li>
            <li>Inde</li>
            <li>Bangladesh</li>
            <li>Turquie</li>
            <li>Egypte</li>
            <li>Nigeria</li>
          </ul>
        </Text>
    </div>
  );
}

export default Home;
