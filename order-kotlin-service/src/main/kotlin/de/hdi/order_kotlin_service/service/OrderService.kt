package de.hdi.order_kotlin_service.service

import de.hdi.order_kotlin_service.model.Order
import de.hdi.order_kotlin_service.model.OrderRequest
import de.hdi.order_kotlin_service.model.OrderResponse
import de.hdi.order_kotlin_service.model.OrderStatus
import de.hdi.order_kotlin_service.repository.OrderRepository
import de.hdi.product_producer_service.ProductResponse
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

private const val PRODUCT_NOT_FOUND = "Product with ID {} not found for order {}"

@Service
class OrderService(
    private val productService: ProductService,
    private val orderRepository: OrderRepository
) {

    private val logger = LoggerFactory.getLogger(OrderService::class.java)

    fun createOrder(orderRequest: OrderRequest): OrderResponse? {
        // Fetch product details from product service
        val product = productService.getProduct(orderRequest.productId)
            ?: return null.also {
                logger.error("Failed to create order: Product with ID {} not found", orderRequest.productId)
            }

        val totalPrice = product.price * orderRequest.quantity

        val order = Order(
            productId = orderRequest.productId,
            quantity = orderRequest.quantity,
            totalPrice = totalPrice,
            customerEmail = orderRequest.customerEmail
        )

        val savedOrder = orderRepository.save(order)
        return orderResponse(savedOrder, product)
    }

    fun getOrder(orderId: String): OrderResponse? {
        val order = orderRepository.findById(orderId) ?: return null.also {
            logger.error("Order with ID {} not found", orderId)
        }

        val product = productService.getProduct(order.productId)
            ?: return null.also {
                logger.error(PRODUCT_NOT_FOUND, order.productId, orderId)
            }

        return orderResponse(order, product)
    }

    fun getAllOrders(): List<OrderResponse> {
        val productIds = orderRepository.findAll().map { it.productId }.distinct()
        val products = productIds.mapNotNull { productId ->
            productService.getProduct(productId)?.let { productId to it }
        }.toMap()

        return orderRepository.findAll().mapNotNull { order ->
            val product = products[order.productId] ?: return@mapNotNull null

            orderResponse(order, product)
        }
    }

    fun updateOrderStatus(orderId: String, status: OrderStatus): OrderResponse? {
        val updatedOrder = orderRepository.update(orderId, status) ?: return null.also {
            logger.error("Cannot update status: Order with ID {} not found", orderId)
        }
        val product = productService.getProduct(updatedOrder.productId)
            ?: return null.also {
                logger.error(PRODUCT_NOT_FOUND, updatedOrder.productId, orderId)
            }
        return orderResponse(updatedOrder, product)
    }

    fun deleteOrder(orderId: String): Boolean {
        return if (orderRepository.delete(orderId)) {
            true
        } else {
            false
        }
    }

    private fun orderResponse(order: Order, product: ProductResponse) = OrderResponse(
        id = order.id,
        productId = order.productId,
        productName = product.name,
        quantity = order.quantity,
        totalPrice = order.totalPrice,
        customerEmail = order.customerEmail,
        createdAt = order.createdAt,
        status = order.status
    )
}