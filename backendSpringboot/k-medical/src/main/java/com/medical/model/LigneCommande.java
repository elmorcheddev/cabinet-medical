package com.medical.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

 

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LigneCommande {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id_ordDetails;
		
		private int quantity;
		private double totalPrice,unitPrice;
		 @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
		 @JoinColumn(name = "id_cmd", referencedColumnName = "id")
		  private Commande commande;
		 @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
		    @JoinColumn(name = "id_art", referencedColumnName = "id")
		private Product product;

}
