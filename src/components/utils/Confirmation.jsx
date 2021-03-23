import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
  } from "@chakra-ui/react"

const Confirmation = ({ config, isOpen, onClose }) => {

    const { buttonText, buttonScheme, action, title, message } = config

    // Realizar la operación del callback y cerrar
    const operation = () => {
        
        action()

        onClose()

    }
    
    return ( 

        <Modal 
            isOpen={isOpen} 
            onClose={onClose}
            colorScheme = "yellow"
            isCentered
        >

            <ModalOverlay />

            <ModalContent>

                <ModalHeader
                    color = "white"
                >
                    { title }

                </ModalHeader>

                <ModalCloseButton 
                    color = "white"
                />

                <ModalBody
                    color = "white"
                >
                    
                    { message }
                    
                </ModalBody>

                <ModalFooter>

                    <Button colorScheme = "yellow" onClick={ onClose }>
                        Cancelar
                    </Button>

                    <Button 
                        colorScheme = { buttonScheme }
                        ml={ 3 } 
                        onClick = { operation }
                        data-cy = "btn-confirmation-alert"
                    >
                        { buttonText }
                    </Button>


                </ModalFooter>

            </ModalContent>

        </Modal>

    );
}
 
export default Confirmation;