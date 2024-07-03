package com.medical;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.medical.repo")
@EntityScan(basePackages = "com.medical.model")
public class KMedicalApplication {

	public static void main(String[] args) {
		SpringApplication.run(KMedicalApplication.class, args);
	}

}
