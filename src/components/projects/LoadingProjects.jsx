import React from 'react'
import { Skeleton, Stack, Grid } from "@chakra-ui/react"

const LoadingProjects = () => ( 

    <Grid
        templateColumns = {{ base: "repeat( 2, 1fr )", md: "repeat( 4, 1fr )" }}
        gap = { 8 }
        mt = { 16 }
        maxHeight = "85%"
        overflow = "scroll"
    >

        <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
        </Stack>

        <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
        </Stack>

        <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
        </Stack>

        <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
        </Stack>

        <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
        </Stack>

    </Grid>

);
 
export default LoadingProjects;