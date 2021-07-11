import React from 'react'
import './App.css'
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom'
import Home from './pages/Home'
import Indicacoes from './pages/Indicacoes'
import { Tab, AppBar, Tabs} from '@material-ui/core'


function App() {
  const routes = ['/indicar','/indicados']
  return (
    <BrowserRouter>
          <Route path="/" render = {(history) => {
               return ( <AppBar>
                  <Tabs value={history.location.pathname}>
                    <Tab label="Indicar" value={routes[0]} component={Link} to={routes[0]}/>
                    <Tab label="Indicados" value={routes[1]} component={Link} to={routes[1]}/>
                  </Tabs>
                </AppBar>)
          }} />
        <Switch>
            <Route path="/indicar" component={Home} />
            <Route path="/indicados" component={Indicacoes} />
        </Switch>
    </BrowserRouter>
    
  );
}


export default App;
