import React from 'react'
import styled from '@emotion/styled'

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

    return ( 

        <CardContainer
            id = { id }
            data-type = { dataType }
            onDragStart = { onDragStart }
            onDragEnd = { onDragEnd }
            onDragEnter = { onDragEnter }
            onDragLeave = { onDragLeave }
            onDragOver = { onDragOver }
            onDrop = { onDrop }
            onContextMenu = { onContextMenu }
            draggable = { draggable }
        >
            { children }
        </CardContainer>

    );
}
 
export default Card;
