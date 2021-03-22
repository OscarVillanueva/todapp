import React, { useContext, useState } from 'react'
import ContextProject from '../../context/projects/ContextProject'
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

    // Input del modal
    const [projectName, setProjectName] = useState("")

    // Context de projectos
    const { addProject } = useContext( ContextProject )

    // Agregar un proyectos
    const uploadProject = () => {

        addProject({
            projectName
        })

        // Cerramos el modal
        onClose()

    }

    // Agregar proyecto si se dio enter
    const handleKeyDown = e => e.key === "Enter" && uploadProject()

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
                    Agregar nuevo proyecto
                </ModalHeader>

                <ModalCloseButton 
                    color = "white"
                />

                <ModalBody>
                    
                    <Text
                        color = "white"
                        fontWeight = "bold"
                    >
                        Correo Electrónico:
                    </Text>

                    <Input
                        color = "white"
                        mt = { 8 }
                        id = "projectName"
                        name = "projectName"
                        placeholder = "Tu nuevo fantástico proyecto"
                        onChange = { e => setProjectName( e.target.value ) }
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
                        onClick = { uploadProject }
                        disabled = { projectName.trim().length === 0 ? true : false }
                    >
                        Agregar
                    </Button>


                </ModalFooter>

            </ModalContent>

        </Modal>

    );

}
 
export default AddProject;