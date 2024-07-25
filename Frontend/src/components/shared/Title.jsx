// import React from 'react'
import { Helmet } from "react-helmet-async"

const Title = ({title="Chat App", desc="this is a Chat app"}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={desc} />
        </Helmet>
    )
}

export default Title
