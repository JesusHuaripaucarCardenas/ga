package pe.edu.vallegrande.project.service.impl;

import pe.edu.vallegrande.project.model.SaleDetail;
import pe.edu.vallegrande.project.repository.SaleDetailRepository;
import pe.edu.vallegrande.project.service.SaleDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class SaleDetailServiceImpl implements SaleDetailService {

    private final SaleDetailRepository repository;

    @Autowired
    public SaleDetailServiceImpl(SaleDetailRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<SaleDetail> findAll() {
        log.info("Listando todos los SaleDetail");
        return repository.findAll();
    }

    @Override
    public Optional<SaleDetail> findById(Long id) {
        log.info("Buscando SaleDetail por ID: {}", id);
        return repository.findById(id);
    }

    @Override
    public SaleDetail save(SaleDetail saleDetail) {
        log.info("Guardando SaleDetail: {}", saleDetail);
        return repository.save(saleDetail);
    }

    @Override
    public SaleDetail update(SaleDetail saleDetail) {
        log.info("Actualizando SaleDetail: {}", saleDetail);
        return repository.save(saleDetail);
    }

    @Override
    public void deleteById(Long id) {
        log.info("Eliminando SaleDetail por ID: {}", id);
        repository.deleteById(id);
    }
}
