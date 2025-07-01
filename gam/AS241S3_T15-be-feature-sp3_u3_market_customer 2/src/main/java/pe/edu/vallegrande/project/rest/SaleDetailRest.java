package pe.edu.vallegrande.project.rest;

import pe.edu.vallegrande.project.model.SaleDetail;
import pe.edu.vallegrande.project.service.SaleDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/api/saledetail")
public class SaleDetailRest {

    private final SaleDetailService service;

    @Autowired
    public SaleDetailRest(SaleDetailService service) {
        this.service = service;
    }

    // Obtener todos los registros
    @GetMapping
    public List<SaleDetail> findAll() {
        return service.findAll();
    }

    // Obtener un registro por ID
    @GetMapping("/{id}")
    public ResponseEntity<SaleDetail> findById(@PathVariable Long id) {
        Optional<SaleDetail> opt = service.findById(id);
        return opt.map(ResponseEntity::ok)
                  .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Crear un nuevo registro
    @PostMapping
    public ResponseEntity<SaleDetail> save(@RequestBody SaleDetail saleDetail) {
        SaleDetail saved = service.save(saleDetail);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // Actualizar un registro existente
    @PutMapping
    public ResponseEntity<SaleDetail> update(@RequestBody SaleDetail saleDetail) {
        if (saleDetail.getId() == null || !service.findById(saleDetail.getId()).isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        SaleDetail updated = service.update(saleDetail);
        return ResponseEntity.ok(updated);
    }

    // Eliminar un registro por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        service.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
