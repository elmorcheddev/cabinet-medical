package com.medical.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Product name is required")
    @Size(min = 2, message = "Product name should have at least 2 characters")
    private String nomProduct;

    @Min(value = 0, message = "Product price should not be less than 0")
    private double prixProduct;

    @Min(value = 0, message = "Product quantity should not be less than 0")
    private int qteProdcut;
     private int minStock;
    @Lob
    @Column(name = "img", columnDefinition = "LONGBLOB")
    private byte[] img;

    @ManyToOne
    @JoinColumn(name = "id_cat")
    @NotNull(message = "Category is required")
    private CategoriesProduit categoriesProduit;
}
