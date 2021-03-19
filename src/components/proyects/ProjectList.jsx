import React from 'react'
import { Heading, Grid, Flex } from '@chakra-ui/react';
import Project from './Project'

const ProjectList = () => {

    const list = [
        
        {
            id: 1,
            projectName: "Test 1",
            creationDate: "22 / 22 / 22"
        },
        {
            id: 2,
            projectName: "Test 2",
            creationDate: "22 / 22 / 22"
        },
        {
            id: 3,
            projectName: "Test 3",
            creationDate: "22 / 22 / 22"
        },
        {
            id: 4,
            projectName: "Test 4",
            creationDate: "22 / 22 / 22"
        },
        {
            id: 6,
            projectName: "Test 5",
            creationDate: "22 / 22 / 22"
        },
        {
            id: 7,
            projectName: "Test 6",
            creationDate: "22 / 22 / 22"
        },
        {
            id: 8,
            projectName: "Test 7",
            creationDate: "22 / 22 / 22"
        }
    ]

    return list.length > 0 
        ? (
            
            <Grid
                templateColumns = {{ base: "repeat( 2, 1fr )", md: "repeat( 4, 1fr )" }}
                gap = { 8 }
                mt = { 16 }
                maxHeight = "85%"
                overflow = "scroll"
            >

                {list.map( project  => (
                
                    <Project
                    
                        key = { project.id }
                        title = { project.projectName }
                        date = { project.creationDate }

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