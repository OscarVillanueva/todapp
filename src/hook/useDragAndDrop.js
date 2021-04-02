import { useState } from 'react';

const useDragAndDrop = config => {

    const [dragSrcEl, setDragSrcEl] = useState("")
    const [dragDstEl, setDragDstEl] = useState("")

    const handleDragStart = e => {
        
        e.target.style.opacity = "0.4"
        e.target.classList.add("source")

        config.startCallback( e.target.getAttribute( "data-type" )  )

        setDragSrcEl({ 
            id: e.target.getAttribute( "id" ),
            stage: e.target.getAttribute( "data-type" )
        })

    }

    const handleDragEnd = e => {
        
        e.target.style.opacity = "1"

        config.endCallback()

    }

    const handleDragOver = e => {
        
        if (e.preventDefault) {
            e.preventDefault();
        }
      
        return false;

    }

    const handleDragEnter = e => {
        
        e.target.classList.add("over")

        setDragDstEl({ 
            id: e.target.getAttribute( "id" ),
            stage: e.target.getAttribute( "data-type" )
        })
    }

    const handleDragLeave = e => {
        
        e.target.classList.remove("over")

    }

    const handleDrop = e => {
        
        e.stopPropagation()

        config.dropCallback()

        return false

    }

    return {
        dragSrcEl,
        dragDstEl,
        events: {
            handleDragStart,
            handleDragEnd,
            handleDragOver,
            handleDragEnter,
            handleDragLeave,
            handleDrop
        }
    }
}
 
export default useDragAndDrop;