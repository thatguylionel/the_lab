package de.hdi.order_kotlin_service.adapter

import de.hdi.order_kotlin_service.web.ProductDTO
import de.hdi.product_producer_service.ProductResponse

/**
 * Adapter class to convert between gRPC ProductResponse objects and our internal ProductDTO objects.
 * This helps avoid Jackson serialization issues with Protocol Buffer objects.
 */
object ProductDtoAdapter {

    fun toDto(response: ProductResponse): ProductDTO {
        return ProductDTO(
            productId = response.productId,
            name = response.name,
            description = response.description,
            price = response.price
        )
    }

    fun toDtoList(responses: List<ProductResponse>): List<ProductDTO> {
        return responses.map { toDto(it) }
    }
}