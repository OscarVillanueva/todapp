import React from 'react'
import { Heading, Stack, Text } from '@chakra-ui/layout';
import styled from '@emotion/styled'

const CardTourRigthClick = () => {
    return ( 

        <Stack>

            <Heading
                textAlign = "center"
                mb = { 4 }
                as = "h3"
            >
                Clic Derecho
            </Heading>

            <Text
                textAlign = "center"
            >
                
                Puedes marcar como completa o por hacer una tarea dando clic derecho sobre la tarea y se mostrara la opción, de igual forma para eliminar damos clic derecho sobre la tarea.

            </Text>

        </Stack>

    );
}
 
export default CardTourRigthClick;