package com.example.thebackend.Controller;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.thebackend.Service.AuthService;
import com.example.thebackend.DTO.SignupRequest;
import com.example.thebackend.DTO.LoginRequest;
import com.example.thebackend.DTO.ResponseDTO;
import com.example.thebackend.DTO.GoogleLoginRequest;



@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        try {
            Long userId = authService.signup(request.getEmail(), request.getPassword(), request.getFirstName(), request.getLastName(), request.getMembershipType());
            ResponseDTO response = new ResponseDTO(userId);
            return ResponseEntity.ok(response); // Return as JSON object
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Signup failed: " + e.getMessage());
        }
    }
    
    

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Long userId = authService.login(request.getEmail(), request.getPassword());
            ResponseDTO response = new ResponseDTO(userId);
            if (userId != null) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.SC_UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }
    
    

    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleLoginRequest request) {
        try {
            System.out.println("Received token: " + request.getToken());
            Long userId = authService.googleLogin(request.getToken());
            return ResponseEntity.ok().body("Google login successful. User ID: " + userId);
        } catch (Exception e) {
            e.printStackTrace();  // Print stack trace for more details
            return ResponseEntity.badRequest().body("Google login failed: " + e.getClass().getSimpleName() + " - " + e.getMessage() + " - " + request.getToken());
        }
    }
    


}
