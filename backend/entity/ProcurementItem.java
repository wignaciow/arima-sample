package backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "procurement_item")
public class ProcurementItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;

    private Double quantity;

    private BigDecimal unitPrice;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private ProcurementOrder order;

    public ProcurementItem() {
    }

    // GETTERS & SETTERS
    public Long getId() {
        return id;
    }

    public String getProductName() {
        return productName;
    }

    public Double getQuantity() {
        return quantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public ProcurementOrder getOrder() {
        return order;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public void setOrder(ProcurementOrder order) {
        this.order = order;
    }
}
