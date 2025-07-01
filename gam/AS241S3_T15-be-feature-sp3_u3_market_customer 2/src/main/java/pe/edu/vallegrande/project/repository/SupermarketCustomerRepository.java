package pe.edu.vallegrande.project.repository;

import pe.edu.vallegrande.project.model.SupermarketCustomer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupermarketCustomerRepository extends JpaRepository<SupermarketCustomer, Long> {
}
