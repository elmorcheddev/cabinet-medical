package com.medical.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
public class Consultations {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private Date dateVisit;
@ManyToOne
@JoinColumn(name = "id_docteur")
private Docteur docteur;
private String reason;
@ElementCollection
@CollectionTable(name = "cosnultation_notes", joinColumns = @JoinColumn(name = "cosnultation_id"))
@Column(name = "notes")
private List<String> notes;
 private double prixConsultation;
   
@ManyToOne
@JoinColumn(name = "id_dossier")
private DossierMedical  dossierMedical;
}
