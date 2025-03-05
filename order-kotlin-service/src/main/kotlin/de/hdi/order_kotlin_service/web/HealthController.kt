package de.hdi.order_kotlin_service.web

import de.hdi.order_kotlin_service.service.ProductService
import io.grpc.StatusRuntimeException
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

data class HealthStatus(
    val status: String,
    val productServiceConnection: Boolean,
    val message: String? = null
)

@RestController
@RequestMapping("/api/health")
class HealthController(private val productService: ProductService) {

    @GetMapping
    fun checkHealth(): ResponseEntity<HealthStatus> {
        return try {
            val products = productService.listProducts()
            ResponseEntity.ok(HealthStatus(
                status = "UP",
                productServiceConnection = true,
                message = "Successfully connected to product service. Found ${products.size} products."
            ))
        } catch (e: StatusRuntimeException) {
            ResponseEntity.ok(HealthStatus(
                status = "PARTIAL",
                productServiceConnection = false,
                message = "Product service connection failed: ${e.status}"
            ))
        } catch (e: Exception) {
            ResponseEntity.ok(HealthStatus(
                status = "PARTIAL",
                productServiceConnection = false,
                message = "Product service connection failed: ${e.message}"
            ))
        }
    }
}