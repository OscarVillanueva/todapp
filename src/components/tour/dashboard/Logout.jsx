import React from 'react'
import { Heading, Stack, Text } from '@chakra-ui/layout';

const Logout = () => {
    return ( 

        <Stack>

            <Heading
                textAlign = "center"
                mb = { 4 }
                as = "h3"
            >
                Salir
            </Heading>

            <Text
                textAlign = "center"
            >
                
                Con ayuda de este botón podrás cerrar tu sesión

            </Text>

        </Stack>

    );
}
 
export default Logout;