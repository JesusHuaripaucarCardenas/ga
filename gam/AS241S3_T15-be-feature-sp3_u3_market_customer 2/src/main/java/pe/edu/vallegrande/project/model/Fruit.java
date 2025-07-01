package pe.edu.vallegrande.project.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "frutas")
public class Fruit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom_frut", length = 100, nullable = false)
    private String nomFrut;

    @Column(name = "kil_pri")
    private Double kilPri;

    @Column(name = "kil_ter")
    private Double kilTer;

    @Column(name = "kil_qui")
    private Double kilQui;

    @Column(name = "kil_mad")
    private Double kilMad;

    @Column(name = "can_pri")
    private Integer canPri;

    @Column(name = "can_ter")
    private Integer canTer;

    @Column(name = "can_qui")
    private Integer canQui;

    @Column(name = "can_mad")
    private Integer canMad;

    @Column(name = "pre_pri")
    private Double prePri;

    @Column(name = "pre_ter")
    private Double preTer;

    @Column(name = "pre_qui")
    private Double preQui;

    @Column(name = "pre_mad")
    private Double preMad;

    @Column(name = "fecha")
    private LocalDate fecha;
}
