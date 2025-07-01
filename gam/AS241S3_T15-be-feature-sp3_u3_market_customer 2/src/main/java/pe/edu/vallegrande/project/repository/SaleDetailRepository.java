package pe.edu.vallegrande.project.repository;

import pe.edu.vallegrande.project.model.SaleDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleDetailRepository extends JpaRepository<SaleDetail, Long> {
    // Aquí puedes añadir consultas personalizadas si las necesitas
}
