package de.hdi.order_kotlin_service.web

import de.hdi.order_kotlin_service.model.OrderRequest
import de.hdi.order_kotlin_service.model.OrderResponse
import de.hdi.order_kotlin_service.model.OrderStatus
import de.hdi.order_kotlin_service.service.OrderService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime

data class OrderResponseDTO(
    val id: String,
    val productId: Int,
    val productName: String,
    val quantity: Int,
    val totalPrice: Double,
    val customerEmail: String,
    val createdAt: LocalDateTime,
    val status: OrderStatus
)

@RestController
@RequestMapping("/api/orders")
class OrderController(private val orderService: OrderService) {

    @PostMapping
    fun createOrder(@RequestBody orderRequest: OrderRequest): ResponseEntity<OrderResponseDTO> {
        val response = orderService.createOrder(orderRequest)
        return if (response != null) {
            ResponseEntity.status(HttpStatus.CREATED).body(
                responseBody(response)
            )
        } else {
            ResponseEntity.badRequest().build()
        }
    }

    @GetMapping("/{orderId}")
    fun getOrder(@PathVariable orderId: String): ResponseEntity<OrderResponseDTO> {
        val response = orderService.getOrder(orderId)
        return if (response != null) {
            ResponseEntity.ok(responseBody(response))
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping
    fun getAllOrders(): ResponseEntity<List<OrderResponseDTO>> {
        val orders = orderService.getAllOrders()
        val orderDTOs = orders.map {
            responseDto(it)
        }
        return ResponseEntity.ok(orderDTOs)
    }

    private fun responseDto(it: OrderResponse) = responseBody(it)

    @PatchMapping("/{orderId}/status")
    fun updateOrderStatus(
        @PathVariable orderId: String,
        @RequestParam status: OrderStatus
    ): ResponseEntity<OrderResponseDTO> {
        val response = orderService.updateOrderStatus(orderId, status)
        return if (response != null) {
            ResponseEntity.ok(responseBody(response))
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/{orderId}")
    fun deleteOrder(@PathVariable orderId: String): ResponseEntity<Void> {
        val deleted = orderService.deleteOrder(orderId)
        return if (deleted) {
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }

    private fun responseBody(response: OrderResponse) = OrderResponseDTO(
        id = response.id,
        productId = response.productId,
        productName = response.productName,
        quantity = response.quantity,
        totalPrice = response.totalPrice,
        customerEmail = response.customerEmail,
        createdAt = response.createdAt,
        status = response.status
    )
}