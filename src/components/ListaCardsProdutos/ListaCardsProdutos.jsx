import React, { useEffect, useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../BreadCrumbs/BreadCrumbs.jsx";
import ImgStatusDisponivel from "../../assets/ImgStatusDisponivel.png";
import ImgStatusIndisponivel from "../../assets/ImgStatusIndisponivel.png";

import "./ListaCardsProdutos.css";
import CardProduto from "../CardProduto/CardProduto.jsx";

import { SearchContext } from "../../context/SearchContext.jsx";

const ListaCardsProdutos = () => {
  // Inicializando variáveis
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const { location } = useContext(SearchContext);

  // Buscando o que foi digitado
  const query = new URLSearchParams(useLocation().search).get("search");


  //Recupera dados API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`/api/items?q=${query}`);
        setItems(response.data.items);
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
    fetchItems();
    
  }, [query]);

  // Função para determinar a imagem status de acordo com a disponibilidade do produto
  const getStatusImage = (availableQuantity) => {
    return availableQuantity > 0 ? ImgStatusDisponivel : ImgStatusIndisponivel;
  };
  
  return (
    <div className="divListaCardProdutos">
      <Breadcrumb categories={categories} />
      <div className="divCardsProdutos">
        {items.map((item) => (
          <Link to={`/items/${item.id}`} key={item.id}>
            <CardProduto
              alt={item.title}
              imagem={item.picture}
              preco={item.price.amount}
              localizacao={location}
              imagemStatusDisponibilidade={getStatusImage(item.available_quantity)}
              produto={item.title}
              available_quantity={item.available_quantity}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListaCardsProdutos;
