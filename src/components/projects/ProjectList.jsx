import React, { useRef, useEffect } from 'react'
import { Heading, Grid, Flex } from '@chakra-ui/react';
import Project from './Project'

const ProjectList = ({ projects }) => {

    // Contenedor agregar el scroll si es necesario
    const grid = useRef()

    // Revisar la cantidad de proyectos
    useEffect(() => {
        
        if( grid.current ) {

            if ( projects.length > 12 )
                grid.current.style.overflow = "scroll"

            else 
                grid.current.removeAttribute("style")
            

        }


    }, [projects])

    return projects.length > 0 

        ? (
            
            <Grid
                templateColumns = {{ base: "repeat( 2, 1fr )", md: "repeat( 4, 1fr )" }}
                gap = { 8 }
                mt = { 16 }
                maxHeight = "85%"
                // overflow = "scroll"
                ref = { grid }
            >

                {projects.map( project  => (
                
                    <Project
                    
                        key = { project._id }
                        project = { project }

                    />

                ))}

            </Grid>

        )
        : (
            <Flex
                width = "100%"
                height = "80%"
                align = "center"
                justify = "center"
            >
                <Heading
                    as = "h1"
                    color = "white"
                    align = "center"
                    mt = { 8 }
                >
                    No hay proyectos, comienza creando uno
                </Heading>
            </Flex>
        )
}
 
export default ProjectList;