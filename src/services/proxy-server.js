import express from 'express';
import axios from 'axios';
import helmet from 'helmet';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const app = express();
const PORT = 3001;

// Configuração do author
const author = {
  name: "Amanda",
  lastname: "de Lima"
};

// Configuração Helmet
app.use(helmet());

// Função para sanitizar entradas usando DOMPurify
const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Rota para /api/items?q=:query
app.get('/api/items', async (req, res) => {
  const query = purify.sanitize(req.query.q);

  try {
    const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
    const categories = response.data.filters.find(filter => filter.id === 'category')?.values[0].path_from_root.map(category => category.name) || [];
    const items = response.data.results.slice(0, 4).map(item => ({
      id: purify.sanitize(item.id),
      title: purify.sanitize(item.title),
      price: {
        currency: purify.sanitize(item.currency_id),
        amount: purify.sanitize(Math.floor(item.price)),
        decimals: purify.sanitize(Math.round((item.price % 1) * 100))
      },
      picture: purify.sanitize(item.thumbnail),
      condition: purify.sanitize(item.condition),
      free_shipping: purify.sanitize(item.shipping.free_shipping),
      available_quantity: purify.sanitize(item.available_quantity)
    }));

    res.json({
      author,
      categories: categories.map(category => purify.sanitize(category)),
      items
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// Rota para /api/items/:id
app.get('/api/items/:id', async (req, res) => {
  const id = purify.sanitize(req.params.id);

  try {
    const [itemResponse, descriptionResponse] = await Promise.all([
      axios.get(`https://api.mercadolibre.com/items/${id}`),
      axios.get(`https://api.mercadolibre.com/items/${id}/description`)
    ]);
    
    const itemData = itemResponse.data;
    const descriptionData = descriptionResponse.data;

    res.json({
      author,
      item: {
        id: purify.sanitize(itemData.id),
        title: purify.sanitize(itemData.title),
        price: {
          currency: purify.sanitize(itemData.currency_id),
          amount: purify.sanitize(Math.floor(itemData.price)),
          decimals: purify.sanitize(parseInt((itemData.price % 1).toFixed(2).substring(2)))
        },
        picture: purify.sanitize(itemData.pictures[0]?.url),
        condition: purify.sanitize(itemData.condition),
        seller_address: {
          country: {
            name: purify.sanitize(itemData.seller_address.country.name),
          }
        },
        description: purify.sanitize(descriptionData.plain_text)
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
