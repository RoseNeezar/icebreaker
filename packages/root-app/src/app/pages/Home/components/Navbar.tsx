import { Navbar as MNavbar, Text } from "@mantine/core";
import { motion } from "framer-motion";
import React, { FC } from "react";

interface INavbar {
  opened: boolean;
}
const Navbar: FC<INavbar> = ({ opened }) => {
  return (
    <MNavbar
      p="sm"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <motion.button
        className="p-3 mb-2 bg-red-500 rounded-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        whileHover={{ scale: 1.1 }}
      >
        Wheel
      </motion.button>

      <Text>Application navbar</Text>
    </MNavbar>
  );
};

export default Navbar;
