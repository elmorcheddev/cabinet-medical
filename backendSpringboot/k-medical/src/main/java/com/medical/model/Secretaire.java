package com.medical.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Secretaire extends Utilisateur {
	 
	private Date dateCreation;
	@Lob
	@Column(name = "img", columnDefinition="LONGBLOB")	
		private byte[]  img;
	@ManyToOne
	@JoinColumn(name = "id_docteur")
	private Docteur docteur;
}
