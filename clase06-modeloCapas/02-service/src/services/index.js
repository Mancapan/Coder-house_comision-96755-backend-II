import { CartsDAO } from "../dao/CartsDAO.js";
import { ProductsDAO } from "../dao/ProductsDAO.js";
import { CartsService } from "./Carts.Service.js";
import { ProductService } from "./Products.Service.js";


const productsDAO=new ProductsDAO()
export const productService=new ProductService(productsDAO)

const cartsDAO=new CartsDAO()
export const cartService=new CartsService(cartsDAO, productsDAO)