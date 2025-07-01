package pe.edu.vallegrande.project.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "supermarket_customer")
public class SupermarketCustomer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "supermarket_name", nullable = false)
    private String supermarketName;

    @Column(name = "city")
    private String city;

    @Column(name = "district")
    private String district;

    @Column(name = "ruc", unique = true, nullable = false, length = 11)
    private String ruc;

    @Column(name = "array_address", nullable = false)
    private String arrayAddress;

    @Column(name = "phone", unique = true, nullable = false, length = 9)
    private String phone;

    @Column(name = "state", nullable = false)
    private String state;
}
