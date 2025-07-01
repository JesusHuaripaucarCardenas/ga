package pe.edu.vallegrande.project.service;

import pe.edu.vallegrande.project.model.Seller;

import java.util.List;
import java.util.Optional;

public interface SellerService {

    List<Seller> findAll();
    Optional<Seller> findById(Long id);
    Seller save(Seller seller);
    Seller update(Seller seller);
    void delete(Seller seller);
    void restore(Seller seller);
}
