import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Vehicles from './pages/vehicles'
import TypeVehicle from './pages/vehicles/typeVehicle'
import AddVehicle from './pages/vehicles/addVehicle'
import Details from './pages/vehicles/details'
import Admin from './pages/admin'
import EditVehicle from './pages/vehicles/editVehicle'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/vehicles" element={<Vehicles />} />
        <Route exact path="/vehicles/:category" element={<TypeVehicle />} />
        <Route exact path="/vehicles/details/:id" element={<Details />} />
        <Route exact path="/vehicles/add" element={<AddVehicle />} />
        <Route exact path="/vehicles/edit/:id" element={<EditVehicle />} />
        <Route exact path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
