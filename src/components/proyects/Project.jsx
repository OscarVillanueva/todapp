import React from 'react'
import { Text, Button } from '@chakra-ui/react';
import styled from '@emotion/styled'

const Card = styled.div`
    
    border-radius: 0.3rem;
    padding: 0.6rem;
    background-color: #ECC94B;
    transition: all 0.3s ease-in-out;
    border-bottom: 8px solid #b7791f;

    &:hover {
        -webkit-box-shadow: 0px 0px 7px 1px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 7px 1px rgba(0,0,0,0.75);
        box-shadow: 0px 0px 7px 1px rgba(0,0,0,0.75);
    }

`

const Projects = ({ title, date }) => {

    const deleteProject = e => {
        
        e.stopPropagation()
        console.log("Eliminando . . .")

    }

    return ( 

        <Card
            onClick = { () => console.log("Ir a ver el proyecto") }
        >

            <Text
                fontSize = "xl"
                fontWeight = "bold"
                color = "black"
            >
                { title }
            </Text>

            <Text
                color = "black"
            >
                { date }
            </Text>

            <Button
                onClick = { deleteProject }
                mt = { 4 }
                colorScheme = "red"
                width = "100%"
            >
                Eliminar
            </Button>
            

        </Card>

    );
}
 
export default Projects;