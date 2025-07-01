package pe.edu.vallegrande.project.service.impl;

import pe.edu.vallegrande.project.model.Sale;
import pe.edu.vallegrande.project.repository.SaleRepository;
import pe.edu.vallegrande.project.service.SaleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class SaleServiceImpl implements SaleService {

    private final SaleRepository repository;

    @Autowired
    public SaleServiceImpl(SaleRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Sale> findAll() {
        log.info("Listing all Sales");
        return repository.findAll();
    }

    @Override
    public Optional<Sale> findById(Integer id) {
        log.info("Finding Sale by ID: {}", id);
        return repository.findById(id);
    }

    @Override
    public Sale save(Sale sale) {
        log.info("Saving Sale: {}", sale);
        return repository.save(sale);
    }

    @Override
    public Sale update(Sale sale) {
        log.info("Updating Sale: {}", sale);
        return repository.save(sale);
    }

    @Override
    public void deleteById(Integer id) {
        log.info("Deleting Sale by ID: {}", id);
        repository.deleteById(id);
    }
}
