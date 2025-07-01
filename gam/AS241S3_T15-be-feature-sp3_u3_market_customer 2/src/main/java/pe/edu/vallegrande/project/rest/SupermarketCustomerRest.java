package pe.edu.vallegrande.project.rest;

import pe.edu.vallegrande.project.model.SupermarketCustomer;
import pe.edu.vallegrande.project.service.SupermarketCustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/api/supermarket-customer")
public class SupermarketCustomerRest {

    private final SupermarketCustomerService service;

    @Autowired
    public SupermarketCustomerRest(SupermarketCustomerService service) {
        this.service = service;
    }

    @GetMapping
    public List<SupermarketCustomer> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Optional<SupermarketCustomer> findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping("/save")
    public SupermarketCustomer save(@RequestBody SupermarketCustomer customer) {
        return service.save(customer);
    }

    @PutMapping("/update")
    public SupermarketCustomer update(@RequestBody SupermarketCustomer customer) {
        return service.update(customer);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<SupermarketCustomer> customer = service.findById(id);
        customer.ifPresent(service::delete);
        return ResponseEntity.ok("Cliente desactivado con éxito.");
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<?> restore(@PathVariable Long id) {
        Optional<SupermarketCustomer> customer = service.findById(id);
        if (customer.isPresent()) {
            service.restore(customer.get());
            return ResponseEntity.ok("Cliente restaurado con éxito.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
