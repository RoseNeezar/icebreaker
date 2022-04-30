import {
  AppShell,
  Burger,
  Header as MHeader,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React, { FC } from "react";

interface IHeader {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<IHeader> = ({ setOpened, opened }) => {
  const theme = useMantineTheme();
  return (
    <MHeader height={55} p="md">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="md"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Text>Application header</Text>
      </div>
    </MHeader>
  );
};

export default Header;
