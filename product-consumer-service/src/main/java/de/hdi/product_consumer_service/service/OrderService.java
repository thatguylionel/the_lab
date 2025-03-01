package de.hdi.product_consumer_service.service;

import de.hdi.product_consumer_service.model.Order;
import de.hdi.product_consumer_service.model.OrderItem;
import de.hdi.product_consumer_service.model.Product;
import de.hdi.product_consumer_service.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductClientService productClientService;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Integer id) {
        return orderRepository.findById(id);
    }

    public Order createOrder(Order order) {
        // For each item in the order, fetch product details from the product service
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                Product product = productClientService.getProduct(item.getProductId());
                // Set the price from the product service
                item.setPrice(product.getPrice());
                // Store product details for reference
                item.setProduct(product);
            }
        }

        return orderRepository.createOrder(order);
    }

    public Optional<Order> updateOrder(Integer id, Order order) {
        // For each item in the order, fetch product details from the product service
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                Product product = productClientService.getProduct(item.getProductId());
                // Set the price from the product service
                item.setPrice(product.getPrice());
                // Store product details for reference
                item.setProduct(product);
            }
        }

        return orderRepository.updateOrder(id, order);
    }

    public boolean deleteOrder(Integer id) {
        return orderRepository.deleteOrder(id);
    }

    public Optional<Order> addItemToOrder(Integer orderId, OrderItem item) {
        // Fetch product details from the product service
        Product product = productClientService.getProduct(item.getProductId());
        // Set the price from the product service
        item.setPrice(product.getPrice());
        // Store product details for reference
        item.setProduct(product);

        return orderRepository.addItemToOrder(orderId, item);
    }

    public Optional<Order> removeItemFromOrder(Integer orderId, Integer itemId) {
        return orderRepository.removeItemFromOrder(orderId, itemId);
    }
}
