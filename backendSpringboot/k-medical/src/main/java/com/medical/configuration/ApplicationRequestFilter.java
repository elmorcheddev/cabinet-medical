package com.medical.configuration;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.medical.Utils.JwtUtils;

 
@Component
public class ApplicationRequestFilter extends OncePerRequestFilter {
	@Autowired
	private JwtUtils jwtUtil;
	@Autowired
	private CustomUserDetailService applicationUserDetails;
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		final String headerAuth= request.getHeader("Authorization");
		String username=null;
		String jwttoken=null;
		if(headerAuth!=null && headerAuth.startsWith("Bearer ")){
			jwttoken = headerAuth.substring(7);
			username= jwtUtil.extractUsername(jwttoken);
	}
if(username != null && SecurityContextHolder.getContext().getAuthentication() == null ) {
	UserDetails userDetails = this.applicationUserDetails.loadUserByUsername(username);
	if(jwtUtil.isTokenValid(jwttoken, userDetails)) {
		UsernamePasswordAuthenticationToken authenticationToken= UsernamePasswordAuthenticationToken.authenticated(jwttoken,null, userDetails.getAuthorities() );
		authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
		SecurityContextHolder.getContext().setAuthentication(authenticationToken);
		}
	}
filterChain.doFilter(request, response);
}
}

