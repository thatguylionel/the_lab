package de.hdi.order_kotlin_service.repository

import de.hdi.order_kotlin_service.model.Order
import de.hdi.order_kotlin_service.model.OrderStatus
import org.springframework.stereotype.Repository
import java.util.concurrent.ConcurrentHashMap

@Repository
class OrderRepository {
    private val orders = ConcurrentHashMap<String, Order>()

    fun save(order: Order): Order {
        orders[order.id] = order
        return order
    }

    fun findById(id: String): Order? = orders[id]

    fun findAll(): List<Order> = orders.values.toList()

    fun update(id: String, status: OrderStatus): Order? {
        val order = orders[id] ?: return null
        val updatedOrder = order.copy(status = status)
        orders[id] = updatedOrder
        return updatedOrder
    }

    fun delete(id: String): Boolean = orders.remove(id) != null
}