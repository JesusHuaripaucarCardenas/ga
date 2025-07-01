package pe.edu.vallegrande.project.service.impl;

import pe.edu.vallegrande.project.model.FruitSelection;
import pe.edu.vallegrande.project.repository.FruitSelectionRepository;
import pe.edu.vallegrande.project.service.FruitSelectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class FruitSelectionServiceImpl implements FruitSelectionService {

    private final FruitSelectionRepository repository;

    @Autowired
    public FruitSelectionServiceImpl(FruitSelectionRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<FruitSelection> findAll() {
        log.info("Listando todas las FruitSelections");
        return repository.findAll();
    }

    @Override
    public Optional<FruitSelection> findById(Long id) {
        log.info("Buscando FruitSelection por ID: {}", id);
        return repository.findById(id);
    }

    @Override
    public FruitSelection save(FruitSelection fs) {
        log.info("Guardando nueva FruitSelection: {}", fs);
        return repository.save(fs);
    }

    @Override
    public FruitSelection update(FruitSelection fs) {
        log.info("Actualizando FruitSelection: {}", fs);
        return repository.save(fs);
    }

    @Override
    public void deleteById(Long id) {
        log.info("Eliminando FruitSelection por ID: {}", id);
        repository.deleteById(id);
    }
}
