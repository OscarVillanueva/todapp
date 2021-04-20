import React from 'react'
import { Box, Text, Stack } from "@chakra-ui/react"
import Card from '../utils/Card'


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

                spacing = { 4 }

            >

                {tasks.map(task => (

                    <Card
                        key = { task._id }
                        id = { task._id }
                        dataType = "done"
                        onDragStart = { handleDragStart }
                        onDragEnd = { handleDragEnd }
                        onDragEnter = { handleDragEnter }
                        onDragLeave = { handleDragLeave }
                        onDragOver = { handleDragOver }
                        onDrop = { handleDrop }
                        onContextMenu = { handleRigthClick }
                        draggable="true"
                    >

                        { task.taskName }

                    </Card>

                ))}


                <Card
                    id = "dummy-done"
                    dataType = "done"
                    onDragStart = { handleDragStart }
                    onDragEnd = { handleDragEnd }
                    onDragEnter = { handleDragEnter }
                    onDragLeave = { handleDragLeave }
                    onDragOver = { handleDragOver }
                    onDrop = { handleDrop }
                    onContextMenu = { handleRigthClick }
                    draggable = "true"
                >

                    Completar tarea

                </Card>

            </Stack>


        </Stack>

    );
}
 
export default DoneList;