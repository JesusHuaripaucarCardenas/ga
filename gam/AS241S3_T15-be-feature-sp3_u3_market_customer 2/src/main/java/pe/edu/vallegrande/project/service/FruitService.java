package pe.edu.vallegrande.project.service;

import pe.edu.vallegrande.project.model.Fruit;
import java.util.List;
import java.util.Optional;

public interface FruitService {
    List<Fruit> findAll();
    Optional<Fruit> findById(Long id);
    Fruit save(Fruit fruit);
    Fruit update(Fruit fruit);
    void delete(Fruit fruit);
}
