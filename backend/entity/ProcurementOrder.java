package backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "procurement_order")
public class ProcurementOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String requestNumber;

    @Column(nullable = false)
    private String supplierName;

    @Column(nullable = false)
    private OffsetDateTime orderDate;

    @Column(precision = 15, scale = 2)
    private BigDecimal totalAmount;

    @Column(nullable = false)
    private String status;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<ProcurementItem> items = new ArrayList<>();

    public ProcurementOrder() {
    }

    public void addItem(ProcurementItem item) {
        items.add(item);
        item.setOrder(this);
    }

    // GETTERS & SETTERS
    public Long getId() {
        return id;
    }

    public String getRequestNumber() {
        return requestNumber;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public OffsetDateTime getOrderDate() {
        return orderDate;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public List<ProcurementItem> getItems() {
        return items;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setRequestNumber(String requestNumber) {
        this.requestNumber = requestNumber;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public void setOrderDate(OffsetDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setItems(List<ProcurementItem> items) {
        this.items = items;
    }
}