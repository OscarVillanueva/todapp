import React, { useState } from 'react'
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

const ModalAdd = ({ isOpen, onOpen, onClose, config }) => {

    // Input del modal
    const [name, setName] = useState("")

    // Agregar un proyectos
    const upload = () => {

        config.callback( name )

        // Cerramos el modal
        onClose()

    }

    // Agregar proyecto si se dio enter
    const handleKeyDown = e => e.key === "Enter" && upload()

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
                    { config.title }

                </ModalHeader>

                <ModalCloseButton 
                    color = "white"
                />

                <ModalBody>
                    
                    <Text
                        color = "white"
                        fontWeight = "bold"
                    >
                        { config.label }
                    </Text>

                    <Input
                        color = "white"
                        mt = { 8 }
                        id = "projectName"
                        data-cy = "projectName"
                        name = "projectName"
                        placeholder = { config.placeholder }
                        onChange = { e => setName( e.target.value ) }
                        onKeyDown = { handleKeyDown }
                    />
                    
                </ModalBody>

                <ModalFooter>

                    <Button colorScheme = "red" onClick={ onClose }>
                        Cancelar
                    </Button>

                    <Button 
                        colorScheme="yellow" 
                        ml={ 3 } 
                        data-cy = "addProject"
                        onClick = { upload }
                        disabled = { name.trim().length === 0 ? true : false }
                    >
                        Agregar
                    </Button>


                </ModalFooter>

            </ModalContent>

        </Modal>

    );

}
 
export default ModalAdd;