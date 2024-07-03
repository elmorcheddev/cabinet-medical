package com.medical.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DossierMedical {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String numDossier;
@OneToOne
@JoinColumn(name = "id_patient")
private Patient patient;
}
