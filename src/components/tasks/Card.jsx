import React, { useState } from 'react'
import styled from '@emotion/styled'
import ContextMenu from '../utils/ContextMenu'

const CardContainer = styled.div`
    border-bottom: 3px solid #b7791f;
    background-color: #ECC94B;
    border-radius: .5em;
    padding: 10px;
    cursor: move;
    text-align: center;
`

const Card = ({ 
        id, 
        dataType, 
        onDragStart, 
        onDragEnd, 
        onDragEnter, 
        onDragLeave, 
        onDragOver, 
        onDrop, 
        onContextMenu, 
        draggable, 
        children
}) => {

    const [show, setShow] = useState(false)
    const [position, setPosition] = useState({})

    const handleRigthClick = e => {
        
        setShow( true )

        setPosition({
            xPos: e.pageX,
            yPos: e.pageY
        })

    }

    return ( 

        <>

            <CardContainer
                id = { id }
                data-type = { dataType }
                onDragStart = { onDragStart }
                onDragEnd = { onDragEnd }
                onDragEnter = { onDragEnter }
                onDragLeave = { onDragLeave }
                onDragOver = { onDragOver }
                onDrop = { onDrop }
                onContextMenu = { handleRigthClick }
                draggable = { draggable }
            >
                { children }
            </CardContainer>

            <ContextMenu
                show = { show }
                setShow = { setShow }
                xPos = { position.xPos ? position.xPos : 0 }
                yPos = { position.yPos ? position.yPos : 0 }
            />

        </>

    );
}
 
export default Card;
