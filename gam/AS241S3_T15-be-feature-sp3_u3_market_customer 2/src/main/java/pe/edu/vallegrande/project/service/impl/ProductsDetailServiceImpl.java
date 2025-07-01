package pe.edu.vallegrande.project.service.impl;

import pe.edu.vallegrande.project.model.ProductsDetail;
import pe.edu.vallegrande.project.repository.ProductsDetailRepository;
import pe.edu.vallegrande.project.service.ProductsDetailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ProductsDetailServiceImpl implements ProductsDetailService {

    private final ProductsDetailRepository repository;

    @Autowired
    public ProductsDetailServiceImpl(ProductsDetailRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<ProductsDetail> findAll() {
        log.info("Listando ProductsDetail");
        return repository.findAll();
    }

    @Override
    public Optional<ProductsDetail> findById(Long id) {
        log.info("Buscando ProductsDetail por ID: {}", id);
        return repository.findById(id);
    }

    @Override
    public ProductsDetail save(ProductsDetail pd) {
        log.info("Guardando ProductsDetail: {}", pd);
        return repository.save(pd);
    }

    @Override
    public ProductsDetail update(ProductsDetail pd) {
        log.info("Actualizando ProductsDetail: {}", pd);
        return repository.save(pd);
    }

    @Override
    public void delete(Long id) {
        log.info("Eliminando ProductsDetail con ID: {}", id);
        repository.deleteById(id);
    }
}
