import React from 'react'
import { Heading, Stack, Text } from '@chakra-ui/layout';

const Welcome = () => {
    return ( 
        
        <Stack>

            <Heading
                textAlign = "center"
                mb = { 4 }
            >
                ¡Bienvenido!
            </Heading>

            <Text
                textAlign = "center"
            >
                
                Bienvenido a 
                
                <span
                    style = {{ fontWeight: 'bold' }}
                >
                    {" "} Todapp, {" "}
                </span>

                una aplicación dedicada al registro de tus tareas y proyectos, dentro de cada proyecto podrás registrar tus tareas y marcarlas como completas o por hacer (todo).

            </Text>

        </Stack>

    );
}
 
export default Welcome;