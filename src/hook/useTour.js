import React, { useState, useEffect, useContext } from 'react';
import Tour from 'reactour'
import moment from 'moment'

// Context
import ContextAuth from '../context/auth/ContextAuth'

// components
import Welcome from '../components/tour/dashboard/Welcolme'
import Dashboard from '../components/tour/dashboard/Dashboard'
import Add from '../components/tour/dashboard/Add'
import AddTask from '../components/tour/tasks/AddTask'
import Logout from '../components/tour/dashboard/Logout'
import TaskList from '../components/tour/dashboard/TaskList';
import CardTour from '../components/tour/tasks/CardTour';
import CardTourRigthClick from '../components/tour/tasks/CardTourRigthClick';

const useTour = page => {

    const [open, setOpen] = useState(false)

    const { user } = useContext( ContextAuth )

    useEffect(() => {
        
        if( user ) startTour( user )

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const checkUserSignUp = user => {
        
        const rawSignUp = new Date( user.signUp )
        
        const signUp = moment( rawSignUp ).format( "DD/MM/YY" )
        const today = moment( Date.now() ).format( "DD/MM/YY" )

        console.log(`signUp === today`, signUp === today)

        if( signUp === today )
            return true

        return false

    }

    const startTour = user => {

        if( checkUserSignUp(user) ) {

            const wasView = JSON.parse( localStorage.getItem("tourViewed") )
    
            if ( !wasView ) setOpen( true )
    
            else {
    
                if( wasView.includes( page ) ) setOpen( false ) 
                else setOpen( true )
    
            }

        }

    }

    const handleClose = () => {
        
        setOpen( false )

        let previous = JSON.parse( localStorage.getItem( "tourViewed" ) ) 

        if( previous ) previous.push( page )

        else previous = [ page ]

        localStorage.setItem( "tourViewed", JSON.stringify( previous ) )

    }

    const steps = {
        home: [
            {
                selector: "",
                content: <Welcome />
            },
            {
                selector: "#project-list",
                content: <Dashboard />
            },
            {
                selector: "#add-button",
                content: <Add />
            },
            {
                selector: "#logout-button",
                content: <Logout />
            }
        ],
        tasks: [
            {
                selector: "#task-list",
                content: <TaskList />
            },
            {
                selector: ".tour-card:first-child",
                content: <CardTour />
            },
            {
                selector: ".tour-card:nth-child(2)",
                content: <CardTourRigthClick />
            },
            {
                selector: "#add-button",
                content: <AddTask />
            },
        ]
    }

    const AppTour = () => (
        <Tour
            steps = { steps[ page ] }
            isOpen = { open }
            accentColor = "#22543D"
            rounded = { 10 }
            onRequestClose = { () => handleClose() }
        />
    )

    return {
        AppTour
    }
}
 
export default useTour;