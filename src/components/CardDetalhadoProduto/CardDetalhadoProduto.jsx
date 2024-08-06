import './CardDetalhadoProduto.css';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext.jsx';
import axios from 'axios';
import Breadcrumb from '../BreadCrumbs/BreadCrumbs';

function CardDetalhadoProduto() {

  //Inicializando variáveis
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { setLocation } = useContext(SearchContext);


  //Recupera dados API
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`/api/items/${id}`);
        setItem(response.data.item);
        setLocation(response.data.item.seller_address.country.name); 
      } catch (error) {
        console.error('Erro ao buscar detalhes do item:', error);
      }
    };

    fetchItemDetails();

  }, [id, setLocation]);

  if (!item) {
    return <p>Carregando...Item não encontrado</p>; 
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: "center" }}>
      <Breadcrumb categories={[item.seller_address.country.name]} />

      <div className='divCardDetalhadoProduto'>
        <div className='divInternaCardDetalhadoProduto'>
          <div className='divConteudoProduto'>
            <img className='imgIpod' src={item.picture} alt={item.title} />
            <div className='divConteudoDireitaProduto'>
              <div className='divConditionSoldQuantity'>
                <div>Condição: {item.condition}</div>
              </div>
              <div className='divTituloItem'>{item.title}</div>
              <div className='divPrecoEPrecoDecimal'>
                <div className='divPreco'>$ {item.price.amount}</div>
                <div className='divPrecoDecimal'>{item.price.decimals}</div>
              </div>
              <div><button className='btnComprar'>Comprar</button></div>
            </div>
          </div>
          <div className='divGeralConteudoDescricao'>
            <div className='divTituloDecricaoItem'>Descrição do produto</div>
            <div className='divDecricaoItem'>{item.description}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardDetalhadoProduto;
