package de.hdi.product_consumer_service.repository;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import de.hdi.product_consumer_service.model.Order;
import de.hdi.product_consumer_service.model.OrderItem;

@Repository
public class OrderRepository {
    private final Map<Integer, Order> orders = new ConcurrentHashMap<>();
    private final AtomicInteger orderIdGenerator = new AtomicInteger(1);
    private final AtomicInteger orderItemIdGenerator = new AtomicInteger(1);

    public List<Order> findAll() {
        return new ArrayList<>(orders.values());
    }

    public Optional<Order> findById(Integer id) {
        return Optional.ofNullable(orders.get(id));
    }

    public Order createOrder(Order order) {
        int id = orderIdGenerator.getAndIncrement();
        order.setId(id);

        // Generate IDs for order items
        if (order.getItems() != null) {
            order.getItems().forEach(item -> {
                if (item.getId() == null) {
                    item.setId(orderItemIdGenerator.getAndIncrement());
                }
            });
        }

        // Calculate total amount
        double total = order.getItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
        order.setTotalAmount(total);

        orders.put(id, order);
        return order;
    }

    public Optional<Order> updateOrder(Integer id, Order order) {
        if (orders.containsKey(id)) {
            order.setId(id);

            // Process order items
            if (order.getItems() != null) {
                order.getItems().forEach(item -> {
                    if (item.getId() == null) {
                        item.setId(orderItemIdGenerator.getAndIncrement());
                    }
                });
            }

            // Calculate total amount
            double total = order.getItems().stream()
                    .mapToDouble(item -> item.getPrice() * item.getQuantity())
                    .sum();
            order.setTotalAmount(total);

            orders.put(id, order);
            return Optional.of(order);
        }
        return Optional.empty();
    }

    public boolean deleteOrder(Integer id) {
        return orders.remove(id) != null;
    }

    public Optional<Order> addItemToOrder(Integer orderId, OrderItem item) {
        return findById(orderId).map(order -> {
            item.setId(orderItemIdGenerator.getAndIncrement());

            if (order.getItems() == null) {
                order.setItems(new ArrayList<>());
            }
            return order;
        });
    }

    public Optional<Order> removeItemFromOrder(Integer orderId, Integer itemId) {
        return findById(orderId).map(order -> {
            if (order.getItems() != null) {
                order.getItems().removeIf(item -> item.getId().equals(itemId));

                // Recalculate total amount
                double total = order.getItems().stream()
                        .mapToDouble(i -> i.getPrice() * i.getQuantity())
                        .sum();
                order.setTotalAmount(total);

                orders.put(orderId, order);
            }
            return order;
        });
    }
}

