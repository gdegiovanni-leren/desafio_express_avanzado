import express from 'express'
import ProductManager from './src/ProductManager.js'

const app = express()


const filepath = './database/products.json'


app.get('/', ( req, res) => {
res.send('Ruta no encontrada, las rutas permitidas son /products y /products/:pid ')
})

app.get('/products', async ( req, res) => {

    const PM = new ProductManager(filepath)

    res.send(await PM.getProducts(req.query?.limit))

})

app.get('/products/:pid', async (req,res) => {

    const { pid } = req.params

    const PM = new ProductManager(filepath)

    res.send(await PM.getProductById(pid))
})


app.listen(8080, () => {
    console.log('Listen on 8080')
})
