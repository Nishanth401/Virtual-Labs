package com.college.virtuallab.config;

import com.college.virtuallab.config.FirebaseTokenVerifier.FirebaseUserPrincipal;
import com.college.virtuallab.user.Role;
import com.college.virtuallab.user.User;
import com.college.virtuallab.user.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;
    private final FirebaseTokenVerifier firebaseTokenVerifier;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider,
                                   FirebaseTokenVerifier firebaseTokenVerifier,
                                   UserRepository userRepository) {
        this.tokenProvider = tokenProvider;
        this.firebaseTokenVerifier = firebaseTokenVerifier;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = getJwtFromRequest(request);

            if (StringUtils.hasText(token)) {
                // 1. Check if token is a Firebase ID Token
                FirebaseUserPrincipal firebaseUser = firebaseTokenVerifier.verifyToken(token);
                if (firebaseUser != null && firebaseUser.getEmail() != null) {
                    User user = userRepository.findByEmail(firebaseUser.getEmail())
                            .orElseGet(() -> {
                                String rollNo = firebaseUser.getEmail().split("@")[0].toUpperCase();
                                User newUser = new User(
                                        firebaseUser.getEmail(),
                                        "FIREBASE_AUTH_MANAGED",
                                        firebaseUser.getName() != null && !firebaseUser.getName().isEmpty()
                                                ? firebaseUser.getName()
                                                : "Student",
                                        rollNo,
                                        "Artificial Intelligence & Data Science",
                                        3,
                                        Role.ROLE_STUDENT
                                );
                                return userRepository.save(newUser);
                            });

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
                // 2. Otherwise check if token is a local Spring Security JWT
                else if (tokenProvider.validateToken(token)) {
                    String username = tokenProvider.getUsernameFromJwt(token);

                    UserDetails userDetails = userRepository.findByEmail(username).orElse(null);
                    if (userDetails != null) {
                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            }
        } catch (Exception ex) {
            logger.error("Could not set user authentication in security context", ex);
        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
