package de.hdi.product_producer_service.grpc;

import java.util.List;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.grpc.server.service.GrpcService;

import de.hdi.product_producer_service.CreateProductRequest;
import de.hdi.product_producer_service.ListProductsRequest;
import de.hdi.product_producer_service.ListProductsResponse;
import de.hdi.product_producer_service.ProductRequest;
import de.hdi.product_producer_service.ProductResponse;
import de.hdi.product_producer_service.ProductServiceGrpc;
import de.hdi.product_producer_service.model.Product;
import de.hdi.product_producer_service.repository.ProductRepository;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;

@GrpcService
@RequiredArgsConstructor
public class ProductGrpcService extends ProductServiceGrpc.ProductServiceImplBase {

    private final ProductRepository productRepository;

    private static final Logger logger = LoggerFactory.getLogger(ProductGrpcService.class);

    @PostConstruct
    public void init() {
        logger.info("gRPC Product Service initialized and ready to accept requests on port 9090");
    }

    @Override
    public void getProduct(ProductRequest request, StreamObserver<ProductResponse> responseObserver) {
        Optional<Product> productOpt = productRepository.findById(request.getProductId());

        if (productOpt.isPresent()) {
            Product product = productOpt.get();
            ProductResponse response = ProductResponse.newBuilder()
                    .setProductId(product.getId())
                    .setName(product.getName())
                    .setDescription(product.getDescription())
                    .setPrice(product.getPrice())
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();
        } else {
            responseObserver.onError(new RuntimeException("Product not found with ID: " + request.getProductId()));
        }
    }

    @Override
    public void listProducts(ListProductsRequest request, StreamObserver<ListProductsResponse> responseObserver) {
        List<Product> products = productRepository.findAll();

        ListProductsResponse.Builder responseBuilder = ListProductsResponse.newBuilder();

        for (Product product : products) {
            ProductResponse productResponse = ProductResponse.newBuilder()
                    .setProductId(product.getId())
                    .setName(product.getName())
                    .setDescription(product.getDescription())
                    .setPrice(product.getPrice())
                    .build();

            responseBuilder.addProducts(productResponse);
        }

        responseObserver.onNext(responseBuilder.build());
        responseObserver.onCompleted();
    }

    @Override
    public void createProduct(CreateProductRequest request, StreamObserver<ProductResponse> responseObserver) {
        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .build();

        Product createdProduct = productRepository.createProduct(product);

        ProductResponse response = ProductResponse.newBuilder()
                .setProductId(createdProduct.getId())
                .setName(createdProduct.getName())
                .setDescription(createdProduct.getDescription())
                .setPrice(createdProduct.getPrice())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}