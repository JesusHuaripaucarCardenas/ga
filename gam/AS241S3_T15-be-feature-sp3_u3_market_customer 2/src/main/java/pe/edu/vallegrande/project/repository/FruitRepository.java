package pe.edu.vallegrande.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.vallegrande.project.model.Fruit;

public interface FruitRepository extends JpaRepository<Fruit, Long> {
}
