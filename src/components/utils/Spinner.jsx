import React,{ useEffect } from 'react'
import { Box, Flex, Spinner, Text, Fade, useDisclosure } from '@chakra-ui/react';

const Loading = ({ children, show, message}) => {

    const { isOpen, onToggle } = useDisclosure()

    useEffect(() => {
        
        if ( show ) onToggle()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show])

    return ( 

        <Box position = "relative">

            {  show && 
                <Fade
                    in = { isOpen }
                >
                    <Flex
                        style = {{ backgroundColor: "rgba(0.5,0.5,0.5,0.7)" }}
                        zIndex = "999999"
                        position = "absolute"
                        direction = "column"
                        align = "center"
                        justify = "center"
                        w = "100%"
                        h = "100%"
                    >
                        <Spinner
                            color = "yellow.400"
                            size = "xl"
                            speed = "0.65s"
                        />
                        <Text
                            mt = { 4 }
                            color = "white"
                            align = "center"
                        >
                            { message }
                        </Text>
                    </Flex>
                </Fade>
            }

            { children }

        </Box>

    );

}
 
export default Loading;