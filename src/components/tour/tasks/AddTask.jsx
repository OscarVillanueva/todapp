import React from 'react'
import { Heading, Stack, Text } from '@chakra-ui/layout';

const Add = () => {
    return ( 

        <Stack>

            <Heading
                textAlign = "center"
                mb = { 4 }
                as = "h3"
            >
                Agregar proyectos
            </Heading>

            <Text
                textAlign = "center"
            >
                
                Con ayuda de este botón podrás agregar tareas al proyecto

            </Text>

        </Stack>

    );
}
 
export default Add;