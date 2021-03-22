import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
    Input
  } from "@chakra-ui/react"

const AddProject = ({ isOpen, onOpen, onClose }) => {

    return ( 

        <Modal 
            isOpen={isOpen} 
            onClose={onClose}
            colorScheme = "yellow"
            isCentered
        >

            <ModalOverlay />

            <ModalContent>

                <ModalHeader>Agregar nuevo proyecto</ModalHeader>

                <ModalCloseButton />

                <ModalBody>
                    
                    <Text
                        color = "white"
                        fontWeight = "bold"
                    >
                        Correo Electrónico:
                    </Text>

                    <Input
                        mt = { 8 }
                        id = "projectName"
                        name = "projectName"
                        placeholder = "Tu nuevo fantástico proyecto"
                    />
                    
                </ModalBody>

                <ModalFooter>

                    <Button variant="ghost" onClick={onClose}>
                        Cancelar
                    </Button>

                    <Button colorScheme="yellow" ml={ 3 } >
                        Agregar
                    </Button>


                </ModalFooter>

            </ModalContent>

        </Modal>

    );

}
 
export default AddProject;