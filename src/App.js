import React,{useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './components/Search/Search';
import ListProducts from './components/ListProducts/ListProducts';
import ItemDetail from './components/ItemDetail/ItemDetail';

function App() {const [products, setProducts] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search setProducts={setProducts} />} />
        <Route path="/items" element={<ListProducts setProducts={setProducts}  products={products} />} />
        <Route path="/items/:id" element={<ItemDetail  setProducts={setProducts}/>}/>
        {/* Otros componentes y rutas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;