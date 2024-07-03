package com.medical.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

 import com.medical.Utils.JwtUtils;
import com.medical.configuration.CustomUserDetailService;
import com.medical.model.Utilisateur;
import com.medical.model.auth.RequestToken;
import com.medical.model.auth.ResponseToken;
import com.medical.repo.UtilisateurRepo;
import com.medical.service.UtilisateurService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

	@Autowired
	private UtilisateurRepo utilisateurRepo;
	@Autowired
	private UtilisateurService utilisateurService;
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private CustomUserDetailService userDetailsService;

	@Autowired
	private JwtUtils jwtUtil;
	
	
	@GetMapping("/getConnectedUser")
	public ResponseEntity<Utilisateur> getConnectedUser(HttpServletRequest request, HttpServletResponse response) {
		String token = request.getHeader("Authorization");

		if (token != null && token.startsWith("Bearer ")) {
			token = token.substring(7); // Remove "Bearer " prefix

			String username = jwtUtil.extractUsername(token);
			Utilisateur utilisateurs = utilisateurRepo.findByEmail(username);

			return ResponseEntity.ok(utilisateurs);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	@PostMapping(value = "/login")
	public ResponseEntity<ResponseToken> authenticate(@RequestBody RequestToken request) {
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
		final Utilisateur user = utilisateurRepo.findByEmail(request.getEmail());
		final String jwt = jwtUtil.generateToken(userDetails);

		return ResponseEntity.ok(ResponseToken.builder().token(jwt).utilisateur(user).build());
	}
}
