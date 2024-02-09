import React from "react";


function ErrorBoundary({ commonProps }) {
    return <div id="error-boundary">
        <h1>An error occurred</h1>
        <a href={commonProps.websiteURL}>Return home</a>
    </div>;
}

export default ErrorBoundary;
