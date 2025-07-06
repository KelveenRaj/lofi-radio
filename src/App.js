import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  VStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  Heading,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaPlay, FaPause } from "react-icons/fa";

const streamUrl = "https://ice3.somafm.com/groovesalad-128-mp3";
const vinylUrl =
  "https://images.pexels.com/photos/2746823/pexels-photo-2746823.jpeg?_gl=1*1snc891*_ga*ODM1NzMzMjY5LjE3NTE3NzU1NTY.*_ga_8JE65Q40S6*czE3NTE3NzU1NTYkbzEkZzEkdDE3NTE3NzU1NzAkajQ2JGwwJGgw";

const App = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleToggle = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() :  audioRef.current.play();
    setIsPlaying(!isPlaying);
  };
  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      color={useColorModeValue("gray.800", "white")}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <VStack spacing={6}>
        <Box position="absolute" top={4} right={4}>
          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />
        </Box>

        <Heading fontSize="3xl">Lo-Fi Vinyl Player</Heading>

        <Box // This is the vinyl container
          w={250}
          h={250}
          borderRadius="full"
          overflow="hidden"
          border="6px solid"
          borderColor={useColorModeValue("gray.300", "gray.700")}
          boxShadow="lg"
        >
          <Image
            src={vinylUrl}
            alt="vinyl"
            boxSize="100%"
            objectFit="cover"
            transformOrigin="center"
            sx={{
              animation: "spin 5s linear infinite",
              animationPlayState: isPlaying ? "running" : "paused",
              "@keyframes spin": {
                from: { transform: "rotate(0deg)" },
                to: { transform: "rotate(360deg)" },
              },
            }}
          />
        </Box>

        <Button
          leftIcon={isPlaying ? <FaPause /> : <FaPlay />}
          colorScheme="teal"
          size="lg"
          onClick={handleToggle}
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>

        <audio ref={audioRef} src={streamUrl} />
      </VStack>
    </Box>
  );
};

export default App;
