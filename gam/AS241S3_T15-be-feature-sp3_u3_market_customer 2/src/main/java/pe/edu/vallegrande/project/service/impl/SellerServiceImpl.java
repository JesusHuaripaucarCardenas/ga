package pe.edu.vallegrande.project.service.impl;

import pe.edu.vallegrande.project.model.Seller;
import pe.edu.vallegrande.project.repository.SellerRepository;
import pe.edu.vallegrande.project.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class SellerServiceImpl implements SellerService {

    private final SellerRepository sellerRepository;

    @Autowired
    public SellerServiceImpl(SellerRepository sellerRepository) {
        this.sellerRepository = sellerRepository;
    }

    @Override
    public List<Seller> findAll() {
        log.info("Listando todos los vendedores");
        return sellerRepository.findAll();
    }

    @Override
    public Optional<Seller> findById(Long id) {
        log.info("Buscando vendedor por ID");
        return sellerRepository.findById(id);
    }

    @Override
    public Seller save(Seller seller) {
        log.info("Guardando vendedor: " + seller);
        seller.setState("A");
        return sellerRepository.save(seller);
    }

    @Override
    public Seller update(Seller seller) {
        log.info("Actualizando vendedor: " + seller);
        seller.setState("A");
        return sellerRepository.save(seller);
    }

    @Override
    public void delete(Seller seller) {
        seller.setState("I");
        sellerRepository.save(seller);
    }

    @Override
    public void restore(Seller seller) {
        log.info("Restaurando vendedor: " + seller);
        seller.setState("A");
        sellerRepository.save(seller);
    }
}
