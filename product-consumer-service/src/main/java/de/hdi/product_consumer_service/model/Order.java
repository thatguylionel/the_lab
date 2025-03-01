package de.hdi.product_consumer_service.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    private Integer id;
    private String customerName;
    private String customerEmail;
    private String status;
    private java.util.List<OrderItem> items;
    private Double totalAmount;
}
