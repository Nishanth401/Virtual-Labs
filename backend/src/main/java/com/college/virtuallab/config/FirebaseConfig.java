package com.college.virtuallab.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    private static final Logger logger = LoggerFactory.getLogger(FirebaseConfig.class);

    @Value("${firebase.project-id:virtual-lab-e7495}")
    private String projectId;

    @Value("${firebase.credentials-path:}")
    private String credentialsPath;

    @Bean
    public FirebaseApp firebaseApp() {
        if (!FirebaseApp.getApps().isEmpty()) {
            return FirebaseApp.getInstance();
        }

        try {
            FirebaseOptions.Builder optionsBuilder = FirebaseOptions.builder()
                    .setProjectId(projectId);

            if (credentialsPath != null && !credentialsPath.trim().isEmpty()) {
                File credentialsFile = new File(credentialsPath);
                if (credentialsFile.exists()) {
                    try (InputStream is = new FileInputStream(credentialsFile)) {
                        optionsBuilder.setCredentials(GoogleCredentials.fromStream(is));
                        logger.info("Firebase Admin initialized with custom service account credentials: {}", credentialsPath);
                    }
                } else {
                    logger.warn("Firebase service account file not found at: {}. Falling back to default credentials.", credentialsPath);
                    optionsBuilder.setCredentials(GoogleCredentials.getApplicationDefault());
                }
            } else {
                try {
                    optionsBuilder.setCredentials(GoogleCredentials.getApplicationDefault());
                    logger.info("Firebase Admin initialized with Google Application Default Credentials for project: {}", projectId);
                } catch (Exception e) {
                    logger.info("Google Application Default Credentials not found. Initializing FirebaseApp in project-mode for ID token validation: {}", projectId);
                }
            }

            FirebaseApp app = FirebaseApp.initializeApp(optionsBuilder.build());
            logger.info("FirebaseApp successfully initialized for project [{}]", projectId);
            return app;
        } catch (Exception e) {
            logger.warn("Could not fully initialize FirebaseApp (will fallback to JWT/offline verification): {}", e.getMessage());
            return null;
        }
    }
}
