import PgBarraDeBusca from './pages/PgBarraDeBusca.jsx'
import PgResultadosBarraDeBusca from './pages/PgResultadosBarraDeBusca.jsx'
import PgDetalhesDoProduto from './pages/PgDetalhesDoProduto.jsx'
import PgErro from './pages/PgErro.jsx'

import { SearchProvider } from './context/SearchContext.jsx';

//Importando React Router 
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


//Definindo Rotas
const router = createBrowserRouter([
  
  {
    path: "/",
    element: <PgBarraDeBusca />
  },
  {
    path: "*",
    element: <PgErro />
  },
  {
    path: "/items",
    element: <PgResultadosBarraDeBusca />
  },

  {
    path: "/items/:id",
    element: <PgDetalhesDoProduto />
  },
])

function App() {

  return (
    <SearchProvider>
        <RouterProvider router={router} />
    </SearchProvider>

  )
}

export default App
