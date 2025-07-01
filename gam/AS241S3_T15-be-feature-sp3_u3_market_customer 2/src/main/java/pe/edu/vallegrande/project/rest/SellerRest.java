package pe.edu.vallegrande.project.rest;

import pe.edu.vallegrande.project.model.Seller;
import pe.edu.vallegrande.project.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/api/seller")
public class SellerRest {

    private final SellerService sellerService;

    @Autowired
    public SellerRest(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    @GetMapping
    public List<Seller> findAll() {
        return sellerService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Seller> findById(@PathVariable Long id) {
        return sellerService.findById(id);
    }

    @PostMapping
    public ResponseEntity<Seller> save(@RequestBody Seller seller) {
        Seller saved = sellerService.save(seller);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping
    public Seller update(@RequestBody Seller seller) {
        return sellerService.update(seller);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        Optional<Seller> optional = sellerService.findById(id);
        if (optional.isPresent()) {
            sellerService.delete(optional.get());
            return ResponseEntity.ok("Vendedor desactivado con éxito.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Vendedor no encontrado.");
        }
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restore(@PathVariable Long id) {
        Optional<Seller> optional = sellerService.findById(id);
        if (optional.isPresent()) {
            sellerService.restore(optional.get());
            return ResponseEntity.ok("Vendedor restaurado con éxito.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Vendedor no encontrado.");
        }
    }
}
