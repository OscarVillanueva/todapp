import React, { useState } from 'react'
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Message from '../components/AlertMessage'
import { Form } from "../utils/Utils";
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
    useToast
} from "@chakra-ui/react"
import Loading from '../components/Spinner';

const Login = () => {

    // State para mostrar el contenido del input de contraseña
    const [ show, setShow ] = useState(false)

    const [ isLoading, setisLoading ] = useState(false)

    // Para usar las tostadas de chakra
    const toast = useToast()

    // Validación de formulario
    const formik = useFormik({

        initialValues: {
            email: "",
            password: ""
        },

        validationSchema:  Yup.object({

            email: Yup.string().email("Ingresa un email válido").required("El email es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria")

        }),

        onSubmit: values => {
            console.log("enviando formulario", values);
            setisLoading( true )
        }

    })

    // Revisamos si hay algún error
    const hasError = (formik, input) => {
        
        if ( !formik.errors ) return "red.400"

        return formik.errors.hasOwnProperty( input ) ? "red.400" : "yellow.400"

    }

    return ( 

        <Loading show = { isLoading } message = "Revisando tus credenciales">

            <Container maxWidth h = "100vh" bg = "green.800" centerContent>
                
                <Flex direction = "column" align = "center" justify = "center" w = "100%" h = "100%">
                    
                    <Heading as = "h1" color = "white" size = "xl">

                        Iniciar sesión

                    </Heading>

                    <Form
                        onSubmit = { formik.handleSubmit }
                    >

                        <Stack spacing = { 5 } mt = { 8 } width = "30%">
                            <Text
                                color = "white"
                                fontWeight = "bold"
                            >
                                Correo Electrónico:
                            </Text>
                            <Input
                                id = "email"
                                name = "email"
                                color = "white"
                                focusBorderColor = { hasError( formik, "email" ) }
                                placeholder = "ejemplo@ejemplo.com"
                                value = { formik.values.email }
                                onChange = { formik.handleChange }
                                onBlur = { formik.handleBlur }
                            />

                            { (formik.touched.email && formik.errors.email )
                                && (
                                    <Message
                                        status = "error"
                                        message = { formik.errors.email }
                                    />
                                ) 
                            }

                            <Text
                                color = "white"
                                fontWeight = "bold"
                            >
                                Contraseña:
                            </Text>

                            <InputGroup size="md">

                                <Input
                                    id = "password"
                                    name = "password"
                                    color = "white"
                                    focusBorderColor = { hasError( formik, "password" ) }
                                    pr="4.5rem"
                                    type={show ? "text" : "password"}
                                    placeholder="Ingresar contraseña"
                                    value = { formik.values.password }
                                    onChange = { formik.handleChange }
                                    onBlur = { formik.handleBlur }
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

                            { (formik.touched.password && formik.errors.password )
                                && (
                                    <Message
                                        status = "error"
                                        message = { formik.errors.password }
                                    />
                                ) 
                            }

                            <Button
                                type = "submit"
                                colorScheme = "yellow"
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

                    </Form>

                </Flex>

            </Container>
        </Loading>

    );
}
 
export default Login;