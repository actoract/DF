import React from 'react'
import {Spinner} from 'react-bootstrap'
import './loader.css';

const Loader = () => {
    return (
        <div className="backgroung">
        <Spinner animation="border" role="status" className="loader">
            <span className="sr-only">Loading...</span>
        </Spinner>
        </div>
    )
}
export default  Loader
