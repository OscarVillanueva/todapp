import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import contextAuth from '../context/auth/ContextAuth'
import useAuth from '../hook/useAuth'

const Home = () => {

    const { authenticated, loading, token } = useContext( contextAuth )

    const navigate = useNavigate()

    useAuth()

    return ( 

        <h1>hola</h1>

    );
}
 
export default Home;