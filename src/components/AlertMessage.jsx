import React from 'react';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Stack
} from "@chakra-ui/react"

const AlertMessage = ({ status, title, message }) => (

    <Alert status = { status } variant = "solid" borderRadius = "md">

        <AlertIcon />

        <Stack ml = "2">
            
            { title &&
                <AlertTitle mr={2} textTransform = "uppercase">
                    { title }
                </AlertTitle>
            }

            <AlertDescription>
                { message }
            </AlertDescription>
        </Stack>

    </Alert>

)
 
export default AlertMessage;