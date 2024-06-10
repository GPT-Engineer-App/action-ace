import { Box, Flex, Text, Link, Spacer, IconButton } from "@chakra-ui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  const [display, changeDisplay] = useState("none");

  return (
    <Box>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="teal.500"
        color="white"
      >
        <Flex align="center" mr={5}>
          <Text fontSize="lg" fontWeight="bold">
            Todo App
          </Text>
        </Flex>

        <Spacer />

        <Box display={{ base: "block", md: "none" }} onClick={() => changeDisplay(display === "none" ? "flex" : "none")}>
          <IconButton
            icon={display === "none" ? <FaBars /> : <FaTimes />}
            variant="outline"
            aria-label="Menu"
          />
        </Box>

        <Box
          display={{ base: display, md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            width={{ base: "full", md: "auto" }}
            alignItems="center"
            justifyContent="flex-end"
            flexGrow={1}
          >
            <Link as={RouterLink} to="/" mt={{ base: 4, md: 0 }} mr={6} display="block">
              Home
            </Link>
            <Link as={RouterLink} to="/about" mt={{ base: 4, md: 0 }} mr={6} display="block">
              About
            </Link>
            <Link as={RouterLink} to="/events" mt={{ base: 4, md: 0 }} mr={6} display="block">
              Events
            </Link>
            <Link as={RouterLink} to="/contact" mt={{ base: 4, md: 0 }} display="block">
              Contact
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;