import React from 'react'
import { Box, Text, Stack } from "@chakra-ui/react"
import Card from '../utils/Card'


const DoneList = ({ tasks,  events}) => {

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


        </Stack>

    );
}
 
export default DoneList;