package pe.edu.vallegrande.project.service.impl;

import pe.edu.vallegrande.project.model.MarketCustomer;
import pe.edu.vallegrande.project.repository.MarketCustomerRepository;
import pe.edu.vallegrande.project.service.MarketCustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class MarketCustomerServiceImpl implements MarketCustomerService {

    private final MarketCustomerRepository marketCustomerRepository;

    @Autowired
    public MarketCustomerServiceImpl(MarketCustomerRepository marketCustomerRepository) {
        this.marketCustomerRepository = marketCustomerRepository;
    }

    @Override
    public List<MarketCustomer> findAll() {
        log.info("Listando Datos de MarketCustomer");
        return marketCustomerRepository.findAll();
    }

    @Override
    public Optional<MarketCustomer> findById(Long id) {
        log.info("Buscando MarketCustomer por ID");
        return marketCustomerRepository.findById(id);
    }

    @Override
    public MarketCustomer save(MarketCustomer marketCustomer) {
        log.info("Guardando MarketCustomer: " + marketCustomer.toString());
        marketCustomer.setState("A");
        return marketCustomerRepository.save(marketCustomer);
    }

    @Override
    public MarketCustomer update(MarketCustomer marketCustomer) {
        log.info("Actualizando MarketCustomer: " + marketCustomer.toString());
        marketCustomer.setState("A");
        return marketCustomerRepository.save(marketCustomer);
    }

    @Override
    public void delete(MarketCustomer marketCustomer) {
        // Cambiar el estado del cliente a "I" (Inactivo) en lugar de eliminarlo
        marketCustomer.setState("I");
        marketCustomerRepository.save(marketCustomer);
    }

    @Override
    public void restore(MarketCustomer marketCustomer) {
        log.info("Restaurando MarketCustomer: " + marketCustomer.toString());
        marketCustomer.setState("A");
        marketCustomerRepository.save(marketCustomer);
    }

}