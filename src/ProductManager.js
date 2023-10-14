import fs from 'fs'

class ProductManager {

    constructor(filepath){
        this.filepath = filepath
        this.format = 'utf-8'
        //si no existe archivo, lo creo vacio
        if(!fs.existsSync(this.filepath)){
            fs.writeFileSync(this.filepath, '')
        }
    }

    getProductById = async (id) => {

        if(!fs.existsSync(this.filepath)){
           return 'ARCHIVO NO ENCONTRADO'
        }

        let products = await this.getProducts()


        const product = products.find((product) => product.id == id)

        return product ? product : `Producto no encontrado con Id ${id}`
    }

    getProducts = async (limit) => {

        if(!fs.existsSync(this.filepath)){
            console.log('ARCHIVO NO ENCONTRADO')
            return []
        }

        let products =  fs.readFileSync(this.filepath, this.format)

        if(products.length <= 0 ) return []

        products = JSON.parse(products)
        const productFilter = limit && limit > 0 ? products.slice(0,limit) : products

        return productFilter

    }

}

export default ProductManager