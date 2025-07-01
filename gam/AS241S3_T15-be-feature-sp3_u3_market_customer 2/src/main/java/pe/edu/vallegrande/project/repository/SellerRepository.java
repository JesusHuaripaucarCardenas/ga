package pe.edu.vallegrande.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.vallegrande.project.model.Seller;

public interface SellerRepository extends JpaRepository<Seller, Long> {
}
