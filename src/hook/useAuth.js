import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import contextAuth from '../context/auth/ContextAuth'

const useAuth = () => {

    const { authenticatedUser, token, loading, authenticated } = useContext( contextAuth )

    const navigate = useNavigate()

    useEffect(() => {
        
        authenticatedUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {

        if ( !loading && !token && !authenticated ) 
            navigate("/")

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ loading ])

}
 
export default useAuth;