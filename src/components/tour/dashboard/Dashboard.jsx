import React from 'react'
import { Heading, Stack, Text } from '@chakra-ui/layout';

const Dashboard = () => {
    return ( 

        <Stack>

            <Heading
                textAlign = "center"
                mb = { 4 }
                as = "h3"
            >
                Tablero
            </Heading>

            <Text
                textAlign = "center"
            >
                
                Aquí encontrás todos los proyectos que tengas registrados, al dar clic sobre ellos podrás navegar a otra sección para ver y registrar tus tareas

            </Text>

        </Stack>

    );
}
 
export default Dashboard;