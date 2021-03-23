import React, { useContext } from 'react'
import { Text, Button } from '@chakra-ui/react';
import styled from '@emotion/styled'
import moment from 'moment'
import ContextProject from '../../context/projects/ContextProject'

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

const Projects = ({ project }) => {

    const { deleteProject } = useContext( ContextProject )

    const { projectName, creationDate, _id } = project

    moment.locale("es")

    const removeCard = e => {
        
        e.stopPropagation()
        
        deleteProject( _id )

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
                { projectName }
            </Text>

            <Text
                color = "black"
            >
                { moment( creationDate ).format( "MMMM Do YYYY" ) }
            </Text>

            <Button
                onClick = { removeCard }
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