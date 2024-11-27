package com.example.powermatch;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class SignupActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        EditText emailField = findViewById(R.id.signupEmail);
        EditText passwordField = findViewById(R.id.signupPassword);
        EditText confirmPasswordField = findViewById(R.id.confirmPassword);
        Button signupButton = findViewById(R.id.signupButton);

        signupButton.setOnClickListener(v -> {
            String email = emailField.getText().toString();
            String password = passwordField.getText().toString();
            String confirmPassword = confirmPasswordField.getText().toString();

            if (email.isEmpty() || password.isEmpty() || confirmPassword.isEmpty()) {
                Toast.makeText(SignupActivity.this, "Please fill in all fields", Toast.LENGTH_SHORT).show();
            } else if (!password.equals(confirmPassword)) {
                Toast.makeText(SignupActivity.this, "Passwords do not match", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(SignupActivity.this, "Signup Successful", Toast.LENGTH_SHORT).show();
                // Redirect to MainActivity after successful signup
                Intent intent = new Intent(SignupActivity.this, MainActivity.class);
                startActivity(intent);
                finish();
            }
        });
    }
}
