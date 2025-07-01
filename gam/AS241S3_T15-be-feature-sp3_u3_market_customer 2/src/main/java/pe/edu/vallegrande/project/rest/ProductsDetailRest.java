package pe.edu.vallegrande.project.rest;

import pe.edu.vallegrande.project.model.ProductsDetail;
import pe.edu.vallegrande.project.service.ProductsDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/api/productsdetail")
public class ProductsDetailRest {

    private final ProductsDetailService service;

    @Autowired
    public ProductsDetailRest(ProductsDetailService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProductsDetail> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductsDetail> findById(@PathVariable Long id) {
        Optional<ProductsDetail> pd = service.findById(id);
        return pd.map(ResponseEntity::ok)
                 .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ProductsDetail> save(@RequestBody ProductsDetail pd) {
        ProductsDetail saved = service.save(pd);
        return ResponseEntity.status(201).body(saved);
    }

    @PutMapping
    public ProductsDetail update(@RequestBody ProductsDetail pd) {
        return service.update(pd);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
