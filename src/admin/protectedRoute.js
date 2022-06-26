import React from "react";
import { Redirect } from 'react-router-dom';

function ProtectedRoute(props) {
    const Component = props.component;

    return (
        <div>
            {  props.authenticated ? < Component /> : < Redirect to={{ pathname: '/admin/login' }} />}
        </div>
    )
}

export default ProtectedRoute;