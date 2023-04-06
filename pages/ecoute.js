import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import MusicPlayer from "../components/MusicPlayer";
import { Aside, MediaQuery, Text, Pagination } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import {
  IconVolume,
  IconVolumeOff,
  IconPlayerTrackNextFilled,
  IconPlayerTrackPrevFilled,
  IconVolume2,
} from "@tabler/icons-react";

export default function Ecoute() {
  const [audioTrack, setAudioTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sourate, setSourate] = useState("");
  const [sourateSelected, setSourateSelected] = useState("");
  const [sourateSelectedNumber, setSourateSelectedNumber] = useState(0);
  const [currentSourate, setCurrentSourate] = useState("");
  const [activePage, setPage] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);

  console.log(sourate);
  async function fetchAudioTrack() {
    const res = await axios.get("http://localhost:1337/api/pistes?populate=*");
    console.log(res.data.data);
    setSourate(res.data.data);
    setSourateSelected(
      res.data.data[0].attributes?.audio?.data?.attributes?.url
    );
  }

  useEffect(() => {
    fetchAudioTrack();
  }, []);

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
  function handleDownloadClick(audioUrl) {
    setIsDownloading(true);
    axios.get(audioUrl, { responseType: "arraybuffer" }).then((res) => {
    const content = res.data;
    const fileName = "nom-du-fichier.mp3";
    downloadFile(content, fileName);
    setIsDownloading(false);
  });
}
  return (
    <div className={`${styles["page-ecoute"]}`}>
      <h1 className={`${styles["main-title"]}`}>Pistes Audio</h1>

      <h2 className={`${styles["main-subtitle"]}`}>
        Dans cette page, vous trouverez des pistes audios du coran dans de
        nombreuses langues.
      </h2>

      <div className={`${styles["all-sections"]}`}>
        <div className={`${styles["piste-audio-france"]}`}>
          {/* <h3 className={`${styles["subtitle-france"]}`}>
            Piste Audio en français
          </h3> */}

          {/* <img
            className={`${styles["img-flag-france"]}`}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_France_%281794–1815%2C_1830–1974%2C_2020–present%29.svg/langfr-1024px-Flag_of_France_%281794–1815%2C_1830–1974%2C_2020–present%29.svg.png"
            alt="Drapeau français"
          /> */}
        </div>
        <div className={`${styles["piste-audio-arabe"]}`}>
          {/* <h3 className={`${styles["subtitle-arabe"]}`}>
            Piste Audio en arabe
          </h3> */}
          {/* <a href="/pages/pisteaudiofrench.js">
            <img
              className={`${styles["img-flag-arabe"]}`}
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fimplausablealternatehistory%2Fimages%2Fc%2Fc4%2FFlag_of_the_Arab_League_svg.png%2Frevision%2Flatest%3Fcb%3D20120615105623&f=1&nofb=1&ipt=f11ccb51fc7f4928058
              8058a999141aebcc717b4a03118d18fc0c2210a3e868979c1&ipo=images"
              alt="Drapeau arabe"
            />
          </a> */}
        </div>
      </div>
      {sourate
        ? sourate.map((srt, index) => {
            return (
              <div className={`${styles["item-pistes-sourates"]}`}>
                {srt.attributes.title} {srt.attributes.description}{" "}
                {srt.attributes.space}
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
