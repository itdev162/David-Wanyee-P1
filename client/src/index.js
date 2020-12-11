/* jshint esversion: 5 */ 
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import * as serviceworker from './serviceWorker.ts';

class index{
    constructor(){
        this.render();
    }

    render(){
        ReactDOM.render(
            <React.StrictMode>
            <App/>
            </React.StrictMode>,
            document.getElementById('root')
         );
    }
}
export default index;