import React, { Component } from 'react'

export class ErrorBundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
      }
    
      static getDerivedStateFromError(error) {    // Update state so the next render will show the fallback UI.    return { hasError: true };  }
      return{
        hasError: true
      }   
     } // You can also log the error to an error reporting service    logErrorToMyService(error, errorInfo);  }
     componentDidCatch(error, errorInfo) {   
         console.log(error);
         console.log(errorInfo); 
        }
      render() {
        if (this.state.hasError) { 
            return <h1>Something went wrong</h1>    
         } // You can render any custom fallback UI      return <h1>Something went wrong.</h1>;    }
        return this.props.children; 
      }
      }
   


export default ErrorBundary
