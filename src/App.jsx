import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home/Home'
import { Login } from './pages/Login'
import { Products } from './pages/Products/Products'
import { Purchases } from './pages/Purchases'
import { Navbar } from './components/Navbar/Navbar'
import Loader from './components/Loader/Loader'
import { useSelector } from 'react-redux'

function App() {

  const isLoading = useSelector( state=> state.Loader)
  
  return (
    <HashRouter>
      <Navbar/>
      {isLoading && <Loader/>}
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/products/:id' element={<Products/>}/>
            <Route path='/purchases' element={<Purchases/>}/>
        </Routes>
    </HashRouter>
  )
}

export default App
