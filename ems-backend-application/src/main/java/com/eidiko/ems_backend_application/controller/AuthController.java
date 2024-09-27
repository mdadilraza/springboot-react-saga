package com.eidiko.ems_backend_application.controller;

import com.eidiko.ems_backend_application.dto.EmployeeDto;
import com.eidiko.ems_backend_application.dto.JwtResponse;
import com.eidiko.ems_backend_application.dto.LoginRequest;
import com.eidiko.ems_backend_application.dto.RegisterRequest;
import com.eidiko.ems_backend_application.modelmapper.EmployeeMapper;
import com.eidiko.ems_backend_application.repository.EmployeeRepository;
import com.eidiko.ems_backend_application.security.JwtGenerator;
import com.eidiko.ems_backend_application.service.EmployeeService;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@CrossOrigin("*")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    UserDetailsService userDetailsService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired

    private EmployeeRepository employeeRepository;
    @Autowired
    private EmployeeMapper employeeMapper;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtGenerator jwtGenerator;
    @CrossOrigin("*")
    @PostMapping("/register")
    public ResponseEntity<?> registerStudent(@RequestBody RegisterRequest registerRequest) {
        employeeService.registerEmployee(registerRequest);
        return ResponseEntity.ok("Employee registered successfully!");
    }


        @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);

       // return new ResponseEntity<>(new JwtResponse(token , employeeMapper.mapToEmployeeDto(employeeRepository.findByEmail(loginRequest.getEmail()))), HttpStatus.OK);
        return new ResponseEntity<>(new JwtResponse(token,
                "Bearer", employeeMapper.mapToEmployeeDto(employeeRepository.findByEmail(loginRequest.getEmail()))), HttpStatus.OK);

    }
//    @CrossOrigin("*")
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest,
 //                                  HttpServletResponse response) {
//    // Authenticate the user
//    Authentication authentication = authenticationManager.authenticate(
//            new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
//
//    SecurityContextHolder.getContext().setAuthentication(authentication);
//
//    // Generate JWT Token
//    String token = jwtGenerator.generateToken(authentication);
//
//    // Set the JWT token as a HttpOnly cookie
//    ResponseCookie jwtCookie = ResponseCookie.from("jwtToken", token)
////            .httpOnly(true)    // Make it HttpOnly to prevent XSS
////            .secure(true)      // Send over HTTPS only (in production)
//            .path("/")         // Set the path for the cookie
//            .maxAge(3600)      // Set expiration time (1 hour)
//            .sameSite("Strict")// CSRF protection
//            .build();
//
//    // Optional: Get the employee data to return
//    EmployeeDto employeeDto = employeeMapper.mapToEmployeeDto(employeeRepository.findByEmail(loginRequest.getEmail()));
//
//    // Return the response with the JWT token in HttpOnly cookie
//    return ResponseEntity.ok()
//            .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
//            .body(new JwtResponse(token,"Bearer", employeeDto));
//}
//        Authentication authentication = authenticationManager.
//                authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
//                        loginRequest.getPassword()));
//        if (authentication.isAuthenticated()) {
////        RefreshToken refreshToken = refreshTokenService.createRefreshToken(authRequestDTO.getUsername());
//            String accessToken = jwtGenerator.generateToken(authentication);
//            // set accessToken to cookie header
//            ResponseCookie cookie = ResponseCookie.from("accessToken", accessToken)
//                    .httpOnly(true)
//                    .secure(true)
//                    .path("/")
//                    .maxAge(3600)
//                    .build();
//            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
////        return JwtResponseDTO.builder()
////                .accessToken(accessToken)
////                .token(refreshToken.getToken()).build();
//            // Optional: Get the employee data to return
//            EmployeeDto employeeDto = employeeMapper.mapToEmployeeDto(employeeRepository.findByEmail(loginRequest.getEmail()));
//
//            // Return the response with the JWT token in HttpOnly cookie
//            return ResponseEntity.ok()
////            .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
//                    .body(new JwtResponse(accessToken, "Bearer", employeeDto));
//
//        } else {
//            throw new UsernameNotFoundException("invalid user request..!!");
//        }
    }

