import React, { useContext, useEffect } from 'react'
import { Heading, useToast } from "@chakra-ui/react"
import Layout from '../components/utils/Layout'
import ProjectList from '../components/projects/ProjectList'
import ContextProject from '../context/projects/ContextProject'
import ContextAuth from '../context/auth/ContextAuth'

const Home = () => {

    const { fetchProjects, message, loading, projects } = useContext( ContextProject )
    const { logout } = useContext( ContextAuth )

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

    return ( 

        <Layout
            spinner = { loading }
            spinnerText = "Cargando . . ."
        >

            { projects.length > 0 && (
                <Heading
                    align = "center"
                    color = "white"
                >

                    Proyectos Activos

                </Heading>
            )}

            <ProjectList
                projects = { projects }
            />

        </Layout>

    );
}
 
export default Home;