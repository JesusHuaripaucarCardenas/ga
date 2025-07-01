package pe.edu.vallegrande.project.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "sale")
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "date_sale", nullable = false)
    private LocalDate dateSale;

    @Column(name = "customer", nullable = false)
    private Integer customer;

    @Column(name = "payment", nullable = false)
    private Integer payment;
}
