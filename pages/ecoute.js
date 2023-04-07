// Importer les styles et les bibliothèques nécessaires
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import MusicPlayer from "../components/MusicPlayer";
import { Aside, MediaQuery, Text, Pagination } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

// Définir le composant principal
export default function Ecoute() {
  const [audioTrack, setAudioTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sourate, setSourate] = useState("");
  const [sourateSelected, setSourateSelected] = useState("");
  const [sourateSelectedNumber, setSourateSelectedNumber] = useState(0);
  const [currentSourate, setCurrentSourate] = useState("");
  const [activePage, setPage] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);

  // Fonction pour récupérer les pistes audio depuis l'API
  async function fetchAudioTrack() {
    const res = await axios.get("http://localhost:1337/api/pistes?populate=*");
    console.log(res.data.data);
    setSourate(res.data.data);
    setSourateSelected(
      res.data.data[0].attributes?.audio?.data?.attributes?.url
    );
  }

  // Utiliser useEffect pour appeler la fonction fetchAudioTrack lors du montage du composant
  useEffect(() => {
    fetchAudioTrack();
  }, []);

  // Fonction pour télécharger un fichier audio
  function downloadFile(content, fileName) {
    const blob = new Blob([content], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Fonction pour gérer le clic sur le bouton de téléchargement
  function handleDownloadClick(audioUrl) {
    setIsDownloading(true);
    axios.get(audioUrl, { responseType: "arraybuffer" }).then((res) => {
      const content = res.data;
      const fileName = "nom-du-fichier.mp3";
      downloadFile(content, fileName);
      setIsDownloading(false);
    });
  }

  // Rendre le contenu du composant
  return (
    <div className={`${styles["page-ecoute"]}`}>
      <h1 className={`${styles["main-title"]}`}>Pistes Audio</h1>

      <h2 className={`${styles["main-subtitle"]}`}>
        Dans cette page, vous trouverez des pistes audios du coran dans de
        nombreuses langues.
      </h2>

      <div className={`${styles["all-sections"]}`}></div>
      {sourate
        ? sourate.map((srt, index) => {
            return (
              <div className={`${styles["item-pistes-sourates"]}`}>
                <Text> </Text>
                <svg
                  className={`${styles["button-lecture"]}`}
                  onClick={() => {
                    setSourateSelected(
                      srt.attributes?.audio?.data?.attributes?.url
                    );
                    setSourateSelectedNumber(index);
                  }}
                  viewBox="0 0 24 24"
                  width="19"
                  height="19"
                >
                  <path fill="currentColor" d="M3 22v-20l18 10-18 10z"></path>
                </svg>
                {srt.attributes.title} {srt.attributes.description}
              
                <button
                  disabled={isDownloading}
                  onClick={() =>
                    handleDownloadClick(
                      srt.attributes?.audio?.data?.attributes?.url
                    )
                  }
                  className={`${styles["download-button"]}`}
                >
                  <IconDownload
                    className={`${styles["download-button-icon"]}`}
                  ></IconDownload>
                </button>
              </div>
            );
          })
        : ""}
      {/* Dans cette  MusicPlayer , la sourateSelected permet de naviguer dans les différentes index du tableau */}
      <MusicPlayer
        sourate={sourate}
        setSourateSelected={setSourateSelected}
        sourateSelectedNumber={sourateSelectedNumber}
        src={`http://localhost:1337${sourateSelected}`}
      />
      <p className={`${styles["current-track"]}`}>
        {sourate && sourate[sourateSelectedNumber]
          ? `${sourate[sourateSelectedNumber].attributes.title}${sourate[sourateSelectedNumber].attributes.description}`
          : ""}
      </p>

      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
          <Text className={`${styles["version-ecrite"]}`}>Lecture</Text>
          {/* <p>{sourate[sourateSelectedNumber].attributes.title}</p> */}
        </Aside>
      </MediaQuery>
      <Pagination
        defaultValue={1}
        total={2}
        color="green"
        size="md"
        radius="lg"
        withControls={true}
        position="center"
      />
    </div>
  );
}

// // Importer les styles et les bibliothèques nécessaires
// import styles from "../styles/Home.module.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import MusicPlayer from "../components/MusicPlayer";
// import { Aside, MediaQuery, Text, Pagination } from "@mantine/core";
// import { IconDownload } from "@tabler/icons-react";

// // Définir le composant principal
// export default function Ecoute() {
// // Initialiser les états du composant
// const [audioTrack, setAudioTrack] = useState(null);
// const [loading, setLoading] = useState(true);
// const [sourate, setSourate] = useState(null);
// const [sourateSelected, setSourateSelected] = useState("");
// const [sourateSelectedNumber, setSourateSelectedNumber] = useState(0);
// const [currentSourate, setCurrentSourate] = useState("");
// const [activePage, setPage] = useState(1);
// const [isDownloading, setIsDownloading] = useState(false);

// // Fonction pour récupérer les pistes audio depuis l'API
// async function fetchAudioTrack() {
// const res = await axios.get("http://localhost:1337/api/pistes?populate=*");
// setSourate(res.data.data);
// setSourateSelected(res.data.data[0].attributes?.audio?.data?.attributes?.url);
// }

// // Utiliser useEffect pour appeler la fonction fetchAudioTrack lors du montage du composant
// useEffect(() => {
// fetchAudioTrack();
// }, []);

// // Fonction pour télécharger un fichier audio
// function downloadFile(content, fileName) {
// const blob = new Blob([content], { type: "application/octet-stream" });
// const url = URL.createObjectURL(blob);
// const link = document.createElement("a");
// link.href = url;
// link.download = fileName;
// document.body.appendChild(link);
// link.click();
// document.body.removeChild(link);
// URL.revokeObjectURL(url);
// }

// // Fonction pour gérer le clic sur le bouton de téléchargement
// function handleDownloadClick(audioUrl) {
// setIsDownloading(true);
// axios.get(audioUrl, { responseType: "arraybuffer" }).then((res) => {
// const content = res.data;
// const fileName = "nom-du-fichier.mp3";
// downloadFile(content, fileName);
// setIsDownloading(false);
// });
// }

// // Rendre le contenu du composant
// return (
// <div className={${styles["page-ecoute"]}}>
// {/* Afficher le titre et le sous-titre de la page */}
// <h1 className={${styles["main-title"]}}>Pistes Audio</h1>
// <h2 className={${styles["main-subtitle"]}}>
// Dans cette page, vous trouverez des pistes audios du coran dans de nombreuses langues.
// </h2>
//   {/* Afficher la liste des pistes audio */}
//   <div className={`${styles["all-sections"]}`}>
//     {sourate && sourate.map((srt, index) => {
//       return (
//         <div className={`${styles["item-pistes-sourates"]}`}>
//           {/* Afficher le bouton de lecture */}
//           <svg
//             className={`${styles["button-lecture"]}`}
//             onClick={() => {
//               setSourateSelected(srt.attributes?.audio?.data?.attributes?.url);
//               setSourateSelectedNumber(index);
//             }}
//             viewBox="0 0 24 24"
//             width="19"
//             height="
//             >
//             <path fill="currentColor" d="M3 22v-20l18 10-18 10z"></path>
//           </svg>

//           {/* Afficher le titre et la description de la piste audio */}
//           {srt.attributes.title} {srt.attributes.description}

//           {/* Afficher le bouton de téléchargement */}
//           <button
//             disabled={isDownloading}
//             onClick={() =>
//               handleDownloadClick(srt.attributes?.audio?.data?.attributes?.url)
//             }
//             className={`${styles["download-button"]}`}
//           >
//             <IconDownload className={`${styles["download-button-icon"]}`} />
//           </button>
//         </div>
//       );
//     })}
//   </div>

//   {/* Afficher le lecteur audio */}
//   <MusicPlayer
//     sourate={sourate}
//     setSourateSelected={setSourateSelected}
//     sourateSelectedNumber={sourateSelectedNumber}
//     src={`http://localhost:1337${sourateSelected}`}
//   />

//   {/* Afficher le titre de la piste audio actuelle */}
//   <p className={`${styles["current-track"]}`}>
//     {sourate && sourate[sourateSelectedNumber] ? `${sourate[sourateSelectedNumber].attributes.title}${sourate[sourateSelectedNumber].attributes.description}` : ""}
//   </p>

//   {/* Afficher le volet latéral et la pagination */}
//   <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
//     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
//       <Text className={`${styles["version-ecrite"]}`}>Lecture</Text>
//     </Aside>
//   </MediaQuery>
//   <Pagination
//     defaultValue={1}
//     total={2}
//     color="green"
//     size="md"
//     radius="lg"
//     withControls={true}
//     position="center"
//   />
// </div>
// );
// }
