package pe.edu.vallegrande.project.repository;

import pe.edu.vallegrande.project.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Integer> {
}
