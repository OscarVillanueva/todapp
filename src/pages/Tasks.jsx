import React, { useRef, useState, useEffect } from 'react'
import { Heading, Grid, Box, Text } from "@chakra-ui/react"
import styled from '@emotion/styled'
import Layout from '../components/utils/Layout'

const Card = styled.div`
    border: 3px solid #666;
    background-color: #ddd;
    border-radius: .5em;
    padding: 10px;
    cursor: move;
`

const Container = styled.div`
    .over {
        border: 3px dotted #666;
    }
`

const Tasks = () => {

    const cardsContainer = useRef()

    let dragSrcEl = null
    let dragDstEl =  null

    const handleDragStart = e => {
        
        e.target.style.opacity = "0.4"
        e.target.classList.add("source")

        dragSrcEl = e.target.getAttribute( "id" )

    }

    const handleDragEnd = e => {
        
        e.target.style.opacity = "1"

        if ( cardsContainer.current ) {
            
            cardsContainer.current.querySelectorAll(".over").forEach( item => {

                item.classList.remove("over")

            })

        }

    }

    const handleDragOver = e => {
        
        if (e.preventDefault) {
            e.preventDefault();
        }
      
        return false;

    }

    const handleDragEnter = e => {
        
        e.target.classList.add("over")

        dragDstEl = e.target.getAttribute( "id" )

    }

    const handleDragLeave = e => {
        
        e.target.classList.remove("over")

    }

    const handleDrop = e => {
        
        e.stopPropagation()

        console.log("source", dragSrcEl)
        console.log("destino", dragDstEl)

        if ( dragSrcEl !== dragDstEl && cardsContainer.current) {

            const source = cardsContainer.current.querySelector(`#${dragSrcEl}`)
            const bridge = source.innerHTML
            const dest = cardsContainer.current.querySelector(`#${dragDstEl}`)

            source.innerHTML = dest.innerHTML
            dest.innerHTML = bridge

            console.group("seleccionados")

            console.log("origen", source)
            console.log("puente", bridge)
            console.log("dest", dest)

            console.groupEnd("seleccionados")

            // const bridge = dragSrcEl
            // dragSrcEl.innerHTML = dragDstEl.innerHTML
            // dragDstEl.innerHTML = bridge.innerHTML

            // setDragSrcEl( dragDstEl )
            // dragSrcEl.innerHTML = dragDstEl.innerHTML

            // setDragDstEl( bridge )
            // dragDstEl.innerHTML = bridge.innerHTML
            // e.target.innerHTML = dragSrcEl.innerHTML

        }

        return false

    }

    return ( 
        
        <Layout>

            <Container>
                <Heading
                    align = "center"
                    color = "white"
                >
                    Tareas
                </Heading>
                <Grid
                    templateColumns = "repeat( 2, 1fr )"
                    gap = { 8 }
                    mt = { 16 }
                    maxHeight = "85%"
                    ref = { cardsContainer }
                >
                    <Box>
                        <Text
                            align = "center"
                            color = "white"
                            fontWeight = "bold"
                            fontSize = "xl"
                            casing = "uppercase"
                        >
                            Por Hacer
                        </Text>
                    </Box>
                    <Box>
                        <Text
                            align = "center"
                            color = "white"
                            fontWeight = "bold"
                            fontSize = "xl"
                            casing = "uppercase"
                        >
                            Completo
                        </Text>
                    </Box>
                    <Card
                        id = "ab"
                        onDragStart = { handleDragStart }
                        onDragEnd = { handleDragEnd }
                        onDragEnter = { handleDragEnter }
                        onDragLeave = { handleDragLeave }
                        onDragOver = { handleDragOver }
                        onDrop = { handleDrop }
                        draggable="true"
                    >
                            Realizar la actulización del state
                    </Card>
                    <Card
                        id = "bc"
                        onDragStart = { handleDragStart }
                        onDragEnd = { handleDragEnd }
                        onDragEnter = { handleDragEnter }
                        onDragLeave = { handleDragLeave }
                        onDragOver = { handleDragOver }
                        onDrop = { handleDrop }
                        draggable="true"
                    >
                        Cambiar el UI de las tarjetas
                    </Card>
                </Grid>
            </Container>

        </Layout>

    );
}
 
export default Tasks;