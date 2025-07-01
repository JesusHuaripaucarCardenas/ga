package pe.edu.vallegrande.project.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "product_sale")
public class ProductSale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "categoria", length = 50, nullable = false)
    private String categoria;

    @Column(name = "first_selection", nullable = false)
    private Integer firstSelection;

    @Column(name = "third_selection", nullable = false)
    private Integer thirdSelection;

    @Column(name = "fifth_selection", nullable = false)
    private Integer fifthSelection;

    @Column(name = "mature_selection", nullable = false)
    private Integer matureSelection;

}
