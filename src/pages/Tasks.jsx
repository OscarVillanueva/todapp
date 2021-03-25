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
                id: "gas452",
                taskName: "Testing de tarjetas"
            }
        ],
        done: [
            {
                id: "jduh79",
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
        setDragSrcEl({ 
            id: e.target.getAttribute( "id" ),
            stage: e.target.getAttribute( "data-type" )
        })

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

        setDragDstEl({ 
            id: e.target.getAttribute( "id" ),
            stage: e.target.getAttribute( "data-type" )
        })
    }

    const handleDragLeave = e => {
        
        e.target.classList.remove("over")

    }

    const handleDrop = e => {
        
        e.stopPropagation()

        console.log("source", dragSrcEl)
        console.log("dest", dragDstEl)

        if ( dragSrcEl.id !== dragDstEl.id && cardsContainer.current)  {

            if ( dragDstEl.id !== "dummy-done" &&  dragDstEl.id !== "dummy-todo") 
                normalChange()

            else pushToOtherList()

        }

        disableDummyCards()

        return false

    }

    const normalChange = () => {

        // Columna - Todo - Ejemplo no siempre pasa así
        const source = data[ dragSrcEl.stage ].find( task => task.id === dragSrcEl.id )

        // Columna - Done - Ejemplo no siempre pasa así
        const dest = data[ dragDstEl.stage ].find( task => task.id === dragDstEl.id )

        // Columna - Done - Ejemplo no siempre pasa así
        const newDest = data[ dragDstEl.stage ].map( task => task.id !==  dest.id ? task : source )

        // Columna - Todo - Ejemplo no siempre pasa así
        const newSource = data[ dragSrcEl.stage ].map( task => task.id !==  source.id ? task : dest )

        setData({
            
            todo: dragSrcEl.stage === "todo" ? newSource : newDest,
            done: dragSrcEl.stage === "todo" ? newDest : newSource

        })

    }

    const pushToOtherList = () => {
        
        const source = data[ dragSrcEl.stage ].find( task => task.id === dragSrcEl.id )

        const newDest = [ ...data[ dragDstEl.stage ], source ]

        const bridge = { ...data }

        bridge[ dragDstEl.stage ] = newDest
        bridge[ dragSrcEl.stage ] = data[ dragSrcEl.stage ].filter( task => task.id !== source.id )

        setData( bridge )

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
                                key = { task.id }
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
                            data-type = "todo"
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
                                key = { task.id }
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
                            data-type = "done"
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