import BarraDeBusca from "../components/BarraDeBusca/BarraDeBusca.jsx"
import './PgsDesign.css'
import ImgErro from '../assets/ImgErro.png'
function PgErro() {

    return (
        <div className="divPgs" >
        <BarraDeBusca/>
         <img src={ImgErro} alt="" style={{width: "40vw", margin: "5vw"}} />
        </div>
    )
  }
  
  export default PgErro
  