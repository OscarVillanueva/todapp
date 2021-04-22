import React from 'react'
import { Heading, Stack, Text } from '@chakra-ui/layout';

const TaskList = () => {
    return ( 

        <Stack>

            <Heading
                textAlign = "center"
                mb = { 4 }
                as = "h3"
            >
                Listado de Tareas
            </Heading>

            <Text
                textAlign = "center"
            >
                
                Aquí encontrás todos las tareas que tengas registradas, como puedes ver en dos columnas, lo que tienes por hacer y lo que ya esta completo

            </Text>

        </Stack>

    );
}
 
export default TaskList;