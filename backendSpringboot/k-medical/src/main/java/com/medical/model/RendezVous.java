package com.medical.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RendezVous {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String jours;
private String heurs;
private boolean etat ;
private boolean enattent;
private Date dateCreation;

@ManyToOne
@JoinColumn(name = "id_patient")
private Patient patient;
@ManyToOne
@JoinColumn(name = "id_docteur")
private Docteur docteur;
}
