import React from 'react'
import { Box, Text, Stack } from "@chakra-ui/react"
import Card from './Card'


const DoneList = ({ tasks,  events, handleRigthClick }) => {

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
                    Completo
                </Text>
            </Box>

            <Stack 

                data-cy = "done-list"
                spacing = { 4 }

            >

                {tasks.map(task => (

                    <Card
                        key = { task._id }
                        task = { task }
                        dataType = "done"
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
                    task = {{ _id: "dummy-done" }}
                    dataType = "done"
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


        </Stack>

    );
}
 
export default DoneList;