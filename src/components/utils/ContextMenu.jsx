import React, { useRef, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { MenuButton, Menu, MenuList, MenuItem, useDisclosure } from "@chakra-ui/react"

const Container = styled.div`
    
    position: absolute;

`

const ContextMenu = ({ show, setShow ,xPos, yPos }) => {

    const openContextMenu = useRef()

    useEffect(() => {

        if( show &&  openContextMenu.current )
            openContextMenu.current.click()
        
    }, [show])

    return show && ( 
        
        <Container
            style = {{
                top: yPos,
                left: xPos
            }}
        >

            <Menu
                onClose = { () => setShow( false ) }
            >

                <MenuButton
                    ref = { openContextMenu }
                />

                <MenuList>

                    <MenuItem>
                        Completar
                    </MenuItem>

                    <MenuItem>
                        Editar
                    </MenuItem>

                    <MenuItem
                        color = "red.600"
                        onClick = { () => console.log("cerrar") }
                    >
                        Eliminar
                    </MenuItem>

                </MenuList>
            </Menu>

        </Container>

    );
}
 
export default ContextMenu;