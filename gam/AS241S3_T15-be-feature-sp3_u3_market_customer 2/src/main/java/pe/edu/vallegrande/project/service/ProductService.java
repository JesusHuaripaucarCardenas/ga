package pe.edu.vallegrande.project.service;

import pe.edu.vallegrande.project.model.Product;
import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> findAll();
    Optional<Product> findById(Integer id);
    Product save(Product product);
    Product update(Product product);
    void deleteById(Integer id);
}
