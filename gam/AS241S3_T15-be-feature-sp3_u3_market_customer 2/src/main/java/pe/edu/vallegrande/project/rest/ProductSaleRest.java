package pe.edu.vallegrande.project.rest;

import pe.edu.vallegrande.project.model.ProductSale;
import pe.edu.vallegrande.project.service.ProductSaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/api/productsale")
public class ProductSaleRest {

    private final ProductSaleService productSaleService;

    @Autowired
    public ProductSaleRest(ProductSaleService productSaleService) {
        this.productSaleService = productSaleService;
    }

    @GetMapping
    public List<ProductSale> findAll() {
        return productSaleService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<ProductSale> findById(@PathVariable Integer id) {
        return productSaleService.findById(id);
    }

    @PostMapping
    public ResponseEntity<ProductSale> save(@RequestBody ProductSale productSale) {
        ProductSale saved = productSaleService.save(productSale);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping
    public ProductSale update(@RequestBody ProductSale productSale) {
        return productSaleService.update(productSale);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        Optional<ProductSale> opt = productSaleService.findById(id);
        if (opt.isPresent()) {
            productSaleService.delete(id);
            return ResponseEntity.ok("ProductSale eliminado con éxito.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("ProductSale no encontrado.");
        }
    }
}
