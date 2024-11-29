import NavBar from "../components/NavBar";
import Service from "../components/Service";
import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { ArrowDownIcon } from '@chakra-ui/icons'
import { useMediaQuery, keyframes } from '@chakra-ui/react'
import { TranslationsContext } from "../App";
import { useContext } from "react";

const Home = () => {
    const { t } = useContext(TranslationsContext);
    const [minWidth1024] = useMediaQuery('(min-width: 1024px)');
    const [minWidth768] = useMediaQuery('(min-width: 768px)');

    const bounce = keyframes`
        0%, 100% {
            transform: translateY(-5px);
        }
        50% {
            transform: translateY(3px);
        }
    `;

    const blink = keyframes`
        0%, 100% {
           box-shadow: inset 350px 0px 0px 0px rgba(0,0,0,0.3) 
        }
        50% {
            box-shadow: inset 350px 0px 0px 0px rgba(0,0,0,0)
        }
    `;

    return (
        <>
            <NavBar />
            <Box
                position="relative"
                minHeight={minWidth1024 ? '100vh' : minWidth768 ? '62vh' : '80vh'}
                display="grid"
                placeItems="center"
                backgroundImage="url('../assets/wallpaper.jpg')"
                backgroundSize="cover"
                backgroundPosition="center"
                minWidth="100%"
            >
                <Box
                    gridColumnStart="1"
                    gridRowStart="1"
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    backgroundColor="rgba(0, 0, 0, 0.6)"
                    sx={{
                        backdropFilter: "blur(2px)",
                    }}
                    zIndex="0"
                >
                </Box>
                <Box
                    position="relative"
                    bottom={minWidth1024 ? "1rem" : '0'}
                    zIndex="1"
                    width={minWidth1024 ? '50%' : minWidth768 ? '75%' : '100%'}
                    textAlign="center"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    maxWidth="80rem"
                    gap="1rem"
                    padding="1rem"
                    color="white"
                >
                    <Box>
                        <Heading
                            as="h1"
                            fontSize={minWidth768 ? '3rem' : '1.875rem'}
                            lineHeight={minWidth768 ? '1' : '2.25rem'}
                            fontWeight="700"
                            marginBottom="1.25rem"
                        >
                            {t("firstHeading")}
                        </Heading>
                        <Heading
                            as="h1"
                            fontSize={minWidth768 ? '1.875rem' : '1.25rem'}
                            lineHeight={minWidth768 ? '2.25rem' : '1.75rem'}
                            fontWeight="700"
                            marginBottom="1.25rem"
                        >
                            {t("secondHeading")}
                        </Heading>
                        <Text
                            fontSize="1.125rem"
                            lineHeight="1.75rem"
                            marginBottom="1.25rem"
                        >
                            {t("firstText")}
                        </Text>
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="center"
                            gap="1.5rem"
                        >
                            <Link
                                as="a"
                                href="#service"
                                height="4rem"
                                minHeight="4rem"
                                paddingLeft="1.5rem"
                                paddingRight="1.5rem"
                                fontSize="1.125rem"
                                color="#0f0e00"
                                backgroundColor="#9dc61e"
                                display="inline-flex"
                                cursor="pointer"
                                userSelect="none"
                                flexWrap="wrap"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius=".75rem"
                                textAlign="center"
                                lineHeight="1em"
                                gap=".5rem"
                                fontWeight="600"
                                textDecorationLine="none"
                                _hover={{
                                    textDecorationLine: "none",
                                    boxShadow: "inset 350px 0px 0px 0px rgba(0,0,0,0.2)"
                                }}
                            >
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    textAlign="center"
                                >
                                    <Text>
                                        {t("firstButton")}
                                    </Text>
                                    <ArrowDownIcon
                                        paddingTop=".5rem"
                                        animation={`${bounce} 1s infinite ease-in-out`}
                                        boxSize="7"
                                    >
                                    </ArrowDownIcon>
                                </Box>
                            </Link>
                            <Link
                                as="a"
                                href="/rackets"
                                height="4rem"
                                minHeight="4rem"
                                paddingLeft="1.5rem"
                                paddingRight="1.5rem"
                                fontSize="1.125rem"
                                color="#0f0e00"
                                backgroundColor="#e5e6e6"
                                display="inline-flex"
                                cursor="pointer"
                                userSelect="none"
                                flexWrap="wrap"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius=".75rem"
                                border="3px solid #9dc61e"
                                textAlign="center"
                                lineHeight="1em"
                                gap=".5rem"
                                fontWeight="600"
                                textDecorationLine="none"
                                animation={`${blink} 2s ease-in-out infinite`}
                                _hover={{
                                    textDecorationLine: "none",
                                }}
                            >
                                <Text>
                                    {t("secondButton")}
                                </Text>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Service />
        </>
    )
}

export default Home;