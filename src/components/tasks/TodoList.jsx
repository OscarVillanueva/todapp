import React from 'react'
import { Box, Text, Stack } from "@chakra-ui/react"
import Card from '../tasks/Card'

const TodoList = ({ tasks, events, handleRigthClick }) => {

    const { 
        handleDragStart, 
        handleDragEnd, 
        handleDragEnter, 
        handleDragLeave, 
        handleDragOver, 
        handleDrop 
    } = events

    return ( 

        <Stack>

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

            <Stack 

                spacing = { 4 }

            >

                {tasks.map(task => (

                    <Card
                        key = { task._id }
                        task = { task }
                        dataType = "todo"
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
                    task = {{ _id: "dummy-todo" }}
                    dataType = "todo"
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


        </Stack>

    );
}
 
export default TodoList;