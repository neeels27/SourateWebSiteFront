import { Text } from "@mantine/core";
import Link from "next/link";

export default function Ecoute() {
  return (
    <div>
      <h1>Sourate 1 Partie 2</h1>
      <Text size="xl" weight={700}>
        This is an example page!
      </Text>
      <Link className={`${styles["lien"]}`} href="/ecoute">Acceuil</Link>
    </div>
  );
}
