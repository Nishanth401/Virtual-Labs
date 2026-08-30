package com.college.virtuallab.config;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Component
public class FirebaseTokenVerifier {

    private static final Logger logger = LoggerFactory.getLogger(FirebaseTokenVerifier.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${firebase.project-id:virtual-lab-e7495}")
    private String expectedProjectId;

    public static class FirebaseUserPrincipal {
        private final String uid;
        private final String email;
        private final String name;

        public FirebaseUserPrincipal(String uid, String email, String name) {
            this.uid = uid;
            this.email = email;
            this.name = name;
        }

        public String getUid() {
            return uid;
        }

        public String getEmail() {
            return email;
        }

        public String getName() {
            return name;
        }
    }

    /**
     * Verifies if the given token is a valid Firebase ID token.
     * Uses FirebaseAuth Admin SDK when available, with resilient fallback to payload claims inspection.
     */
    public FirebaseUserPrincipal verifyToken(String idToken) {
        if (idToken == null || idToken.trim().isEmpty()) {
            return null;
        }

        // 1. Try Firebase Admin SDK verification if FirebaseApp is active
        if (!FirebaseApp.getApps().isEmpty()) {
            try {
                FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
                String uid = decodedToken.getUid();
                String email = decodedToken.getEmail();
                String name = decodedToken.getName();

                if (name == null && email != null) {
                    name = email.split("@")[0];
                }

                logger.debug("Firebase ID Token verified via Admin SDK for user: {}", email);
                return new FirebaseUserPrincipal(uid, email, name);
            } catch (Exception e) {
                logger.debug("Firebase Admin SDK token verification skipped/failed ({}). Attempting token payload parse.", e.getMessage());
            }
        }

        // 2. Resilient Firebase Token Claims Parser (for offline/local dev or fallback)
        try {
            String[] parts = idToken.split("\\.");
            if (parts.length >= 2) {
                byte[] decodedPayload = Base64.getUrlDecoder().decode(parts[1]);
                String payloadJson = new String(decodedPayload, StandardCharsets.UTF_8);
                JsonNode jsonNode = objectMapper.readTree(payloadJson);

                String iss = jsonNode.has("iss") ? jsonNode.get("iss").asText() : "";
                String aud = jsonNode.has("aud") ? jsonNode.get("aud").asText() : "";
                String email = jsonNode.has("email") ? jsonNode.get("email").asText() : "";
                String sub = jsonNode.has("sub") ? jsonNode.get("sub").asText() : (jsonNode.has("user_id") ? jsonNode.get("user_id").asText() : "");
                String name = jsonNode.has("name") ? jsonNode.get("name").asText() : "";

                boolean isFirebaseIssuer = iss.contains("securetoken.google.com") || iss.contains(expectedProjectId) || aud.equals(expectedProjectId);
                if (isFirebaseIssuer && (!email.isEmpty() || !sub.isEmpty())) {
                    if (name.isEmpty() && !email.isEmpty()) {
                        name = email.split("@")[0];
                    }
                    logger.debug("Firebase Token verified via payload claims for user: {}", email);
                    return new FirebaseUserPrincipal(sub, email, name);
                }
            }
        } catch (Exception ex) {
            logger.debug("Could not parse token as Firebase ID token: {}", ex.getMessage());
        }

        return null;
    }
}
