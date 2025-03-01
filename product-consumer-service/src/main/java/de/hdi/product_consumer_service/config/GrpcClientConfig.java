package de.hdi.product_consumer_service.config;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import de.hdi.product_producer_service.ProductServiceGrpc;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;

@Configuration
public class GrpcClientConfig {

    @Value("${spring.grpc.client.product-producer.address}")
    private String productServiceAddress;

    @Bean
    public ManagedChannel productServiceChannel() {
        String[] parts = productServiceAddress.split(":");
        String host = parts[0];
        int port = 9090; // Default port

        if (parts.length > 1) {
            try {
                port = Integer.parseInt(parts[1]);
            } catch (NumberFormatException e) {
                // Use default port if parsing fails
            }
        }

        return ManagedChannelBuilder.forAddress(host, port)
                .usePlaintext()
                .keepAliveTime(30, TimeUnit.SECONDS)
                .build();
    }

    @Bean
    public ProductServiceGrpc.ProductServiceBlockingStub productServiceBlockingStub(ManagedChannel productServiceChannel) {
        return ProductServiceGrpc.newBlockingStub(productServiceChannel);
    }
}