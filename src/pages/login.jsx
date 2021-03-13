import React, { useState } from 'react'
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { 
    Container, 
    Flex, 
    Heading, 
    Input, 
    InputGroup, 
    Stack, 
    Button, 
    InputRightElement,
    Text,
} from "@chakra-ui/react"

const Login = () => {

    const [ show, setShow ] = useState(false)

    return ( 

        <Container maxWidth h = "100vh" bg = "green.800" centerContent>
            
            <Flex direction = "column" align = "center" justify = "center" w = "100%" h = "100%">
                
                <Heading as = "h1" color = "white" size = "xl">

                    Iniciar sesión

                </Heading>

                <Stack spacing = { 5 } mt = { 8 } width = "30%">

                    <Text
                        color = "white"
                        fontWeight = "bold"
                    >
                        Correo Electrónico:
                    </Text>

                    <Input
                        color = "white"
                        focusBorderColor = "yellow.400" 
                        placeholder = "ejemplo@ejemplo.com"
                    />

                    <Text
                        color = "white"
                        fontWeight = "bold"
                    >
                        Contraseña:
                    </Text>

                    <InputGroup size="md">

                        <Input
                            color = "white"
                            focusBorderColor = "yellow.400"
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Ingresar contraseña"
                        />

                        <InputRightElement width="4.5rem">

                            <Button 
                                h="1.75rem" 
                                size="sm" 
                                onClick={ () => setShow( !show ) }
                            >
                                { !show ? <ViewIcon w = {6} h = {6}/> : <ViewOffIcon w = {6} h = {6}/>} 
                            </Button>

                        </InputRightElement>

                    </InputGroup>

                    <Button
                        colorScheme = "yellow"
                        onClick = { () => console.log("Iniciando") }
                    >
                        Iniciar Sesión
                    </Button>

                    <Link
                        to = "/sign-up"
                    >
                        <Text
                            color = "white"
                            align = "center"
                        >
                            ¿Aún no tienes cuenta?
                        </Text>
                    </Link>

                </Stack>

            </Flex>

        </Container>

    );
}
 
export default Login;