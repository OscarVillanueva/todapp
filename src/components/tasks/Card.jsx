import React, { useState, useContext } from 'react'
import styled from '@emotion/styled'
import { useDisclosure } from "@chakra-ui/react";

// Context
import ContextTask from '../../context/tasks/ContextTask'
import ContextProject from '../../context/projects/ContextProject'

// Components
import ContextMenu from '../utils/ContextMenu'
import Confirmation from '../utils/Confirmation'

const CardContainer = styled.div`
    border-bottom: 3px solid #b7791f;
    background-color: #ECC94B;
    border-radius: .5em;
    padding: 10px;
    cursor: move;
    text-align: center;
`

const Card = ({ 
        task, 
        dataType, 
        onDragStart, 
        onDragEnd, 
        onDragEnter, 
        onDragLeave, 
        onDragOver, 
        onDrop,
        draggable, 
        children
}) => {

    const { changeTaskStatus, deleteTask } = useContext( ContextTask )
    const { currentProject } = useContext( ContextProject )


    const { isOpen, onOpen, onClose } = useDisclosure()
    const [show, setShow] = useState(false)
    const [position, setPosition] = useState({})
    const [ options ] = useState([
        {
            title: task.state ? "Rehacer" : "Completar",
            cy: "change-status",
            action: handleStatusChange
        },
        {
            title: "Eliminar",
            cy: "delete-card",
            action: onOpen
        },
    ])

    // Configuración de la alerta
    const config = {
        
        buttonText: "Eliminar",
        buttonScheme: "red",
        action: () => handleDelete(),
        title: "Eliminar tarea",
        message: "¿Estás seguro?, esta acción no se puede deshacer"

    }

    const handleRigthClick = e => {
        
        if( !show ) {

            setShow( true )
    
            setPosition({
                xPos: e.pageX,
                yPos: e.pageY
            })

        }


    }

    function handleStatusChange () {
        
        changeTaskStatus(
            task,
            task.state ? "done" : "todo",
        )

    }

    function handleDelete() {
        
        deleteTask( 
            task._id, 
            task.state ? "done" : "todo",
            currentProject._id
        )

    }

    return ( 

        <>

            <CardContainer
                id = { task._id }
                data-type = { dataType }
                onDragStart = { onDragStart }
                onDragEnd = { onDragEnd }
                onDragEnter = { onDragEnter }
                onDragLeave = { onDragLeave }
                onDragOver = { onDragOver }
                onDrop = { onDrop }
                onContextMenu = { handleRigthClick }
                draggable = { draggable }
                className = "tour-card"
            >

                { children }

            </CardContainer>

            <ContextMenu
                show = { show }
                options = { options }
                setShow = { setShow }
                xPos = { position.xPos ? position.xPos : 0 }
                yPos = { position.yPos ? position.yPos : 0 }
            />

            <Confirmation 

                isOpen = { isOpen }
                onClose = { onClose }
                config = { config }

            />

        </>

    );
}
 
export default Card;
