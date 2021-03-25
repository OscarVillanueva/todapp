import React, { useRef, useState, useEffect } from 'react'
import { Heading, Grid, Box, Text, Stack } from "@chakra-ui/react"
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
    const [data, setData] = useState({
        
        todo: [
            {
                id: "asf7ss",
                taskName: "Cambiar el UI de las tarjetas"
            },
            {
                id: "asf7ss",
                taskName: "Testing de tarjetas"
            }
        ],
        done: [
            {
                id: "asf7ss",
                taskName: "Realizar la actualización del state"
            }
        ],
    })

    useEffect(() => {

        disableDummyCards()
        
    }, [cardsContainer])

    const handleDragStart = e => {
        
        e.target.style.opacity = "0.4"
        e.target.classList.add("source")

        activateDummyCard( e.target.getAttribute( "data-type" )  )
        setDragSrcEl( e.target.getAttribute( "id" ) )

    }

    const handleDragEnd = e => {
        
        e.target.style.opacity = "1"

        if ( cardsContainer.current ) {
            
            cardsContainer.current.querySelectorAll(".over").forEach( item => {

                item.classList.remove("over")

            })

        }

        disableDummyCards()

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

        console.log("source", dragSrcEl)
        console.log("dest", dragDstEl)

        if ( dragSrcEl !== dragDstEl && cardsContainer.current)  {

            if ( dragDstEl !== "dummy-done" &&  dragDstEl !== "dummy-todo") 
                normalChange()

        }

        disableDummyCards()

        return false

    }

    const normalChange = () => {
        
        const source = cardsContainer.current.querySelector(`#${dragSrcEl}`)
            
        const bridge = source.innerHTML

        const dest = cardsContainer.current.querySelector(`#${dragDstEl}`)

        source.innerHTML = dest.innerHTML

        dest.innerHTML = bridge

    }

    const activateDummyCard = whoisMoving => {
        
        if ( cardsContainer.current ) 

            if ( whoisMoving === "done" )
                cardsContainer.current.querySelector("#dummy-todo").style.display = "block"
                
            else 
                cardsContainer.current.querySelector("#dummy-done").style.display = "block"

    }

    const disableDummyCards = () => {
        
        if ( cardsContainer.current ){

            cardsContainer.current.querySelector("#dummy-todo").style.display = "none"
            cardsContainer.current.querySelector("#dummy-done").style.display = "none"

        }

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

                    <Stack 

                        spacing = { 4 }

                    >

                        {data.todo.map(task => (

                            <Card
                                id = { task.id }
                                data-type = "todo"
                                onDragStart = { handleDragStart }
                                onDragEnd = { handleDragEnd }
                                onDragEnter = { handleDragEnter }
                                onDragLeave = { handleDragLeave }
                                onDragOver = { handleDragOver }
                                onDrop = { handleDrop }
                                draggable="true"
                            >

                                { task.taskName }

                            </Card>

                        ))}


                        <Card
                            id = "dummy-todo"
                            onDragStart = { handleDragStart }
                            onDragEnd = { handleDragEnd }
                            onDragEnter = { handleDragEnter }
                            onDragLeave = { handleDragLeave }
                            onDragOver = { handleDragOver }
                            onDrop = { handleDrop }
                            draggable = "true"
                        >

                            Rehacer tarea

                        </Card>

                    </Stack>

                    <Stack 

                        spacing = { 4 }

                    >

                        {data.done.map(task => (
                            
                            <Card
                                id = { task.id }
                                data-type = "done"
                                onDragStart = { handleDragStart }
                                onDragEnd = { handleDragEnd }
                                onDragEnter = { handleDragEnter }
                                onDragLeave = { handleDragLeave }
                                onDragOver = { handleDragOver }
                                onDrop = { handleDrop }
                                draggable="true"
                            >

                                { task.taskName }

                            </Card>
                            
                        ))}


                        <Card
                            id = "dummy-done"
                            onDragStart = { handleDragStart }
                            onDragEnd = { handleDragEnd }
                            onDragEnter = { handleDragEnter }
                            onDragLeave = { handleDragLeave }
                            onDragOver = { handleDragOver }
                            onDrop = { handleDrop }
                            draggable = "true"
                        >
                            Completar tarea

                        </Card>
                    </Stack>

                </Grid>
            </Container>

        </Layout>

    );
}
 
export default Tasks;