import './App.css'
import NavBar from './Components/NavBar/NavBar'
import { Route, Switch, Redirect } from 'react-router-dom'
import ToDo from './Components/Pages/ToDo/ToDo'
import Contact from './Components/Pages/Contact/Contact'
import About from './Components/Pages/About/About'
import NotFound from './Components/Pages/NotFound/NotFound'
import SingleTask from './Components/Pages/SingleTask/SingleTask'
import ContactContextProvider from './Context/ContactContext'

const pages = [
  {
    path: '/',
    component: ToDo
  },
  {
    path: '/contact',
    component: Contact,
    provider: ContactContextProvider
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/404',
    component: NotFound
  },
  {
    path: '/task/:id',
    component: SingleTask
  }
]
function App(props) {
  const pagesItmes = pages.map((el, index) => {
    if (el.provider) {
      return <Route
        key={index}
        path={el.path}
        render={() => {
          return (
            el.provider ?
              <el.provider>
                <el.component />
              </el.provider> :
              <el.component />
          )
        }}
        exact
      />
    }
    return <Route
      key={index}
      path={el.path}
      component={el.component}
      exact
    />
  })
  return (
    <div className="App">
      <NavBar />
      <Switch>
        {pagesItmes}
        <Redirect to='/404' />
      </Switch>
    </div>
  )
}

export default App
