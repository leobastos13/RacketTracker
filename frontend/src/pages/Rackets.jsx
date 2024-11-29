import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import Search from "../components/Search"
import axios from "axios"
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { useMediaQuery } from '@chakra-ui/react'
import { TranslationsContext } from "../App";
import { useContext } from "react";

const Rackets = () => {
    const { t } = useContext(TranslationsContext);
    const [minWidth1024] = useMediaQuery('(min-width: 1024px)');
    const [minWidth768] = useMediaQuery('(min-width: 768px)');
    const [minWidth640] = useMediaQuery('(min-width: 640px)');
    const [rackets, setRackets] = useState([]);
    const [brands, setBrands] = useState([])
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        getRackets();
    }, []);

    const getRackets = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_PATH);
            const normalize = response.data.map((racket) => ({
                ...racket,
                brand: racket.brand.toLowerCase()
            }));
            setRackets(normalize);
            setBrands([... new Set(normalize.map(item => item.brand))])
        } catch (error) {
            console.error(error);
        }
    }

    const shuffleArray = (item) => {
        const result = [];
        const items = [...item];
        let lastSource = null;
        while (items.length > 0) {
            const available = items.filter(item => item.sources[0].source !== lastSource);
            let selected;
            if (available.length > 0) {
                selected = available[Math.floor(Math.random() * available.length)];
            } else {
                selected = items[Math.floor(Math.random() * items.length)];
            }
            result.push(selected);
            lastSource = selected.sources[0].source;
            items.splice(items.indexOf(selected), 1);
        }
        return result;
    }

    return (
        <>
            <NavBar />
            <Box
                backgroundColor="#f2f2f2"
                width="100vw"
                minHeight="100vh"
                
            >
                <Box
                    display={minWidth1024 && "flex"}
                    width="100%"
                    paddingTop="5rem"
                    justifyContent="space-evenly"
                    alignItems="center"
                >
                    <Box
                        display="flex"
                        width={searching ? "100%" : "50%" && !minWidth1024 && "100%"}
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                        padding="1rem"
                        height={!searching && minWidth1024 && "55vh"}
                    >
                        <Search
                            brands={brands}
                            rackets={rackets}
                            shuffle={shuffleArray}
                            setSearching={setSearching}
                        />
                    </Box>
                    {!searching && (
                        <Box
                            display="flex"
                            width={minWidth1024 ? "50%" : "100%"}
                            alignItems="center"
                            justifyContent="center"
                            flexDirection={minWidth1024 ? "column" : "row"}
                            padding="1rem"
                            marginTop="6rem"
                        >
                            <Box
                                display="flex"
                                gap="2rem"
                                padding="1rem"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Image
                                    src="../assets/logo.svg"
                                    loading="lazy"
                                    width={minWidth640 ? "8rem" : "4rem"}
                                    alt="big logo"
                                />
                                <Box textAlign="center">
                                    <Heading
                                        as="h1"
                                        fontSize={minWidth640 ? "1.5rem" : "1rem"}
                                        lineHeight={minWidth640 ? "2rem" : "1.25rem"}
                                        fontWeight="700"
                                    >
                                        {t("racketsTitle")}
                                    </Heading>
                                    <Text
                                        fontSize={minWidth640 ? "1.2rem" : "1rem"}
                                        lineHeight={minWidth640 ? "1.5rem" : "1.25rem"}
                                        paddingTop="1rem"
                                    >
                                        {t("racketsDesc1")}
                                    </Text>
                                    <Text fontSize={minWidth640 ? "1.2rem" : "1rem"}>
                                        {t("racketsDesc2")}
                                    </Text>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    )
}

export default Rackets