package pe.edu.vallegrande.project.rest;

import pe.edu.vallegrande.project.model.FruitSelection;
import pe.edu.vallegrande.project.service.FruitSelectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/api/fruitselection")
public class FruitSelectionRest {

    private final FruitSelectionService service;

    @Autowired
    public FruitSelectionRest(FruitSelectionService service) {
        this.service = service;
    }

    // Listar todas las selecciones
    @GetMapping
    public List<FruitSelection> findAll() {
        return service.findAll();
    }

    // Obtener una selección por ID
    @GetMapping("/{id}")
    public ResponseEntity<FruitSelection> findById(@PathVariable Long id) {
        Optional<FruitSelection> opt = service.findById(id);
        return opt
            .map(fs -> ResponseEntity.ok(fs))
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Crear nueva selección
    @PostMapping
    public ResponseEntity<FruitSelection> save(@RequestBody FruitSelection fs) {
        FruitSelection created = service.save(fs);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // Actualizar selección existente
    @PutMapping
    public ResponseEntity<FruitSelection> update(@RequestBody FruitSelection fs) {
        if (fs.getId() == null || !service.findById(fs.getId()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        FruitSelection updated = service.update(fs);
        return ResponseEntity.ok(updated);
    }

    // Eliminar selección por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        service.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
