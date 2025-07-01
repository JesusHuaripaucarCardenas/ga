package pe.edu.vallegrande.project.service;

import pe.edu.vallegrande.project.model.SaleDetail;
import java.util.List;
import java.util.Optional;

public interface SaleDetailService {

    List<SaleDetail> findAll();
    Optional<SaleDetail> findById(Long id);
    SaleDetail save(SaleDetail saleDetail);
    SaleDetail update(SaleDetail saleDetail);
    void deleteById(Long id);

}
