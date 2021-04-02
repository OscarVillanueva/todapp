import React, { useRef, useState, useEffect, useContext } from 'react'
import { Heading, Grid, Box, Text, Stack } from "@chakra-ui/react"
import styled from '@emotion/styled'
import Layout from '../components/utils/Layout'
import ContextProject from '../context/projects/ContextProject'
import ContextTask from '../context/tasks/ContextTask'
import useDragAndDrop from '../hook/useDragAndDrop'
import TodoList from '../components/tasks/TodoList'
import DoneList from '../components/tasks/DoneList'

const Container = styled.div`
    .over {
        border: 3px dotted #b7791f;
    }
`

const Tasks = () => {

    const cardsContainer = useRef()

    const { currentProject } = useContext( ContextProject )

    const { projectTasks, loading, fetchTask } = useContext( ContextTask )

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
        
        // fetchTask(currentProject._id)

    }, [currentProject])

    useEffect(() => {

        disableDummyCards()
        
    }, [cardsContainer])


    const handleEnd = () => {
        
        if ( cardsContainer.current ) {
            
            cardsContainer.current.querySelectorAll(".over").forEach( item => {

                item.classList.remove("over")

            })

        }

        disableDummyCards()

    }

    const handleActionOnDrop = () => {
        
        if ( dragSrcEl.stage === dragDstEl.stage )

            changePosition()

        else 

            if ( dragSrcEl.id !== dragDstEl.id && cardsContainer.current)  {


                if ( dragDstEl.id !== "dummy-done" &&  dragDstEl.id !== "dummy-todo") 
                    normalChange()

                else pushToOtherList()

            }

        disableDummyCards()

    }

    // TODO: Mover al state esta lógica
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

    const changePosition = () => {
        
        const source = data[ dragSrcEl.stage ].findIndex( task => task.id === dragSrcEl.id )
        const dest = data[ dragDstEl.stage ].findIndex( task => task.id === dragDstEl.id )

        const bridge = [ ...data[ dragSrcEl.stage ] ]

        bridge[ source ] = data[ dragSrcEl.stage ][ dest ]
        bridge[ dest ] = data[ dragSrcEl.stage ][ source ]

        setData({
            ...data,
            [ dragSrcEl.stage ]: bridge
        })

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

    const { dragSrcEl, dragDstEl, events } = useDragAndDrop({
        startCallback: activateDummyCard,
        endCallback: handleEnd,
        dropCallback: handleActionOnDrop
    })

    return ( 
        
        <Layout
            spinner = { loading }
            spinnerText = "Estamos buscando tus tareas"
            addModalConfig = {{
                title: "Agregar tarea",
                label: "Nombre de la tarea",
                placeholder: "Nombre la nueva tarea",
                tooltip: "Agregar tarea",
                // callback: uploadProject
            }}
        >

            <Container>

                <Heading
                    align = "center"
                    color = "white"
                >
                    Proyecto: { " " }
                    {/* <Text
                        display = "inline"
                        color = "yellow.400"
                        casing = "uppercase"
                    >
                        { currentProject.projectName }
                    </Text> */}
                </Heading>

                <Grid
                    templateColumns = "repeat( 2, 1fr )"
                    gap = { 8 }
                    mt = { 16 }
                    maxHeight = "85%"
                    ref = { cardsContainer }
                >
                    
                    
                    <TodoList
                        tasks = { data.todo }
                        events = { events }
                    />
                    
                    <DoneList
                        tasks = { data.done }
                        events = { events }
                    />
                    


                </Grid>
            </Container>

        </Layout>

    );
}
 
export default Tasks;