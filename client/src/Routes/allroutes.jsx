
import {Routes, Route} from "react-router-dom";
import { Product } from "../Components/productlist/product";
import {Login} from "../Components/login/login"
import {Signup} from "../Components/signup/signup";
import { Navbar } from "../Components/navbar/navbar";
 


export const AllRoutes = () => {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Signup />} > </Route>
          <Route path="/register" element={<Login />}> </Route>
          <Route exact path="/profile" element={<Product />} />
        </Routes>
      </>
    )
  }