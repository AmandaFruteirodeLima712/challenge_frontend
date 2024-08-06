import ListaCardsProdutos from "../components/ListaCardsProdutos/ListaCardsProdutos.jsx"
import BarraDeBusca from "../components/BarraDeBusca/BarraDeBusca.jsx"
import './PgsDesign.css'

function PgResultadosBarraDeBusca() {

    return (
        <div className="divPgs">
        <BarraDeBusca/>
        <ListaCardsProdutos/>
        </div>
    )
  }
  
  export default PgResultadosBarraDeBusca