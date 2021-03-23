import React, { useRef } from 'react'
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

    const handleDragStart = e => {
        
        e.target.style.opacity = "0.4"

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

    }

    const handleDragLeave = e => {
        
        e.target.classList.remove("over")

    }

    const handleDrop = e => {
        
        e.stopPropagation()
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
                        onDragStart = { handleDragStart }
                        onDragEnd = { handleDragEnd }
                        onDragEnter = { handleDragEnter }
                        onDragLeave = { handleDragLeave }
                        onDragOver = { handleDragOver }
                        onDrop = { handleDrop }
                        draggable="true"
                    >
                            A
                    </Card>
                    <Card
                        onDragStart = { handleDragStart }
                        onDragEnd = { handleDragEnd }
                        onDragEnter = { handleDragEnter }
                        onDragLeave = { handleDragLeave }
                        onDragOver = { handleDragOver }
                        onDrop = { handleDrop }
                        draggable="true"
                    >
                        B
                    </Card>
                </Grid>
            </Container>

        </Layout>

    );
}
 
export default Tasks;