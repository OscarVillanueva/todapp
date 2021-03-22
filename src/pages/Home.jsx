import React, { } from 'react'
import { Heading } from "@chakra-ui/react"
import Layout from '../components/utils/Layout'
import ProjectList from '../components/projects/ProjectList'
import LoadingProjects from '../components/projects/LoadingProjects'

const Home = () => {

    return ( 

        <Layout>

            <Heading
                align = "center"
                color = "white"
            >
                Proyectos Activos
            </Heading>

            <ProjectList />

        </Layout>

    );
}
 
export default Home;