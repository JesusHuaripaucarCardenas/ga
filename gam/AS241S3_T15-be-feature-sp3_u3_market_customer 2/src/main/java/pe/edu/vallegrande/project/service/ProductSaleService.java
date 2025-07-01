package pe.edu.vallegrande.project.service;

import pe.edu.vallegrande.project.model.ProductSale;

import java.util.List;
import java.util.Optional;

public interface ProductSaleService {
    List<ProductSale> findAll();
    Optional<ProductSale> findById(Integer id);
    ProductSale save(ProductSale productSale);
    ProductSale update(ProductSale productSale);
    void delete(Integer id);
}
