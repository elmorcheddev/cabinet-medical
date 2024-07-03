package com.medical.configuration;

 import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

  import com.medical.model.Utilisateur;
import com.medical.repo.UtilisateurRepo;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
	@Autowired
	private  UtilisateurRepo utilisateurRepo;
		
		@Override
		public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
			Utilisateur utilisateur= utilisateurRepo.findByEmail(username);
			if(utilisateur == null) {
				throw new UsernameNotFoundException("utilisateur n'exist pas "+username);
			}
			return new User(utilisateur.getEmail(),utilisateur.getPassword(),utilisateur.getRoleUtilisateurs(). stream()
	                .map(role ->
	                new SimpleGrantedAuthority("ROLE_"+role.getNomRoles()))
	                  .collect(Collectors
	                     .toList()));
		
		}
}
