package backend.controller;

import backend.entity.ProcurementOrder;
import backend.service.ProcurementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/procurement-orders")
public class ProcurementController {

    private final ProcurementService procurementService;

    public ProcurementController(ProcurementService procurementService) {
        this.procurementService = procurementService;
    }

    @GetMapping
    public List<ProcurementOrder> findAll() {
        return procurementService.findAll();
    }

    @GetMapping("/{id}")
    public ProcurementOrder findById(@PathVariable Long id) {
        return procurementService.findById(id);
    }

    @PostMapping
    public ProcurementOrder create(@RequestBody ProcurementOrder order) {
        return procurementService.create(order);
    }

    @PutMapping("/{id}")
    public ProcurementOrder update(@PathVariable Long id, @RequestBody ProcurementOrder order) {
        return procurementService.update(id, order);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        procurementService.delete(id);
    }
}