class ProductManager  {
    #products
    #error
    constructor() {
        this.#products = []
        this.#error = undefined
        
    }
    
    getProducts = () => this.#products;

    getProductById = (id) => {
      const product = this.#products.find(element => element.id === id)
      if (!product) return 'Producto no encontrado'
      return product
    }

    #generateId = () => (this.#products.length === 0) ? 1 : this.#products[this.#products.length - 1].id + 1

    #validateProducts = (title, description, price, thumbnail, code, stock) => {
      if (!title, !description, !price, !thumbnail, !code, !stock) {
      this.#error = `[${title}] Error: faltan datos en el producto`
      } else {
        const found = this.#products.find(element => element.code === code)
        if (found) this.#error = `[${title}] Error: el codigo ya existe`
        else this.#error = undefined
      }
    }
    addProduct = (title, description, price, thumbnail, code, stock) => {
    this.#validateProducts(title, description, price, thumbnail, code, stock)
    if (this.#error === undefined) 
        this.#products.push ({id: this.#generateId(), title, description, price, thumbnail, code, stock }) 
    else 
      console.log(this.#error)
    }
}	

const productManager = new ProductManager();
productManager.addProduct('Escuadra', 'Escuadra de 30 cm', 123.45, 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png', 1, 123);
productManager.addProduct('Calculadora','Calculadora básica', 234.56, 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png', 2, 234);
productManager.addProduct('Globo Terráqueo', 'Globo terráqueo', 345.67, 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png', 3, 345);
productManager.addProduct('Paleta Pintura', 'Paleta de pintura', 456.78, 'https://cdn3.iconfinder.com/data/icons/education-209/64/paint-brush-painting-school-256.png', 4, 456);
productManager.addProduct('Regla', 'Regla de 20 cm', 567.89, 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png', 5, 567);
productManager.addProduct('Tijeras', 'Tijeras de punta roma', 678.90, 'https://cdn3.iconfinder.com/data/icons/education-209/64/scissors-cutting-tool-school-256.png', 6, 678);


console.log(productManager.getProducts());
console.log(productManager.getProductById(3));
console.log(productManager.getProductById(7));