import "../styles/globals.css";
import styles from "../styles/Home.module.css";

import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";

import { IconBook } from "@tabler/icons-react";

export function SwitchToggle() {
  const theme = useMantineTheme();
}

function MyApp({ Component, pageProps }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 200 }}
          className={`${styles["navigation-bar-main"]}`}
        >
          <ul className={`${styles["navigation-bar-items"]}`}>
            <a href="/">
              <li className={`${styles["navigation-bar-items-home"]}`}>
                Accueil
              </li>
            </a>
            <a href="/ecoute">
              <li className={`${styles["navigation-bar-items-ecoute"]}`}>
                Audio
              </li>
            </a>
            <a href="/lecture">
              <li className={`${styles["navigation-bar-items-book"]}`}>
                Livre
              </li>
              {/* <IconBook className={`${styles["icn-book"]}`}></IconBook> */}
            </a>
            <a href="/salat">
              <li className={`${styles["navigation-bar-items-salat"]}`}>
                Horaire de prière
              </li>
            </a>
          </ul>
        </Navbar>
      }
      header={
        <Header
          className={`${styles["header-main"]}`}
          height={{ base: 50, md: 70 }}
          p="md"
        >
          <div className={`${styles["title-header"]}`}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text className={`${styles["header-title"]} scroll `}>
              Salam Salam !
            </Text>
          </div>
        </Header>
      }
    >
      <Component {...pageProps} />
    </AppShell>
  );
}

export default MyApp;
