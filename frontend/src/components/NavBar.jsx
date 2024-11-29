import { Box, Text, Image, List, ListItem, Link, Drawer, DrawerOverlay, DrawerBody, DrawerContent } from "@chakra-ui/react";
import { useMediaQuery } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useState, useEffect, useRef, useContext } from "react";
import { TranslationsContext } from "../App";

const NavBar = () => {
    const { t, languages, i18n } = useContext(TranslationsContext);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [placement, setPlacement] = useState('left');
    const [minWidth1024] = useMediaQuery('(min-width: 1024px)');
    const [minWidth768] = useMediaQuery('(min-width: 768px)');
    const dropdownRef = useRef();
    const dropdownListRef = useRef();
    const drawerRef = useRef();
    const drawerListRef = useRef();

    const LANGUAGE_KEY = "savedLanguage";

    useEffect(() => {
        const savedLanguage = localStorage.getItem(LANGUAGE_KEY) || 'en';
        i18n.changeLanguage(savedLanguage);
    }, [i18n]);

    useEffect(() => {
        const CloseDropdown = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                dropdownListRef.current && !dropdownListRef.current.contains(event.target)
            ) {
                setOpenDropdown(false);
            }
        }

        if (openDropdown) {
            document.addEventListener('mousedown', CloseDropdown);
        }

        return () => {
            document.removeEventListener('mousedown', CloseDropdown);
        }
    }, [openDropdown])

    useEffect(() => {
        const CloseDrawer = (event) => {
            if (
                drawerRef.current && !drawerRef.current.contains(event.target) &&
                drawerListRef.current && !drawerListRef.current.contains(event.target)
            ) {
                setOpenDrawer(false);
            }
        }

        if (openDrawer) {
            document.addEventListener('mousedown', CloseDrawer);
        }

        return () => {
            document.removeEventListener('mousedown', CloseDrawer);
        }
    }, [openDrawer])

    const handleLanguageChange = (languageCode) => {
        i18n.changeLanguage(languageCode);
        localStorage.setItem(LANGUAGE_KEY, languageCode);
    };

    return (
        <Box
            width="100%"
            zIndex="50"
            position="fixed"
            display="flex"
            alignItems="center"
            padding="8px"
            minHeight="4rem"
            backgroundColor="#e5e6e6"
        >
            <Box
                display="flex"
                width="50%"
                justifyContent="flex-start"
                marginTop=".225rem"
                marginBottom=".225rem"
            >
                <Box
                    display={minWidth1024 ? 'none' : 'block'}
                >
                    <Box
                        as="button"
                        ref={drawerRef}
                        onClick={() => setOpenDrawer(true)}
                        borderWidth="1px"
                        borderColor="transparent"
                        backgroundColor={!minWidth1024 ? 'lightgrey' : 'transparent'}
                        borderRadius=".5rem"
                        height="3rem"
                        width="3rem"
                        padding="0"
                        display="inline-flex"
                        minHeight="3rem"
                        cursor="pointer"
                        userSelect="none"
                        flexWrap="wrap"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        fontSize=".875rem"
                        lineHeight="1rem"
                        gap=".5rem"
                        fontWeight="600"
                        textDecorationLine="none"
                        _hover={{
                            backgroundColor: "lightgrey"
                        }}
                    >
                        <HamburgerIcon boxSize="7" />
                    </Box>
                </Box>
                <Drawer
                    placement={placement}
                    isOpen={openDrawer}
                    
                >
                    <DrawerOverlay 
                        marginTop="4.5rem"
                        cursor='pointer'
                    />
                    <DrawerContent 
                        backgroundColor="#f2f2f2"
                        marginTop="4.4rem"
                        style={{width: '50vw'}}    
                    >
                        <DrawerBody paddingLeft=".5rem">
                            <List
                                ref={drawerListRef}
                                padding="1rem 0 1rem 0"
                                width="16rem"
                                minHeight="100%"
                                display="flex"
                                flexDirection="column"
                                flexWrap="wrap"
                                fontSize="1.125rem"
                                lineHeight="1.75rem"
                            >
                                <ListItem
                                    as="a"
                                    href="/rackets"
                                    marginBottom=".5rem"
                                    padding=".25rem"
                                    display="grid"
                                    gridAutoFlow="column"
                                    alignContent="flex-start"
                                    alignItems="center"
                                >
                                    {t("navLink")} 
                                </ListItem>
                            </List>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
                <Box
                    as="a"
                    href="/"
                    borderWidth="1px"
                    borderColor="transparent"
                    backgroundColor={!minWidth1024 ? 'lightgrey' : 'transparent'}
                    marginLeft={!minWidth1024 ? '.5rem' : '0'}
                    display="inline-flex"
                    height="3rem"
                    minHeight="3rem"
                    flexShrink="0"
                    cursor="pointer"
                    userSelect="none"
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius=".5rem"
                    paddingLeft="1rem"
                    paddingRight="1rem"
                    textAlign="center"
                    fontSize=".875rem"
                    lineHeight="1rem"
                    gap=".5rem"
                    fontWeight="600"
                    textDecorationLine="none"
                    _hover={{
                        backgroundColor: "lightgrey",
                    }}
                >
                    <Image
                        src="../assets/logo.svg"
                        width="10"
                        height="7"
                        alt="RacketTracker Logo"
                    >
                    </Image>
                    <Text
                        fontSize="1.25rem"
                        lineHeight="1.75rem"
                        margin="0"
                    >
                        RacketTracker
                    </Text>
                </Box>
            </Box>
            <Box
                display={minWidth1024 ? 'flex' : 'none'}
                flexShrink="0"
                alignItems="center"
            >
                <List
                    display="inline-flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    padding=".5rem"
                >
                    <ListItem>
                        <Link
                            as="a"
                            href="/rackets"
                            borderWidth="1px"
                            borderColor="transparent"
                            backgroundColor="transparent"
                            display="inline-flex"
                            height="3rem"
                            minHeight="3rem"
                            flexShrink="0"
                            cursor="pointer"
                            userSelect="none"
                            flexWrap="wrap"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius=".5rem"
                            paddingLeft="1rem"
                            paddingRight="1rem"
                            textAlign="center"
                            gap=".5rem"
                            fontSize="1.125rem"
                            lineHeight="1.75rem"
                            textDecorationLine="none"
                            _hover={{
                                backgroundColor: "lightgrey",
                            }}
                        >
                            {t("navLink")}
                        </Link>  
                    </ListItem>
                </List>
            </Box>
            <Box
                display="flex"
                width="50%"
                justifyContent="flex-end"
            >
                <Box
                    position="relative"
                    display="inline-block"
                >
                    <Box
                        as="button"
                        ref={dropdownRef}
                        onClick={() => setOpenDropdown(true)}
                        marginRight={minWidth768 ? '1rem' : '0'}
                        borderWidth="5px"
                        borderColor="transparent"
                        backgroundColor={!minWidth1024 ? 'lightgrey' : 'transparent'}
                        height="3rem"
                        width="3rem"
                        borderRadius="9999px"
                        padding="0"
                        display="inline-flex"
                        minHeight="3rem"
                        cursor="pointer"
                        userSelect="none"
                        flexWrap="wrap"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        fontSize=".875rem"
                        lineHeight="1rem"
                        gap=".5rem"
                        fontWeight="600"
                        textDecorationLine="none"
                        _hover={{
                            borderColor:"lightgrey"
                        }}
                    >
                        <Box
                            display="block"
                            aspectRatio="1/1"
                            overflow="hidden"
                            width="2.5rem"
                            borderRadius="9999px"
                        >
                            <Image
                                src={languages.find((item) => item.code === i18n.language)?.code === 'en' ? '../assets/en.png' : '../assets/pt.png'}
                                alt="flag"
                                height="100%"
                                width="100%"
                                objectFit="cover"
                                maxWidth="100%"
                                display="block"
                            >   
                            </Image>
                        </Box>
                    </Box>
                    {openDropdown && (
                        <List
                            ref={dropdownListRef}
                            opacity="1"
                            transformOrigin="top"
                            transform="scale(0.95)"
                            insetInlineEnd="0px"
                            position="absolute"
                            boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
                            padding=".5rem"
                            width="13rem"
                            marginTop=".5rem"
                            zIndex="1"
                            display="flex"
                            flexDirection="column"
                            flexWrap="wrap"
                            fontSize=".875rem"
                            lineHeight="1.25rem"
                            borderRadius=".5rem"
                            backgroundColor="white"
                        >
                            {languages.map((language) => (
                                <ListItem 
                                    as="button"
                                    key={language.code}
                                    onClick={() => handleLanguageChange(language.code)}
                                    display="grid"
                                    gridAutoFlow="column"
                                    alignContent="flex-start"
                                    alignItems="center"
                                    gap=".5rem"
                                    gridAutoColumns="minmax(auto,max-content) auto max-content"
                                    userSelect="none"
                                    textAlign="start"
                                    padding=".25rem .75rem"
                                    _hover={{
                                        backgroundColor:"lightgrey",
                                        borderRadius:".5rem"
                                    }}
                                >
                                    <Image
                                        src={language.code === 'en' ? '../assets/en.png' : '../assets/pt.png'}
                                        alt="option flag"
                                        height="1rem"
                                        width="1rem"
                                        maxWidth="100%"
                                        display="block"
                                    >  
                                    </Image>
                                    {language.name}
                                </ListItem>
                            ))}
                        </List>
                    )}   
                </Box>
            </Box>
        </Box>
    )
}

export default NavBar;