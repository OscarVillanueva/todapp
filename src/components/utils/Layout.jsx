import React, { useContext, useEffect, useRef } from 'react'
import { Button, Container, Flex, Icon, Stack, Tooltip, Box, Text, useDisclosure } from '@chakra-ui/react'
import { ChevronLeftIcon, AddIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation } from "react-router-dom";
import contextAuth from '../../context/auth/ContextAuth'
import useAuth from '../../hook/useAuth'
import { GiExitDoor } from "react-icons/gi";
import AddProject from '../projects/AddProject';
import LoadingSpinner from '../utils/Spinner'


const Layout = ({ children, spinner, spinnerText }) => {
    
    // Revisar si estamos autenticados
    useAuth()

    // Context
    const { authenticated, logout } = useContext( contextAuth )

    // El botón de regresar
    const back = useRef()
    const addProject = useRef()

    // Ubicación
    const location = useLocation()
    const navigate = useNavigate()

    // Modal para agregar al proyecto
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        
        if( addProject.current && back.current ) {

            if( location.pathname === "/home" ) {
                back.current.style.visibility = "hidden"
                addProject.current.style.visibility = "visible"
            }
            else {
                back.current.style.visibility = "visible"
                addProject.current.style.visibility = "hidden"
            }

        }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ back, addProject ])

    // Finalizar la sesión
    const endSesion = () => {
        
        logout()
        navigate("/")

    }

    return authenticated &&  ( 

        <LoadingSpinner
            show = { spinner }
            message = { spinnerText }
        >
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
                                visibility = "hidden"
                                colorScheme = "transparent"
                                leftIcon = { <ChevronLeftIcon /> }
                                ref = { back }
                                onClick = { () => navigate("/home") }
                            >
                                <Text
                                    color = "yellow.400"
                                >
                                    Proyectos
                                </Text>
                            </Button>

                        </Tooltip>

                        <Tooltip
                            hasArrow
                            label = "Agregar proyecto"
                        >

                            <Button
                                onClick = { onOpen }
                                colorScheme = "yellow"
                                ref = { addProject }
                            >
                                <AddIcon />
                            </Button>

                        </Tooltip>

                        <AddProject
                            isOpen ={ isOpen }
                            onOpen ={ onOpen }
                            onClose ={ onClose }
                        />

                        <Tooltip
                            hasArrow
                            label = "Cerrar Sesión"
                        >

                            <Button
                                colorScheme = "transparent"
                                onClick = { endSesion }
                            >
                                <Icon
                                    as = { GiExitDoor }
                                    color = "yellow.400"
                                    w = { 10 }
                                    h = { 10 }
                                />
                            </Button>

                        </Tooltip>
                    </Flex>
                </Stack>

            </Container>
        </LoadingSpinner>

    );
}
 
export default Layout;