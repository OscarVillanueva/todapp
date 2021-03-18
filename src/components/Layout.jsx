import React, { useContext, useEffect, useRef } from 'react'
import { Button, Container, Flex, Icon, Stack, Tooltip, Box, Text } from '@chakra-ui/react'
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import contextAuth from '../context/auth/ContextAuth'
import useAuth from '../hook/useAuth'
import { GiExitDoor } from "react-icons/gi";


const Layout = ({ children }) => {
    
    // Revisar si estamos autenticados
    useAuth()

    // Context
    const { authenticated } = useContext( contextAuth )

    // El botón de regresar
    const back = useRef()

    // Ubicación
    const location = useLocation()

    useEffect(() => {
        
        if( back.current && location.pathname === "/home")
            back.current.style.visibility = "hidden"

    }, [ back ])

    return authenticated &&  ( 

        <Container maxWidth h = "100vh" bg = "green.800">

            <Stack>

                <Box
                    width = "96%"
                    height = "90vh"
                    margin = " 0 auto "
                    padding = { 8 }
                >

                    { children }

                </Box>

                <Flex
                    style = {{ width: "96%", margin: "0 auto" }}
                    justify = "space-between"
                    align = "center"
                    margin = "0 auto"
                >

                    <Tooltip
                        hasArrow
                        label = "Regresar a Proyectos"
                    >

                        <Button
                            colorScheme = "transparent"
                            leftIcon = { <ChevronLeftIcon /> }
                            ref = { back }
                        >

                            <Text
                            >
                                Proyectos
                            </Text>

                        </Button>

                    </Tooltip>

                    <Tooltip
                        hasArrow
                        label = "Cerrar Sesión"
                    >

                        <Button
                            colorScheme = "transparent"
                        >

                            <Icon
                                as = { GiExitDoor }
                                w = { 8 }
                                h = { 8 }
                            />

                        </Button>

                    </Tooltip>

                </Flex>
            </Stack>

        </Container>

    );
}
 
export default Layout;