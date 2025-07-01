package pe.edu.vallegrande.project.service.impl;

import pe.edu.vallegrande.project.model.SupermarketCustomer;
import pe.edu.vallegrande.project.repository.SupermarketCustomerRepository;
import pe.edu.vallegrande.project.service.SupermarketCustomerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class SupermarketCustomerServiceImpl implements SupermarketCustomerService {

    private final SupermarketCustomerRepository repository;

    @Autowired
    public SupermarketCustomerServiceImpl(SupermarketCustomerRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<SupermarketCustomer> findAll() {
        log.info("Listando supermercados clientes");
        return repository.findAll();
    }

    @Override
    public Optional<SupermarketCustomer> findById(Long id) {
        log.info("Buscando supermercado cliente por ID");
        return repository.findById(id);
    }

    @Override
    public SupermarketCustomer save(SupermarketCustomer customer) {
        log.info("Guardando supermercado cliente: {}", customer);
        customer.setState("A");
        return repository.save(customer);
    }

    @Override
    public SupermarketCustomer update(SupermarketCustomer customer) {
        log.info("Actualizando supermercado cliente: {}", customer);
        customer.setState("A");
        return repository.save(customer);
    }

    @Override
    public void delete(SupermarketCustomer customer) {
        log.info("Desactivando supermercado cliente: {}", customer);
        customer.setState("I");
        repository.save(customer);
    }

    @Override
    public SupermarketCustomer restore(SupermarketCustomer customer) {
        log.info("Restaurando supermercado cliente: {}", customer);
        customer.setState("A");
        return repository.save(customer);
    }
}
