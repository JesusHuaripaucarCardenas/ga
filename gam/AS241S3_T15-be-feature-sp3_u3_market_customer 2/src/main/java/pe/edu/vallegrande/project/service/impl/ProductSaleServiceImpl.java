package pe.edu.vallegrande.project.service.impl;

import pe.edu.vallegrande.project.model.ProductSale;
import pe.edu.vallegrande.project.repository.ProductSaleRepository;
import pe.edu.vallegrande.project.service.ProductSaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ProductSaleServiceImpl implements ProductSaleService {

    private final ProductSaleRepository repository;

    @Autowired
    public ProductSaleServiceImpl(ProductSaleRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<ProductSale> findAll() {
        log.info("Listando todos los ProductSale");
        return repository.findAll();
    }

    @Override
    public Optional<ProductSale> findById(Integer id) {
        log.info("Buscando ProductSale por ID: {}", id);
        return repository.findById(id);
    }

    @Override
    public ProductSale save(ProductSale productSale) {
        log.info("Guardando ProductSale: {}", productSale);
        return repository.save(productSale);
    }

    @Override
    public ProductSale update(ProductSale productSale) {
        log.info("Actualizando ProductSale: {}", productSale);
        return repository.save(productSale);
    }

    @Override
    public void delete(Integer id) {
        log.info("Eliminando ProductSale con ID: {}", id);
        repository.deleteById(id);
    }
}
