import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import contextAuth from '../context/auth/ContextAuth'
import Layout from '../components/Layout'

const Home = () => {

    const { authenticated, loading, token } = useContext( contextAuth )

    const navigate = useNavigate()

    return ( 

        <Layout>

            <h1>hola</h1>
            
        </Layout>

    );
}
 
export default Home;