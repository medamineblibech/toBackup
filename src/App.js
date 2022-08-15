import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import ListBackups from './component/Backups';
import ErrorBundary from './component/ErrorBundary';

const App = () => {
  return (
    <div>
    <ErrorBundary style={{margin:"center"}}>
      <ListBackups/>
    </ErrorBundary>
    </div>
  )
}
export default App;
