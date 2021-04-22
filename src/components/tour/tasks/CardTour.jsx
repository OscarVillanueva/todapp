import React from 'react'
import { Heading, Stack, Text } from '@chakra-ui/layout';

const CardTour = () => {
    return ( 

        <Stack>

            <Heading
                textAlign = "center"
                mb = { 4 }
                as = "h3"
            >
                Arrastrar y soltar
            </Heading>

            <Text
                textAlign = "center"
            >
                
                Para marcar una tarea como completa o para rehacerla puedes cambiar de columna arrastrandola y soltandola con otra tarea para intercambiarlas o para cambiarla unicamente debes soltarla en una tarea que se habilitara como 
                    <span style = {{ fontWeight: "bold" }}>
                        {" "} Completar tarea {" "}
                    </span> 
                    o 
                    <span style = {{ fontWeight: "bold" }}>
                        {" "} Rehacer tarea {" "}
                    </span> 
                    y ahí la sueltas.

            </Text>

        </Stack>

    );
}
 
export default CardTour;