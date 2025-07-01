package pe.edu.vallegrande.project.service;

import pe.edu.vallegrande.project.model.ProductsDetail;

import java.util.List;
import java.util.Optional;

public interface ProductsDetailService {
    List<ProductsDetail> findAll();
    Optional<ProductsDetail> findById(Long id);
    ProductsDetail save(ProductsDetail productsDetail);
    ProductsDetail update(ProductsDetail productsDetail);
    void delete(Long id);
}
