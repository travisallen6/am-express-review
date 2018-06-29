module.exports = {
    getAllProducts: (req, res) => {
        req.app.get('db').getAllProducts()
        .then( products => res.send(products))
        .catch( err => {
            console.log(err)
            res.send(err)
        })
    },

    addProduct: (req, res) => {
        const { name, price } = req.body;
        req.app.get('db').addProduct([name,price])
        .then( products => res.status(201).send(products))
        .catch( err => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    
    updateProduct: (req, res) => {
        const { name, price } = req.body
        const { id } = req.params
        req.app.get('db').updateProduct([id, name, price])
        .then( products => res.send(products))
        .catch( err => console.log(err))
    },

    deleteProduct: (req, res) => {
        const { id } = req.params
        req.app.get('db').deleteProduct([id])
        .then( products => res.send(products))
        .catch( err => res.send(err))
    }
}