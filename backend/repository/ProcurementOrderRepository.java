package backend.repository;

import backend.entity.ProcurementOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProcurementOrderRepository extends JpaRepository<ProcurementOrder, Long> {

    Optional<ProcurementOrder> findByRequestNumber(String requestNumber);

    @Query("""
            SELECT po
            FROM ProcurementOrder po
            WHERE (:status IS NULL OR po.status = :status)
              AND (:supplierName IS NULL OR po.supplierName LIKE %:supplierName%)
            """)
    Page<ProcurementOrder> findByFilters(String status, String supplierName, Pageable pageable);
}
