import React from 'react';
import './App.css';

import {BrowserRouter as Router , Route} from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Footer from './components/Footer/Footer';

const App = () =>{
    return(
        <div>
        <Router>
            <Route path="/" exact component={Join}/>
            <Route path="/chat"  component={Chat}/>
        </Router>
        <div className='f'>
        <Footer/>
        </div>
        
        </div>
    );
};

export default App;

