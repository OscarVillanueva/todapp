import React, { useContext } from 'react'
import { Text, Button, useDisclosure } from '@chakra-ui/react';
import styled from '@emotion/styled'
import moment from 'moment'
import ContextProject from '../../context/projects/ContextProject'
import Confirmation from '../utils/Confirmation'

moment.locale("es")

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

    const { projectName, creationDate, _id } = project

    const { deleteProject } = useContext( ContextProject )

    // Modal la confirmación
    const { isOpen, onOpen, onClose } = useDisclosure()

    // Abrimos la alerta
    const removeCard = e => {
        
        e.stopPropagation()

        onOpen()
        
    }

    // Configuración de la alerta
    const config = {
        
        buttonText: "Eliminar",
        buttonScheme: "red",
        action: () => deleteProject( _id ),
        title: "Eliminar proyecto",
        message: "¿Estás seguro?, esta acción no se puede deshacer"

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
                data-cy = "delete-project-btn"
                onClick = { removeCard }
                mt = { 4 }
                colorScheme = "red"
                width = "100%"
            >
                Eliminar
            </Button>

            <Confirmation 

                isOpen = { isOpen }
                onClose = { onClose }
                config = { config }

            />

        </Card>

    );
}
 
export default Projects;