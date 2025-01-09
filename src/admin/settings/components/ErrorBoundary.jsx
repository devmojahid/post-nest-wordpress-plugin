import React from 'react';
// import { __ } from '@wordpress/i18n';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Post Nest Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="pn-error-boundary">
                    {/* <h1>{__('Something went wrong', 'post-nest')}</h1> */}
                    <h1>Something went wrong</h1>
                    <p>{this.state.error?.message}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="button button-primary"
                    >
                        {/* {__('Reload Page', 'post-nest')} */}
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 