import CardDetalhadoProduto from '../components/CardDetalhadoProduto/CardDetalhadoProduto.jsx'
import BarraDeBusca from "../components/BarraDeBusca/BarraDeBusca.jsx"
import './PgsDesign.css'
function PgDetalhesDoProduto() {

    return (
        <div className="divPgs">
        <BarraDeBusca/>
        <CardDetalhadoProduto />
        </div>
    )
  }
  
  export default PgDetalhesDoProduto
  