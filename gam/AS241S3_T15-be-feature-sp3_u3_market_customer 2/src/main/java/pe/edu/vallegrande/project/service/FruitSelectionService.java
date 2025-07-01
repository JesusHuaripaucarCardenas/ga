package pe.edu.vallegrande.project.service;

import pe.edu.vallegrande.project.model.FruitSelection;

import java.util.List;
import java.util.Optional;

public interface FruitSelectionService {
    List<FruitSelection> findAll();
    Optional<FruitSelection> findById(Long id);
    FruitSelection save(FruitSelection fruitSelection);
    FruitSelection update(FruitSelection fruitSelection);
    void deleteById(Long id);
}
