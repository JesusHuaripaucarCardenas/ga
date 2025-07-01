package pe.edu.vallegrande.project.rest;

import pe.edu.vallegrande.project.model.Sale;
import pe.edu.vallegrande.project.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/api/sale")
public class SaleRest {

    private final SaleService service;

    @Autowired
    public SaleRest(SaleService service) {
        this.service = service;
    }

    @GetMapping
    public List<Sale> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sale> findById(@PathVariable Integer id) {
        Optional<Sale> sale = service.findById(id);
        return sale
            .map(s -> new ResponseEntity<>(s, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Sale> save(@RequestBody Sale sale) {
        Sale saved = service.save(sale);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Sale> update(@RequestBody Sale sale) {
        Sale updated = service.update(sale);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (service.findById(id).isPresent()) {
            service.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
