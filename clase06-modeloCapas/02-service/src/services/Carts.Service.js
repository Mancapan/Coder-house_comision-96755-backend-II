

export class CartsService{
    #cartDAO
    #productDAO

    constructor(cartDAO, productDAO){
        this.#cartDAO=cartDAO
        this.#productDAO=productDAO
    }

    async getCarts(id){
        return await this.#cartDAO.getAll()
    }


    async getCartById(id){
        return await this.#cartDAO.getOneBy(id)
    }

    async createCart(){
        return await this.#cartDAO.create()
    }

    async addProductToCart(idCart, idProduct){
        let cart=await this.#cartDAO.getOneBy({_id:idCart})
        if(!cart) throw new Error(`No existen carts con id ${idCart}`)

        let product=await this.#productDAO.getOneBy({_id: idProduct})
        if(!product) throw new Error(`No existen carts con id ${idProduct}`)

        // resto validaciones pertinentes, fomat data, etc... procesamiento info...

        cart.products.push(product)
        return await this.#cartDAO.update(idCart, cart)
    }


}