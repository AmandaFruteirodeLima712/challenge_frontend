import React, { useContext } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

import { SearchContext } from '../../context/SearchContext.jsx';

import './BreadCrumbs.css';

const Breadcrumb = ({ categories }) => {

  //Inicializando variáveis
  const location = useLocation();
  const { id } = useParams();
  const { searchQuery } = useContext(SearchContext);


  const generateBreadcrumbs = () => {

    //Sanitiza dados
    const sanitizedId = DOMPurify.sanitize(id);
    const sanitizedSearchQuery = DOMPurify.sanitize(searchQuery);

    if (location.pathname.includes('/items/') && sanitizedId) {
      // Breadcrumb for product detail
      return (
        <nav>
          <Link className='linkDesign' to="/">Home</Link> /
          <Link className='linkDesign' to={`/items?search=${sanitizedSearchQuery}`}>Resultado Pesquisa</Link> / 
          {sanitizedId}
        </nav>
      );
    } else if (location.pathname.includes('/items') && categories) {
      
      // Breadcrumb para resultado da pesquisa (exibe home e categorias)
      return (
        <nav>
          <Link className='linkDesign' to="/">Home</Link> / 
          {categories.map((category, index) => (
            <span key={index}>
              {DOMPurify.sanitize(category)}
              {index < categories.length - 1 && ' / '}
            </span>
          ))}
        </nav>
      );
    } else {

      // Breadcrumb padrão (apenas Home)
      return (
        <nav>
          <Link className='linkDesign' to="/">Home</Link>
        </nav>
      );
    }
  };

  return <div className="breadcrumb">{generateBreadcrumbs()}</div>;
};

export default Breadcrumb;
