import React, { useRef, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import shortid from 'shortid'
import { MenuButton, Menu, MenuList, MenuItem } from "@chakra-ui/react"

const Container = styled.div`
    
    position: absolute;

`

const ContextMenu = ({ show, setShow ,xPos, yPos, options }) => {

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

                    {options.map(option => (

                        <MenuItem
                            key = { shortid.generate() }
                            color = { option.title === "Eliminar" && "red.600" }
                            onClick = { option.action }
                            data-cy = { option.cy }
                        >
                            { option.title }
                        </MenuItem>
                        
                    ))}

                </MenuList>
            </Menu>

        </Container>

    );
}
 
export default ContextMenu;