import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Details from './pages/details/detail'
import Home from './pages/home/home'
import Login from './pages/login/login'
import Register from './pages/register/register'
import Vehicle from './pages/vehicles/vehicle'
import AllVehicle from './pages/vehicles/viewAll'
import Search from './pages/search/search'
import SortLocation from './pages/sortLocation/sortlocation'
import Category from './pages/sortType/sorttype'

function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/vehi/" element={<Vehicle />} />
        <Route exact path="/vehi/:category" element={<AllVehicle />} />
        <Route exact path="/detail/:name" element={<Details />} />
        <Route exact path="/search/:name" element={<Search />} />
        <Route exact path="/location/:location" element={<SortLocation />} />
        <Route exact path="/type/:type" element={<Category />} />
      </Routes>
    </BrowserRouter>
  )
}

export default router
