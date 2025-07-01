package pe.edu.vallegrande.project.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.vallegrande.project.model.Fruit;
import pe.edu.vallegrande.project.service.FruitService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/api/fruits")
public class FruitRest {

    private final FruitService fruitService;

    @Autowired
    public FruitRest(FruitService fruitService) {
        this.fruitService = fruitService;
    }

    @GetMapping
    public List<Fruit> findAll() {
        return fruitService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fruit> findById(@PathVariable Long id) {
        Optional<Fruit> fruit = fruitService.findById(id);
        return fruit.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Fruit> save(@RequestBody Fruit fruit) {
        Fruit saved = fruitService.save(fruit);
        return ResponseEntity.status(201).body(saved);
    }

    @PutMapping
    public Fruit update(@RequestBody Fruit fruit) {
        return fruitService.update(fruit);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        Optional<Fruit> fruit = fruitService.findById(id);
        if (fruit.isPresent()) {
            fruitService.delete(fruit.get());
            return ResponseEntity.ok("Fruta eliminada correctamente.");
        } else {
            return ResponseEntity.status(404).body("Fruta no encontrada.");
        }
    }
}
