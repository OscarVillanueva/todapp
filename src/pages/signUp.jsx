import React, { useState } from 'react'
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Form } from "../utils/Utils";
import { useFormik } from "formik";
import * as Yup from "yup";
import Message from '../components/AlertMessage'
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

const SignUp = () => {

    // Mostar u ocultar la contraseña
    const [ show, setShow ] = useState(false)

    // Validación de formulario
    const formik = useFormik({

        initialValues: {
            email: "",
            password: ""
        },

        validationSchema:  Yup.object({

            name: Yup.string().required("El nombre es obligatorio"),
            email: Yup.string().email("Ingresa un email válido").required("El email es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria")
                                    .min(6, "La contraseña debe tener almenos 6 caracteres"),
            confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben ser iguales')

        }),

        onSubmit: values => {
            console.log("enviando formulario", values);
        }

    })


    return ( 

        <Container maxWidth h = "100vh" bg = "green.800" centerContent>
            
            <Flex direction = "column" align = "center" justify = "center" w = "100%" h = "100%">
                
                <Heading as = "h1" color = "white" size = "xl">

                    Crear cuenta

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
                            focusBorderColor = { formik.errors.email ? "red.400" :  "yellow.400"}
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
                                focusBorderColor = { formik.errors.password ? "red.400" :  "yellow.400"}
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

                        <Text
                            color = "white"
                            fontWeight = "bold"
                        >
                            Confirmar Contraseña:
                        </Text>

                        <Input
                            id = "confirmation"
                            name = "confirmation"
                            color = "white"
                            type = "password"
                            focusBorderColor = { formik.errors.confirmation ? "red.400" :  "yellow.400"}
                            placeholder = "Confirmar Contraseña"
                            value = { formik.values.confirmation }
                            onChange = { formik.handleChange }
                            onBlur = { formik.handleBlur }
                        />

                        { (formik.touched.confirmation && formik.errors.confirmation )
                            && (
                                <Message
                                    status = "error"
                                    message = { formik.errors.confirmation }
                                />
                            ) 
                        }

                        <Button
                            colorScheme = "yellow"
                            onClick = { () => console.log("Iniciando") }
                        >
                            Crear Cuenta
                        </Button>
                        <Link
                            to = "/"
                        >
                            <Text
                                color = "white"
                                align = "center"
                            >
                                ¿Ya no tienes cuenta?
                            </Text>
                        </Link>
                    </Stack>
                </Form>

            </Flex>

        </Container>

    );
}
 
export default SignUp;