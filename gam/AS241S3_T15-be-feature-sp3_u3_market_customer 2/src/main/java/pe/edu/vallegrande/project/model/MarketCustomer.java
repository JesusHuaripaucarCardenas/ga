package pe.edu.vallegrande.project.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "market_customer")
public class MarketCustomer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "city", length = 50, nullable = false)
    private String city;

    @Column(name = "district", length = 50, nullable = false)
    private String district;

    @Column(name = "market_name", length = 50, nullable = false)
    private String marketName;

    @Column(name = "position_number", length = 10, nullable = false)
    private String positionNumber;

    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @Column(name = "lastname", length = 50, nullable = false)
    private String lastname;

    @Column(name = "document_type", length = 3, nullable = false)
    private String documentType;

    @Column(name = "document_number", length = 20, nullable = false, unique = true)
    private String documentNumber;

    @Column(name = "phone", length = 9, nullable = false, unique = true)
    private String phone;

    @Column(name = "state", length = 1)
    private String state;
}
