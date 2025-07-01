package pe.edu.vallegrande.project.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "FruitSelections")
public class FruitSelection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long id;

    @Column(name = "Name", length = 100, nullable = false)
    private String name;

    @Column(name = "FirstSelection", precision = 10, scale = 2, nullable = false)
    private BigDecimal firstSelection;

    @Column(name = "ThirdSelection", precision = 10, scale = 2, nullable = false)
    private BigDecimal thirdSelection;

    @Column(name = "FifthSelection", precision = 10, scale = 2, nullable = false)
    private BigDecimal fifthSelection;

    @Column(name = "RipeSelection", precision = 10, scale = 2, nullable = false)
    private BigDecimal ripeSelection;

    @Column(name = "Total", precision = 10, scale = 2, nullable = false)
    private BigDecimal total;

    @Column(name = "Client", length = 100, nullable = false)
    private String client;

    @Column(name = "ExitDate", nullable = false)
    private LocalDate exitDate;
}
