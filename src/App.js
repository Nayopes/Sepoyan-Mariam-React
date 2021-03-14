import './App.css'
import NavBar from './Components/NavBar/NavBar'
import { Route, Switch, Redirect } from 'react-router-dom'

import ToDo from './Components/Pages/ToDo/ToDo'
import Contact from './Components/Pages/Contact/Contact'
import About from './Components/Pages/About/About'
import NotFound from './Components/Pages/NotFound/NotFound'
import SingleTask from './Components/Pages/SingleTask/SingleTask'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path='/' component={ToDo} exact/>
        <Route path='/contact' component={Contact} exact/>
        <Route path='/about' component={About} exact/>
        <Route path='/404' component={NotFound} exact/>
        <Route path='/task/:id' component={SingleTask} exact/>
        <Redirect to='/404' />
      </Switch>
    </div>
  )
}

export default App
