package pe.edu.vallegrande.project.service;

import pe.edu.vallegrande.project.model.MarketCustomer;
import java.util.List;
import java.util.Optional;

public interface MarketCustomerService {

    List<MarketCustomer> findAll();
    Optional<MarketCustomer> findById(Long id);
    MarketCustomer save(MarketCustomer marketCustomer);
    MarketCustomer update(MarketCustomer marketCustomer);
    void delete(MarketCustomer marketCustomer);
    void restore(MarketCustomer marketCustomer);

}