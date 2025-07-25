import { useLocation , Route , Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import NotFound from './pages/NotFound/NotFound';
import Header from './components/Header/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import Services from './pages/Services/Services';
import Footer from './components/Footer/Footer';
import Protected from './components/Protected';
import MyOrder from './pages/MyOrder/MyOrder';
function Router() {
   const location = useLocation();
   const hideLayout = location.pathname.startsWith('/dashboard') || location.pathname === '/auth';
  return (
    <>
     {!hideLayout && <Header />}
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard/*" element={<Protected><Dashboard/></Protected>} />
        <Route path="/profile" element={<Protected><Profile/></Protected>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/order/:order_hash" element={<MyOrder />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  )
}

export default Router
