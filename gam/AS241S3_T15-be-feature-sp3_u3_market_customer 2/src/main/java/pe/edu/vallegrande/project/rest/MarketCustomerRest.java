package pe.edu.vallegrande.project.rest;

import pe.edu.vallegrande.project.model.MarketCustomer;
import pe.edu.vallegrande.project.service.MarketCustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*") // Permite solicitudes desde cualquier origen
@RestController
@RequestMapping("/v1/api/marketcustomer")
public class MarketCustomerRest {

    private final MarketCustomerService marketCustomerService;

    @Autowired
    public MarketCustomerRest(MarketCustomerService marketCustomerService) {
        this.marketCustomerService = marketCustomerService;
    }

    // Obtener todos los MarketCustomers
    @GetMapping
    public List<MarketCustomer> findAll() {
        return marketCustomerService.findAll();
    }

    // Obtener un MarketCustomer por ID
    @GetMapping("/{id}")
    public Optional<MarketCustomer> findById(@PathVariable Long id) {
        return marketCustomerService.findById(id);
    }

    // Crear un nuevo MarketCustomer
    @PostMapping // Ahora acepta POST en la ruta /v1/api/marketcustomer
    public ResponseEntity<MarketCustomer> save(@RequestBody MarketCustomer marketCustomer) {
        MarketCustomer savedMarketCustomer = marketCustomerService.save(marketCustomer);
        return new ResponseEntity<>(savedMarketCustomer, HttpStatus.CREATED);
    }

    @PutMapping // Elimina "/update" para que acepte PUT en la raíz
    public MarketCustomer update(@RequestBody MarketCustomer marketCustomer) {
        return marketCustomerService.update(marketCustomer);
    }

    // Eliminar un MarketCustomer por ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        Optional<MarketCustomer> marketCustomerOptional = marketCustomerService.findById(id);
        if (marketCustomerOptional.isPresent()) {
            marketCustomerService.delete(marketCustomerOptional.get());
            return ResponseEntity.ok("MarketCustomer desactivado con éxito.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("MarketCustomer no encontrado.");
        }
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restore(@PathVariable Long id) {
        Optional<MarketCustomer> optional = marketCustomerService.findById(id);
        if (optional.isPresent()) {
            marketCustomerService.restore(optional.get());
            return ResponseEntity.ok("MarketCustomer restaurado con éxito.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("MarketCustomer no encontrado.");
        }
    }

}