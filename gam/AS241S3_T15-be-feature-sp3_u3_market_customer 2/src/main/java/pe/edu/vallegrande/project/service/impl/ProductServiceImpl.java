package pe.edu.vallegrande.project.service.impl;

import pe.edu.vallegrande.project.model.Product;
import pe.edu.vallegrande.project.repository.ProductRepository;
import pe.edu.vallegrande.project.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;

    @Autowired
    public ProductServiceImpl(ProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Product> findAll() {
        log.info("Listando todos los Products");
        return repository.findAll();
    }

    @Override
    public Optional<Product> findById(Integer id) {
        log.info("Buscando Product por ID: {}", id);
        return repository.findById(id);
    }

    @Override
    public Product save(Product product) {
        log.info("Guardando Product: {}", product);
        return repository.save(product);
    }

    @Override
    public Product update(Product product) {
        log.info("Actualizando Product: {}", product);
        return repository.save(product);
    }

    @Override
    public void deleteById(Integer id) {
        log.info("Eliminando Product por ID: {}", id);
        repository.deleteById(id);
    }
}
