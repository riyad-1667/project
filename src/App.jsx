import React from 'react'
import Dashboard from './pages/Dashboard'
import { BrowserRouter, Route, Routes,Outlet } from 'react-router-dom'
import NoPage from './pages/NoPage'
import Test from './pages/Test'
import CreateOrder from './pages/Sales/CreateOrder'
import ManageOrder from './pages/Sales/ManageOrder'
import About from './pages/Public/About'
import Products from './pages/Inventory/Products'
import CreateProduct from './pages/Inventory/CreateProduct'
import DetailProduct from './pages/Inventory/DetailProduct'
import EditProduct from './pages/Inventory/EditProduct'

import Sidebar from './layout/Sidebar'
import Topbar from './layout/Topbar'
import Footer from './layout/Footer'
import CreateStock from './pages/Stock/CreateStock'
import ManageStock from './pages/Stock/ManageStock'
import StockBalance from './pages/Stock/StockBalance'
import PurchaseInvoice from './pages/Purchase/PurchaseInvoice'
import ManagePurchaseInvoice from './pages/Purchase/ManagePurchaseInvoice'

const App = () => {
    return (
    <BrowserRouter>
      <Sidebar/>
      <div className="content">
      <Topbar />
      <Routes>         
           <Route path='' element={<Dashboard />} />  
           <Route index element={<Dashboard />} />
           <Route path="create-order" element={<CreateOrder desc="Description" />} />      
           <Route path="manage-order" element={<ManageOrder />} />  

           {/* Product */}
           <Route path='product' element={<Products />} /> 
           <Route path='product/create' element={<CreateProduct /> } /> 
           <Route path='product/detail' element={<DetailProduct /> } /> 
           <Route path='product/edit' element={<EditProduct /> } /> 
           

           <Route path="purchase-invoice" element={<PurchaseInvoice />} />      
           <Route path="manage-purchase-invoice" element={<ManagePurchaseInvoice />} />   
           <Route path="/stock/create" element={<CreateStock />} />   
           <Route path="/stock/manage" element={<ManageStock />} />   
           <Route path="/stock/balance" element={<StockBalance />} />   

           <Route path="*" element={<NoPage />} />
          
     </Routes>    
      <Outlet />
      <Footer />
      </div>             
    </BrowserRouter>
    )
}

export default App