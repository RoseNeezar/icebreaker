import { AppShell, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

const Home = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      className={`${
        theme.colorScheme === "dark" ? "bg-dark-main" : "bg-white"
      }`}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<Navbar opened={opened} />}
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      <Outlet />
    </AppShell>
  );
};
export default Home;
