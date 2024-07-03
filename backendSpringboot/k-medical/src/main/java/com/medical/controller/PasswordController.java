package com.medical.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medical.model.ResetPasswordRequest;
import com.medical.model.Utilisateur;
import com.medical.service.impl.UtilisateurServiceImpl;

@RestController
@RequestMapping("/api")
public class PasswordController {
    @Autowired
    private UtilisateurServiceImpl userService;

    @PostMapping(value = "/forgot-password/{email}")
    public ResponseEntity<?> processForgotPassword(@PathVariable String email) {
        userService.processForgotPassword(email);
        return ResponseEntity.ok("Password reset link sent to your email.");
    }

    @PostMapping(value = "/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        Utilisateur user = userService.getUserByResetToken(request.getToken());
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid token.");
        }

        userService.updatePassword(user, request.getNewPassword());
        return ResponseEntity.ok("Password updated successfully.");
    }
}
