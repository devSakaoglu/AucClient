import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Auction from './Pages/Auction';
import AuctionDetail from './Pages/AuctionDetail';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory category="men" banner="/path/to/mens-banner.jpg" />} />
          <Route path='/womens' element={<ShopCategory category="women" banner="/path/to/womens-banner.jpg" />} />
          <Route path='/kids' element={<ShopCategory category="kid" banner="/path/to/kids-banner.jpg" />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/auction' element={<Auction />} />
          <Route path='/auction/:productId' element={<AuctionDetail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
