import React, { useRef, useState } from 'react'
import { Heading, Grid, Box, Text } from "@chakra-ui/react"
import styled from '@emotion/styled'
import Layout from '../components/utils/Layout'

const Card = styled.div`
    border-bottom: 3px solid #b7791f;
    background-color: #ECC94B;
    border-radius: .5em;
    padding: 10px;
    cursor: move;
    text-align: center;
`

const Container = styled.div`
    .over {
        border: 3px dotted #b7791f;
    }
`

const Tasks = () => {

    const cardsContainer = useRef()

    const [dragSrcEl, setDragSrcEl] = useState("")
    const [dragDstEl, setDragDstEl] = useState("")

    const handleDragStart = e => {
        
        e.target.style.opacity = "0.4"
        e.target.classList.add("source")

        setDragSrcEl( e.target.getAttribute( "id" ) )
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

        setDragDstEl( e.target.getAttribute( "id" ) )
    }

    const handleDragLeave = e => {
        
        e.target.classList.remove("over")

    }

    const handleDrop = e => {
        
        e.stopPropagation()

        if ( dragSrcEl !== dragDstEl && cardsContainer.current) {

            const source = cardsContainer.current.querySelector(`#${dragSrcEl}`)
            
            const bridge = source.innerHTML

            const dest = cardsContainer.current.querySelector(`#${dragDstEl}`)

            source.innerHTML = dest.innerHTML

            dest.innerHTML = bridge

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
                    <Box>
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
                    </Box>
                    <Box>
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
                    </Box>
                </Grid>
            </Container>

        </Layout>

    );
}
 
export default Tasks;