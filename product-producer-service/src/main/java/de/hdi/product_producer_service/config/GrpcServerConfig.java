package de.hdi.product_producer_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.hdi.product_producer_service.grpc.ProductGrpcService;
import io.grpc.Server;
import io.grpc.ServerBuilder;

import java.io.IOException;

@Configuration
public class GrpcServerConfig {

    private static final Logger logger = LoggerFactory.getLogger(GrpcServerConfig.class);

    private final ProductGrpcService productGrpcService;

    public GrpcServerConfig(ProductGrpcService productGrpcService) {
        this.productGrpcService = productGrpcService;
    }

    @Bean
    public Server grpcServer() throws IOException {
        int port = 9090;
        Server server = ServerBuilder.forPort(port)
                .addService(productGrpcService)
                .build();

        server.start();
        logger.info("gRPC server started, listening on port {}", port);

        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            logger.info("Shutting down gRPC server");
            server.shutdown();
        }));

        return server;
    }
}
