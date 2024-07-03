package com.medical.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medical.model.Docteur;
import com.medical.model.Specialite;

public interface DocteurRepo extends JpaRepository<Docteur, Long> {
List<Docteur> findBySpecialite(Specialite specialite);
}
