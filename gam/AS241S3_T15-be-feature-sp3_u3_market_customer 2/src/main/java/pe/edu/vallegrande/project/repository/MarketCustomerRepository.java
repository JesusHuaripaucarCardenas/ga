package pe.edu.vallegrande.project.repository;

import pe.edu.vallegrande.project.model.MarketCustomer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarketCustomerRepository extends JpaRepository<MarketCustomer, Long> {
   
}