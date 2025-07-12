import React, {useState, useEffect, useContext} from 'react'
import css from './Dashboard.module.css'
import { Link , Routes, Route} from 'react-router-dom'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import Home from './Home/Home'
import Orders from './Orders/Orders'
import Employees from './Employees/Employees'
import Customers from './Customers/Customers'
import Services from './Services/Services'
import NewOrder from './NewOrder/NewOrder'
import AddCustomer from './AddCustomer/AddCustomer'
import AddEmployee from './AddEmployee/AddEmployee'
import { Context } from '../../components/Context'
import Profile from './Profile/Profile'
import Setting from './Setting/Setting'
import NotFound from '../NotFound/NotFound'
function Dashboard() { 
  const [showSidebar, setShowSidebar] = useState(true)
  const {state, dispatch, toggleTheme} = useContext(Context)
  const theme = state.theme
  const user = 'Admin'
  useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);     
  return (
    <div className={css.dashboard}>
      <div className={`${css.pannel} ${!showSidebar && css.none} `}>
          <Sidebar/>
        </div>      
    
     <div className={css.body}>
      <Header value={[showSidebar,setShowSidebar]}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/services" element={<Services />} />
        <Route path="/new_order" element={<NewOrder />} />
        <Route path="/add_customer" element={<AddCustomer />} />
        <Route path="/add_employee" element={<AddEmployee />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
     </div>
    </div>
  )
}

export default Dashboard


