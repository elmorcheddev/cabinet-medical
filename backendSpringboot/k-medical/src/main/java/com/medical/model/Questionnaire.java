package com.medical.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Questionnaire {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numQuestionnaires;
    private boolean mutuelle;
    private boolean cmu;
    private String referent;
    @ElementCollection
    @CollectionTable(name = "questionnaire_pathologies", joinColumns = @JoinColumn(name = "questionnaire_id"))
    @Column(name = "pathology")
    private List<String> pathologies;
    private boolean interventionChirurgicale;
    private String interventionDetails;
    private boolean medicaments;
    private String medicamentsDetails;
    private boolean anticoagulants;
    private boolean biphosphonates;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "dossier_medical_id", referencedColumnName = "id")
    private DossierMedical dossierMedical;
    private String autresPathologies;
    private boolean allergieConnue;
    private String allergieDentaire;
    private String mutuelleAutre;
    private String profession;
    private String adressePar;
    private String medecinNom;
    private String lieu;
    private int enfants;
    private boolean fume;
    private boolean alcool;
    private boolean tuberculose;
    private boolean diabete;
    private boolean cardiopathie;
    private boolean autres;
  }