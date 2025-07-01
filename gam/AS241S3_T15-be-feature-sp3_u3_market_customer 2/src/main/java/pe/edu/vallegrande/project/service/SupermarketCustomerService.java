package pe.edu.vallegrande.project.service;

import pe.edu.vallegrande.project.model.SupermarketCustomer;
import java.util.List;
import java.util.Optional;

public interface SupermarketCustomerService {

    List<SupermarketCustomer> findAll();
    Optional<SupermarketCustomer> findById(Long id);
    SupermarketCustomer save(SupermarketCustomer customer);
    SupermarketCustomer update(SupermarketCustomer customer);
    void delete(SupermarketCustomer customer);
    SupermarketCustomer restore(SupermarketCustomer customer);
}
