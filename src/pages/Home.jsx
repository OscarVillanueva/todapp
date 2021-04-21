import React, { useContext, useEffect, useState } from 'react'
import { Heading, useToast } from "@chakra-ui/react"
import Tour from 'reactour'
import Layout from '../components/utils/Layout'
import ProjectList from '../components/projects/ProjectList'
import ContextProject from '../context/projects/ContextProject'
import ContextAuth from '../context/auth/ContextAuth'

const Home = () => {

    const { fetchProjects, message, loading, projects, addProject } = useContext( ContextProject )
    const { logout } = useContext( ContextAuth )
    const [open, setOpen] = useState(true)

    const steps = [
        {
            selector: "#title",
            content: "Esto es un titulo"
        }
    ]

    // Para usar las tostadas de chakra
    const toast = useToast()

    // Descargamos los projectos
    useEffect(() => {
        
        fetchProjects()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        
        if ( message ) {

            toast({
                title: "Sucedió un error",
                description: message.msg,
                status: "error",
                duration: 9000,
                isClosable: true,
            })

            if( message.category === -1 ) logout()
        }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])

    const uploadProject = name => addProject({ projectName: name })

    return ( 

        <Layout
            spinner = { loading }
            spinnerText = "Cargando . . ."
            addModalConfig = {{
                title: "Agregar proyecto",
                label: "Nombre de tu proyecto",
                placeholder: "Nombre tu fantástico proyecto",
                tooltip: "Agregar proyecto",
                callback: uploadProject
            }}
        >

            { projects.length > 0 && (
                <Heading
                    align = "center"
                    color = "white"
                    id = "title"
                >

                    Proyectos Activos

                </Heading>
            )}

            <ProjectList
                projects = { projects }
            />

            <Tour
                steps = { steps }
                isOpen = { open }
                onRequestClose = { () => setOpen( false ) }
            />

        </Layout>

    );
}
 
export default Home;