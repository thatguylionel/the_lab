package de.hdi.order_kotlin_service.service

import de.hdi.product_producer_service.CreateProductRequest
import de.hdi.product_producer_service.ListProductsRequest
import de.hdi.product_producer_service.ProductRequest
import de.hdi.product_producer_service.ProductResponse
import de.hdi.product_producer_service.ProductServiceGrpc
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class ProductService(private val productServiceStub: ProductServiceGrpc.ProductServiceBlockingStub) {

    private val logger = LoggerFactory.getLogger(ProductService::class.java)

    fun getProduct(productId: Int): ProductResponse? {
        return try {
            val request = ProductRequest.newBuilder().setProductId(productId).build()
            productServiceStub.getProduct(request)
        } catch (e: Exception) {
            logger.error("Error fetching product with ID: {}", productId, e)
            null
        }
    }

    fun listProducts(): List<ProductResponse> {
        return try {
            val request = ListProductsRequest.newBuilder().build()
            val response = productServiceStub.listProducts(request)
            val productList = mutableListOf<ProductResponse>()
            response.productsList.forEach { productList.add(it) }
            productList
        } catch (e: Exception) {
            logger.error("Error fetching all products via gRPC", e)
            logger.debug("Stack trace: ", e)
            emptyList()
        }
    }

    fun createProduct(name: String, description: String, price: Double): ProductResponse? {
        return try {
            val request = CreateProductRequest.newBuilder()
                .setName(name)
                .setDescription(description)
                .setPrice(price)
                .build()
            productServiceStub.createProduct(request)
        } catch (e: Exception) {
            logger.error("Error creating product: {}", name, e)
            null
        }
    }
}