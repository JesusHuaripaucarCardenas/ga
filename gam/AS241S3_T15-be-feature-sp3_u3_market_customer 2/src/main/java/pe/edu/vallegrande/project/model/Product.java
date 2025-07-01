package pe.edu.vallegrande.project.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "selection_quantity", nullable = false)
    private Integer selectionQuantity;

    @Column(name = "kl_quantity", nullable = false)
    private Integer klQuantity;

    @Column(name = "output_log", nullable = false)
    private LocalDateTime outputLog;

    @Column(name = "products_detail_id", nullable = false)
    private Integer productsDetailId;
}
