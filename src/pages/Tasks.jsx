import React, { useRef, useEffect, useContext, useState } from 'react'
import { Heading, Grid, Text } from "@chakra-ui/react"
import styled from '@emotion/styled'
import { useNavigate } from "react-router-dom";

// Components
import Layout from '../components/utils/Layout'
import TodoList from '../components/tasks/TodoList'
import DoneList from '../components/tasks/DoneList'
import ContextMenu from '../components/utils/ContextMenu'

// Context
import ContextProject from '../context/projects/ContextProject'
import ContextTask from '../context/tasks/ContextTask'

// hooks
import useDragAndDrop from '../hook/useDragAndDrop'
import useTour from '../hook/useTour'

const Container = styled.div`
    .over {
        border: 3px dotted #b7791f;
    }
`

const Tasks = () => {

    const cardsContainer = useRef()

    const { currentProject } = useContext( ContextProject )

    const [show, setShow] = useState(false)
    const [position, setPosition] = useState({})

    // Tour
    const { AppTour } = useTour("tasks")

    const navigate = useNavigate()

    const { 
        loading, 
        projectTasks, 
        fetchTask, 
        addTask, 
        normalChange, 
        pushToOtherList, 
        changePosition, 
        editTask 
    } = useContext( ContextTask )

    useEffect(() => {

        if( currentProject )
            fetchTask(currentProject._id)

        else navigate("/home") 

    }, [currentProject])

    useEffect(() => {

        disableDummyCards()
        
    }, [cardsContainer])

    const { dragSrcEl, dragDstEl, events } = useDragAndDrop({
        startCallback: activateDummyCard,
        endCallback: handleEnd,
        dropCallback: handleActionOnDrop
    })

    function handleEnd () {
        
        if ( cardsContainer.current ) {
            
            cardsContainer.current.querySelectorAll(".over").forEach( item => {

                item.classList.remove("over")

            })

        }

        disableDummyCards()

    }

    function handleActionOnDrop ()  {
        
        if ( dragSrcEl.stage === dragDstEl.stage )

            changePosition( dragSrcEl,  dragDstEl)

        else 

            if ( dragSrcEl.id !== dragDstEl.id && cardsContainer.current)  {

                updateStatusOfTask( dragSrcEl, dragDstEl )

                if ( dragDstEl.id !== "dummy-done" &&  dragDstEl.id !== "dummy-todo") 
                    normalChange( dragSrcEl, dragDstEl )

                else pushToOtherList( dragSrcEl, dragDstEl )

            }

        disableDummyCards()

    }

    function activateDummyCard( whoisMoving ) {

        if ( cardsContainer.current ) 

            if ( whoisMoving === "done" )
                cardsContainer.current.querySelector("#dummy-todo").style.display = "block"
                
            else 
                cardsContainer.current.querySelector("#dummy-done").style.display = "block"
        
    }

    function disableDummyCards (){

        if ( cardsContainer.current ){

            cardsContainer.current.querySelector("#dummy-todo").style.display = "none"
            cardsContainer.current.querySelector("#dummy-done").style.display = "none"

        }

    }

    function updateStatusOfTask( dragSrcEl, dragDstEl ) {

        
        if ( !dragSrcEl.id.includes("dummy") ) {

            const task = projectTasks[ dragSrcEl.stage ].find( e => e._id === dragSrcEl.id )
            task.state = !task.state

            editTask( task )
            
        } 

        if( !dragDstEl.id.includes("dummy") ) {
            
            const task = projectTasks[ dragDstEl.stage ].find( e => e._id === dragDstEl.id )
            task.state = !task.state

            editTask( task )

        }

    }

    const uploadTask = name => addTask({ taskName: name, projectId: currentProject._id })

    return ( 
        
        <Layout
            spinner = { loading }
            spinnerText = "Estamos buscando tus tareas"
            addModalConfig = {{
                title: "Agregar tarea",
                label: "Nombre de la tarea",
                placeholder: "Nombre la nueva tarea",
                tooltip: "Agregar tarea",
                callback: uploadTask
            }}
        >

            <Container>

                <Heading
                    align = "center"
                    color = "white"
                >
                    Proyecto: { " " }
                    <Text
                        display = "inline"
                        color = "yellow.400"
                        casing = "uppercase"
                    >
                        { currentProject && currentProject.projectName}
                    </Text>
                </Heading>

                <Grid
                    templateColumns = "repeat( 2, 1fr )"
                    gap = { 8 }
                    mt = { 16 }
                    maxHeight = "85%"
                    ref = { cardsContainer }
                    id = "task-list"
                >
                    
                    
                    <TodoList
                        tasks = { projectTasks.todo ? projectTasks.todo : [] }
                        events = { events }
                    />
                    
                    <DoneList
                        tasks = { projectTasks.done ? projectTasks.done : [] }
                        events = { events }
                    />
                    


                </Grid>
            </Container>

            <ContextMenu
                show = { show }
                setShow = { setShow }
                xPos = { position.xPos ? position.xPos : 0 }
                yPos = { position.yPos ? position.yPos : 0 }
            />

            { !loading && (
                
                <AppTour />

            )}

        </Layout>

    );
}
 
export default Tasks;