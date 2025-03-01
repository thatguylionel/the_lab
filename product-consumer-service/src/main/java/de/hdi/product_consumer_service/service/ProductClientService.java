package de.hdi.product_consumer_service.service;

import de.hdi.product_consumer_service.model.Product;
import de.hdi.product_producer_service.CreateProductRequest;
import de.hdi.product_producer_service.ListProductsRequest;
import de.hdi.product_producer_service.ListProductsResponse;
import de.hdi.product_producer_service.ProductRequest;
import de.hdi.product_producer_service.ProductResponse;
import de.hdi.product_producer_service.ProductServiceGrpc;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductClientService {

    private final ProductServiceGrpc.ProductServiceBlockingStub productServiceBlockingStub;

    public Product getProduct(Integer productId) {
        ProductRequest request = ProductRequest.newBuilder()
                .setProductId(productId)
                .build();

        ProductResponse response = productServiceBlockingStub.getProduct(request);

        return mapToProduct(response);
    }

    public List<Product> getAllProducts() {
        ListProductsRequest request = ListProductsRequest.newBuilder().build();

        ListProductsResponse response = productServiceBlockingStub.listProducts(request);

        return response.getProductsList().stream()
                .map(this::mapToProduct)
                .collect(Collectors.toList());
    }

    public Product createProduct(String name, String description, Double price) {
        CreateProductRequest request = CreateProductRequest.newBuilder()
                .setName(name)
                .setDescription(description)
                .setPrice(price)
                .build();

        ProductResponse response = productServiceBlockingStub.createProduct(request);

        return mapToProduct(response);
    }

    private Product mapToProduct(ProductResponse response) {
        return Product.builder()
                .id(response.getProductId())
                .name(response.getName())
                .description(response.getDescription())
                .price(response.getPrice())
                .build();
    }
}
