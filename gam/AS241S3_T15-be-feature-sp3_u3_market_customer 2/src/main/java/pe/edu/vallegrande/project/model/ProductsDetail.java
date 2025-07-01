package pe.edu.vallegrande.project.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "products_detail")
public class ProductsDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "first_selection", nullable = false)
    private Integer firstSelection;

    @Column(name = "kl_first", nullable = false)
    private Integer klFirst;

    @Column(name = "third_selection", nullable = false)
    private Integer thirdSelection;

    @Column(name = "kl_third", nullable = false)
    private Integer klThird;

    @Column(name = "fifth_selection", nullable = false)
    private Integer fifthSelection;

    @Column(name = "kl_fifth", nullable = false)
    private Integer klFifth;

    @Column(name = "mature_selection", nullable = false)
    private Integer matureSelection;

    @Column(name = "kl_mature", nullable = false)
    private Integer klMature;

    @Column(name = "confirmed", nullable = false)
    private boolean confirmed = false;

}
