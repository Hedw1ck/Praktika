import './App.css'
import Header from './Components/Header/header'
import Page from './Pages/page'


function App() {
const token = localStorage.getItem('token');

  return (
    <>
        {
          token &&  <Header/>
        }
      <Page/>
    </>
  )
}

export default App
