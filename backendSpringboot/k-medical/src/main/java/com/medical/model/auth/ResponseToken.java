package com.medical.model.auth;

import com.medical.model.Utilisateur;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Builder
public class ResponseToken {

	private String token;
	private Utilisateur utilisateur;
}
