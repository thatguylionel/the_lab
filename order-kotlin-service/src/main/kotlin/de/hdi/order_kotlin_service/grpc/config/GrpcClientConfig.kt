package de.hdi.order_kotlin_service.config

import de.hdi.product_producer_service.ProductServiceGrpc
import io.grpc.ManagedChannel
import io.grpc.ManagedChannelBuilder
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class GrpcClientConfig {

    private val logger = LoggerFactory.getLogger(GrpcClientConfig::class.java)

    @Value("\${spring.grpc.client.product-producer.address:localhost:9090}")
    private lateinit var productServiceAddress: String

    @Bean
    fun productServiceChannel(): ManagedChannel {
        val host: String
        val port: Int
        if (productServiceAddress.contains(":")) {
            val parts = productServiceAddress.split(":")
            host = parts[0]
            port = parts[1].toInt()
        } else {
            host = productServiceAddress
            port = 9090 // Default gRPC port
        }

        System.setProperty("io.netty.transport.noNative", "true")
        System.setProperty("io.grpc.ChannelImpl.disableDetectingTransport", "true")

        return ManagedChannelBuilder.forAddress(host, port)
            .usePlaintext()
            .build()
    }

    @Bean
    fun productServiceStub(productServiceChannel: ManagedChannel): ProductServiceGrpc.ProductServiceBlockingStub {
        logger.info("Creating ProductServiceBlockingStub")
        return ProductServiceGrpc.newBlockingStub(productServiceChannel)
    }
}