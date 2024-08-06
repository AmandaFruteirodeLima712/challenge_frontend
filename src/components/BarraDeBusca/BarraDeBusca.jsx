import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext.jsx';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';

// Importando css
import './BarraDeBusca.css';

// Importando imagens
import ImgLogoMeli from '../../assets/ImgLogoMeli.png';
import ImgLupa from '../../assets/ImgLupa.png';

function BarraDeBusca() {

    // Inicializa o useState para acompanhar a mudança do que é digitado no input
    const [busca, setBusca] = useState('');

    // Inicializando o useNavigate
    const navigate = useNavigate();
    
    const { setSearchQuery } = useContext(SearchContext);

    // Sanitiza a entrada do usuário
    const sanitizeInput = (input) => {
        return DOMPurify.sanitize(input);
    }

    // Direciona o usuário para a página com o resultado da busca
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const sanitizedBusca = sanitizeInput(busca);
        setSearchQuery(sanitizedBusca);
        navigate(`/items?search=${sanitizedBusca}`);
    };

    return (
        <div className='barraDeBusca'>
            <div className='divInternaBarraDeBusca'>
                <div className='divImgMercadoLivre'>
                   <Link to = "/"><img src={ImgLogoMeli} alt="Imagem logo da empresa Mercado Livre" className='imgBarraDeBusca' /></Link> 
                </div>

                <div className='divInptBarraDeBusca'>
                    <form className='formDesign' onSubmit={handleSubmit}>
                        <input 
                            className='inptBarraDeBusca' 
                            type="text" 
                            value={busca} 
                            onChange={(event) => setBusca(event.target.value)} 
                            placeholder='Nunca deixe de buscar:' 
                        />
                        <button type="submit" className='btnBusca'>
                            <img className='divImgLupa' src={ImgLupa} alt="Ícone de lupa" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BarraDeBusca;
