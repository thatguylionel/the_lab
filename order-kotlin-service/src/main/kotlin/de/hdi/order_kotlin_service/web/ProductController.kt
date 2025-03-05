package de.hdi.order_kotlin_service.web

import de.hdi.order_kotlin_service.service.ProductService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

data class CreateProductDTO(
    val name: String,
    val description: String,
    val price: Double
)

data class ProductDTO(
    val productId: Int,
    val name: String,
    val description: String,
    val price: Double
)

@RestController
@RequestMapping("/api/products")
class ProductController(private val productService: ProductService) {

    @GetMapping("/{productId}")
    fun getProduct(@PathVariable productId: Int): ResponseEntity<ProductDTO> {
        val product = productService.getProduct(productId)
        return if (product != null) {
            ResponseEntity.ok(ProductDTO(
                productId = product.productId,
                name = product.name,
                description = product.description,
                price = product.price
            ))
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping
    fun getAllProducts(): ResponseEntity<List<ProductDTO>> {
        val products = productService.listProducts()
        val productDTOs = products.map {
            ProductDTO(
                productId = it.productId,
                name = it.name,
                description = it.description,
                price = it.price
            )
        }
        return ResponseEntity.ok(productDTOs)
    }

    @PostMapping
    fun createProduct(@RequestBody request: CreateProductDTO): ResponseEntity<ProductDTO> {
        val product = productService.createProduct(
            name = request.name,
            description = request.description,
            price = request.price
        )

        return if (product != null) {
            ResponseEntity.status(HttpStatus.CREATED).body(ProductDTO(
                productId = product.productId,
                name = product.name,
                description = product.description,
                price = product.price
            ))
        } else {
            ResponseEntity.badRequest().build()
        }
    }
}