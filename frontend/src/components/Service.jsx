import { Box, Heading, Text, Card, CardBody, SimpleGrid, Stepper, Step, StepIndicator, StepStatus, StepNumber, StepSeparator, keyframes} from "@chakra-ui/react";
import { useMediaQuery, useSteps } from '@chakra-ui/react'
import { TranslationsContext } from "../App";
import { useContext } from "react";

const Service = () => {
    const { t } = useContext(TranslationsContext);
    const [minWidth1024] = useMediaQuery('(min-width: 1024px)');
    const [minWidth768] = useMediaQuery('(min-width: 768px)');

    const steps = [
        { title: t('stepperTitle1'), cardTitle: t('stepperCardTitle1'), description: t('stepperDesc1') },
        { title: t('stepperTitle2'), cardTitle: t('stepperCardTitle2'), description: t('stepperDesc2') },
        { title: t('stepperTitle3'), cardTitle: t('stepperCardTitle3'), description: t('stepperDesc3') },
    ]

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length
    })

    const shake = keyframes`
        0%, 100% { 
            transform: translateX(0); 
        }
        10%, 30%, 50%, 70%, 90% { 
            transform: translateX(-10px); 
        }
        20%, 40%, 60%, 80% { 
            transform: translateX(10px); 
        }
    `;

    return (
        <Box
            id="service"
            paddingBottom={minWidth1024 ? "6rem" : '1rem'}
            position="relative"
            cursor="default"
            minHeight="100vh"
            display="grid"
            minWidth="100%"
            placeItems="center"
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundColor="#f2f2f2"
        >
            <Box
                display="flex"
                flexDirection="column"
                position="relative"
                zIndex="1"
                alignItems="center"
                justifyContent="center"
                maxWidth="80rem"
                gap="1rem"
            >
                <Heading
                    as="h1"
                    fontWeight="700"
                    fontSize="1.875rem"
                    lineHeight="2.25rem"
                >
                    {t("serviceHeading")}
                </Heading>
                <Stepper
                    size="lg"
                    index={activeStep}
                    width="75%"
                    gap="1rem"
                    marginTop="1rem"
                >
                    {steps.map((item, index) => (
                        <Step
                            key={index}
                            onClick={() => setActiveStep(index)}
                        >
                            <StepIndicator
                                backgroundColor="#e5e6e6"
                                size="2.5rem"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                cursor="pointer"
                            >
                                <StepStatus
                                    complete={<StepNumber />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                    
                                />
                            </StepIndicator>
                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>
                <SimpleGrid
                    gridTemplateColumns={minWidth1024 ? 'repeat(3, minmax(0,1fr))' : 'repeat(1, minmax(0,1fr))'}
                    gap={minWidth1024 ? "2rem" : minWidth768 ? "1.5rem" : "1rem"}
                    width="100%"
                    justifyContent="center"
                    alignItems="center"
                >
                    {minWidth1024 && (
                        steps.map((item, index) => (
                            <Text
                                key={index}
                                textAlign={minWidth1024 && index === 0 ? 'start' : minWidth1024 && index === 1 ? 'center' : minWidth1024 && index === 2 ? 'end' : 'center'}
                                marginLeft={minWidth1024 && index === 0 ? '7.3rem' : 0}
                                marginRight={minWidth1024 && index === 2 ? '7rem' : 0}
                            >
                                {item.title}
                            </Text>
                        ))
                    )}
                    {steps.map((item, index) => (
                        <Card
                            key={index}
                            width="20rem"
                            height="15rem"
                            border="1px solid"
                            borderColor={activeStep === index ? "#9dc61e" : "gray.300"}
                            borderRadius="1rem"
                            cursor="pointer"
                            onClick={() => setActiveStep(index)}
                            opacity={activeStep === index ? 'initial' : '0.3'}
                            animation={!minWidth1024 && activeStep !== index ? `${shake} 1.5s infinite` : ''}
                             _hover={minWidth1024 && activeStep !== index ? {
                                animation: `${shake} 1.5s infinite`
                            } : {}}
                        >
                            <CardBody>
                            <Heading
                                    as="h2"
                                    fontSize="1.25rem"
                                    lineHeight="1.75rem"
                                    fontWeight="600"
                                    marginBottom=".5rem"
                                    display={activeStep === index ? 'flex' : 'none'}
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    {item.cardTitle}
                                    
                                </Heading>
                                <Text
                                    fontSize="0.875rem"
                                    lineHeight="1.25rem"
                                    display={activeStep === index ? 'block' : 'none'}
                                >
                                    {item.description}
                                </Text>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    )
}

export default Service