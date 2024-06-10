import { Box, Flex, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="teal.500" color="white" py={4} mt={10}>
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        maxW="container.lg"
        mx="auto"
        px={4}
      >
        <Text>© 2023 Todo App</Text>
        <Flex>
          <Link href="#" mx={2}>
            Privacy Policy
          </Link>
          <Link href="#" mx={2}>
            Terms of Service
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;