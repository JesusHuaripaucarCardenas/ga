package pe.edu.vallegrande.project.service;

import pe.edu.vallegrande.project.model.Sale;
import java.util.List;
import java.util.Optional;

public interface SaleService {
    List<Sale> findAll();
    Optional<Sale> findById(Integer id);
    Sale save(Sale sale);
    Sale update(Sale sale);
    void deleteById(Integer id);
}
