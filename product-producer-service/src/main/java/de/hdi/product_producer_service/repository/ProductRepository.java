package de.hdi.product_producer_service.repository;

import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

import de.hdi.product_producer_service.model.Product;

@Repository
public class ProductRepository {
    private final Map<Integer, Product> products = new ConcurrentHashMap<>();
    private final AtomicInteger idGenerator = new AtomicInteger(1);

    // Initialize with some sample data
    public ProductRepository() {
        createProduct(Product.builder().name("Laptop").description("High-performance laptop").price(1299.99).build());
        createProduct(Product.builder().name("Smartphone").description("Latest smartphone model").price(899.99).build());
        createProduct(Product.builder().name("Headphones").description("Noise-cancelling headphones").price(249.99).build());
    }

    public List<Product> findAll() {
        return new ArrayList<>(products.values());
    }

    public Optional<Product> findById(Integer id) {
        return Optional.ofNullable(products.get(id));
    }

    public Product createProduct(Product product) {
        int id = idGenerator.getAndIncrement();
        product.setId(id);
        products.put(id, product);
        return product;
    }

    public Optional<Product> updateProduct(Integer id, Product product) {
        if (products.containsKey(id)) {
            product.setId(id);
            products.put(id, product);
            return Optional.of(product);
        }
        return Optional.empty();
    }

    public boolean deleteProduct(Integer id) {
        return products.remove(id) != null;
    }
}
