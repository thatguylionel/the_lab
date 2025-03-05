package de.hdi.order_kotlin_service.model

import java.time.LocalDateTime
import java.util.UUID

data class Order(
    val id: String = UUID.randomUUID().toString(),
    val productId: Int,
    val quantity: Int,
    val totalPrice: Double,
    val customerEmail: String,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val status: OrderStatus = OrderStatus.PENDING
)

enum class OrderStatus {
    PENDING, CONFIRMED // etc.
}

data class OrderRequest(
    val productId: Int,
    val quantity: Int,
    val customerEmail: String
)

data class OrderResponse(
    val id: String,
    val productId: Int,
    val productName: String,
    val quantity: Int,
    val totalPrice: Double,
    val customerEmail: String,
    val createdAt: LocalDateTime,
    val status: OrderStatus
)