import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <h1 className={`${styles["page-lecture-main-title"]}`}>
        Lecture du coran
      </h1>
      <p>
        Vous trouverez dans cette section plusisurs version du coran dans
        différentes langues comme par exemple le français, l'anglais etc...
      </p>
    </div>
  );
}
