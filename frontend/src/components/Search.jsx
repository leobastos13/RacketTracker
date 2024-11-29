import { useState, useContext } from "react";
import { TranslationsContext } from "../App";
import { Input, Select, useMediaQuery, SimpleGrid, Card, CardBody, Image } from '@chakra-ui/react'
import { Box, Text } from "@chakra-ui/react";

const Search = ({ brands, rackets, shuffle, setSearching }) => {
    const { t } = useContext(TranslationsContext);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [minWidth1024] = useMediaQuery('(min-width: 1024px)');
    const [minWidth768] = useMediaQuery('(min-width: 768px)');
    const [minWidth640] = useMediaQuery('(min-width: 640px)');
    
    const handleBrandSelection = (event) => {
        const chosenBrand = event.target.value;
        setSelectedBrand(chosenBrand);
        setSearchQuery("");
        setFilteredResults([]);
    };

    const handleSearch = (event) => {
        const search = event.target.value;
        setSearchQuery(search);
        if (search) {
            const filtered = rackets.filter((racket) =>
                racket.brand === selectedBrand && racket.name.toLowerCase().includes(search.toLowerCase())
            );
            const results = shuffle(filtered);
            setFilteredResults(results);
            setSearching(true);
        } else {
            setFilteredResults([]);
            setSearching(true);
        }
    };

    return (
        <Box
            textAlign="center"
            marginTop=".5rem"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Select
                value={selectedBrand}
                onChange={handleBrandSelection}
                maxWidth="20rem"
                marginBottom="1rem"
                width="100%"
                border="2px solid"
                borderColor="#9dc61e"
                display="inline-flex"
                cursor="auto"
                userSelect="none"
                appearance="none"
                minHeight="3rem"
                lineHeight="1.5"
            >
                <option value="" disabled hidden>
                    {t("selectPlaceholder")}
                </option>
                {brands.map((brand, index) => (
                    <option key={index} value={brand}>
                        {brand.charAt(0).toUpperCase() + brand.slice(1)}
                    </option>
                ))}
            </Select>
            {selectedBrand && (
                <>
                    <Input
                        value={searchQuery}
                        onChange={handleSearch}
                        type="text"
                        placeholder={`${t("inputPlaceholder1")} ${selectedBrand}`}
                        maxWidth="20rem"
                        width="100%"
                        border="2px solid"
                        borderColor="#9dc61e"
                        display="inline-flex"
                        cursor="auto"
                        userSelect="none"
                        appearance="none"
                        height="3rem"
                        minHeight="3rem"
                        lineHeight="2"
                        disabled={!selectedBrand}
                    >
                    </Input>
                    {filteredResults.length !== 0 && (
                        <SimpleGrid
                            gridTemplateColumns={minWidth1024 ? 'repeat(3, minmax(0,1fr))' : 'repeat(1, minmax(0,1fr))'}
                            width="100%"
                            justifyContent="center"
                            alignItems="center"
                            gap={minWidth1024 ? "1rem" : minWidth768 ? "0.7rem" : "0.5rem"}
                            marginTop="2rem"
                        >
                            {filteredResults.map((item, index) => (
                                <Card
                                    key={index}
                                    as="a"
                                    href={item.sources[0].link}
                                    target="_blank"
                                    width={minWidth1024 ? "24rem" : minWidth768 ? "23rem" : "20rem"}
                                    height={minWidth1024 ? "24rem" : minWidth768 ? "23rem" : "20rem"}
                                    border="2px solid"
                                    borderColor={item.sources[0].source === "Tennis Warehouse" ? "#072b52" : "#faf514"}
                                    borderRadius="1rem"
                                    cursor="pointer"
                                >
                                    <CardBody>
                                        <Box
                                            display="flex"
                                            justifyContent="flex-start"
                                        >
                                            <Image
                                                src={item.sources[0].source === "Tennis Warehouse" ? "https://img.tenniswarehouse-europe.com/graphics-resizer/logos/TWE-logo.svg" : "https://global.tennis-point.com/on/demandware.static/-/Library-Sites-TennisPoint/default/dwe18fef00/logo/logo.svg"}
                                                alt={item.sources[0].source === "Tennis Warehouse" ? "Tennis Warehouse Logo" : "Tennis Point Logo"}
                                                loading="lazy"
                                                width={minWidth1024 && item.sources[0].source === "Tennis Warehouse" ? "3rem" : "5rem"}
                                                height="2rem"

                                            />
                                        </Box>
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            height={minWidth768 && "15rem"}
                                        >
                                            <Image
                                                src={item.sources[0].img_url}
                                                alt={item.name}
                                                loading="lazy"
                                                height={!minWidth768 && "12rem"}
                                            />
                                        </Box>

                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            marginTop=".5rem"
                                        >
                                            <Text 
                                                fontSize={!minWidth640 ? "0.85rem" : "1.125rem"}
                                                lineHeight="1.75rem"
                                                fontWeight="600"
                                                whiteSpace="nowrap"
                                                overflow="hidden"
                                                textOverflow="ellipsis"
                                            >   
                                                {item.name}
                                            </Text>
                                        </Box>
                                        <Text 
                                                textAlign="center"
                                                fontSize={!minWidth640 ? "0.85rem" : "1.125rem"}
                                                lineHeight="1.75rem"
                                            >   
                                                {item.sources[0].price}
                                            </Text>
                                    </CardBody>
                                </Card>
                            ))}
                        </SimpleGrid>
                    )}
                </>
            )}
        </Box >
    )
}

export default Search