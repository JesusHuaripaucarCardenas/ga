package pe.edu.vallegrande.project.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.vallegrande.project.model.Fruit;
import pe.edu.vallegrande.project.repository.FruitRepository;
import pe.edu.vallegrande.project.service.FruitService;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class FruitServiceImpl implements FruitService {

    private final FruitRepository fruitRepository;

    @Autowired
    public FruitServiceImpl(FruitRepository fruitRepository) {
        this.fruitRepository = fruitRepository;
    }

    @Override
    public List<Fruit> findAll() {
        log.info("Listando todas las frutas");
        return fruitRepository.findAll();
    }

    @Override
    public Optional<Fruit> findById(Long id) {
        log.info("Buscando fruta con ID {}", id);
        return fruitRepository.findById(id);
    }

    @Override
    public Fruit save(Fruit fruit) {
        log.info("Guardando fruta: {}", fruit);
        return fruitRepository.save(fruit);
    }

    @Override
    public Fruit update(Fruit fruit) {
        log.info("Actualizando fruta: {}", fruit);
        return fruitRepository.save(fruit);
    }

    @Override
    public void delete(Fruit fruit) {
        log.info("Eliminando fruta: {}", fruit);
        fruitRepository.delete(fruit);
    }
}
