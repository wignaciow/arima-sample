package backend.service;

import backend.entity.ProcurementItem;
import backend.entity.ProcurementOrder;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

public class ProcurementService {

    private final List<ProcurementOrder> orders = new ArrayList<>();

    public List<ProcurementOrder> findAll() {
        return orders;
    }

    public ProcurementOrder findById(Long id) {
        return orders.stream()
                .filter(order -> order.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Order not found with id: " + id));
    }

    public ProcurementOrder create(ProcurementOrder order) {
        if (order.getRequestNumber() == null || order.getRequestNumber().isEmpty()) {
            throw new IllegalArgumentException("Request number is required");
        }

        order.setId((long) (orders.size() + 1));
        order.setOrderDate(OffsetDateTime.now());
        order.setStatus("PENDING");

        BigDecimal total = BigDecimal.ZERO;

        if (order.getItems() != null) {
            for (ProcurementItem item : order.getItems()) {

                if (item.getUnitPrice() == null || item.getQuantity() == null) {
                    continue;
                }

                BigDecimal itemTotal = item.getUnitPrice()
                        .multiply(BigDecimal.valueOf(item.getQuantity()));
                total = total.add(itemTotal);
                item.setOrder(order);
            }
        }

        order.setTotalAmount(total);
        orders.add(order);

        return order;
    }

    public ProcurementOrder update(Long id, ProcurementOrder updatedOrder) {

        ProcurementOrder existing = findById(id);

        existing.setSupplierName(updatedOrder.getSupplierName());
        existing.setStatus(updatedOrder.getStatus());

        BigDecimal total = BigDecimal.ZERO;

        List<ProcurementItem> updatedItems = new ArrayList<>();

        if (updatedOrder.getItems() != null) {
            for (ProcurementItem item : updatedOrder.getItems()) {

                if (item.getUnitPrice() == null || item.getQuantity() == null) {
                    continue;
                }

                BigDecimal itemTotal = item.getUnitPrice()
                        .multiply(BigDecimal.valueOf(item.getQuantity()));

                total = total.add(itemTotal);

                item.setOrder(existing);

                updatedItems.add(item);
            }
        }

        existing.setItems(updatedItems);
        existing.setTotalAmount(total);

        return existing;
    }

    public void delete(Long id) {
        orders.removeIf(order -> order.getId().equals(id));
    }

}