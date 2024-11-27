package com.example.powermatch;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.fragment.app.Fragment;
import com.google.android.material.textfield.TextInputEditText;

public class ProfileFragment extends Fragment {

    private TextInputEditText nameEditText, locationEditText, weightEditText;
    private Spinner ageSpinner, genderSpinner, fitnessGoalSpinner, question1Spinner, question2Spinner, question3Spinner, question4Spinner;

    @SuppressLint("MissingInflatedId")
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_profile, container, false);

        // Initialize views
        nameEditText = view.findViewById(R.id.nameEditText);
        ageSpinner = view.findViewById(R.id.ageSpinner);
        genderSpinner = view.findViewById(R.id.genderSpinner);
        locationEditText = view.findViewById(R.id.locationEditText);
        weightEditText = view.findViewById(R.id.weightEditText);
        fitnessGoalSpinner = view.findViewById(R.id.fitnessGoalSpinner);
        question1Spinner = view.findViewById(R.id.question1Spinner);
        question2Spinner = view.findViewById(R.id.question2Spinner);
        question3Spinner = view.findViewById(R.id.question3Spinner);
        question4Spinner = view.findViewById(R.id.question4Spinner);

        // Set up Spinners
        setUpSpinners();

        // Save Profile Button
        view.findViewById(R.id.saveProfileButton).setOnClickListener(v -> saveProfileData());

        return view;
    }

    private void setUpSpinners() {
        // Set adapter for age spinner
        ArrayAdapter<CharSequence> ageAdapter = ArrayAdapter.createFromResource(requireContext(),
                R.array.age_options, android.R.layout.simple_spinner_item);
        ageAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        ageSpinner.setAdapter(ageAdapter);

        // Set adapter for gender spinner
        ArrayAdapter<CharSequence> genderAdapter = ArrayAdapter.createFromResource(getContext(),
                R.array.gender_options, android.R.layout.simple_spinner_item);
        genderAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        genderSpinner.setAdapter(genderAdapter);

        // Set adapter for fitness goal spinner
        ArrayAdapter<CharSequence> fitnessGoalAdapter = ArrayAdapter.createFromResource(getContext(),
                R.array.fitness_goal_options, android.R.layout.simple_spinner_item);
        fitnessGoalAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        fitnessGoalSpinner.setAdapter(fitnessGoalAdapter);

        // Set adapter for question spinners
        ArrayAdapter<CharSequence> questionAdapter = ArrayAdapter.createFromResource(getContext(),
                R.array.questions_options, android.R.layout.simple_spinner_item);
        questionAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

        question1Spinner.setAdapter(questionAdapter);
        question2Spinner.setAdapter(questionAdapter);
        question3Spinner.setAdapter(questionAdapter);
        question4Spinner.setAdapter(questionAdapter);
    }

    private void saveProfileData() {
        // Get values from inputs
        String name = nameEditText.getText().toString();
        String age = ageSpinner.getSelectedItem().toString();
        String gender = genderSpinner.getSelectedItem().toString();
        String location = locationEditText.getText().toString();
        String weight = weightEditText.getText().toString();
        String fitnessGoal = fitnessGoalSpinner.getSelectedItem().toString();
        String question1Answer = question1Spinner.getSelectedItem().toString();
        String question2Answer = question2Spinner.getSelectedItem().toString();
        String question3Answer = question3Spinner.getSelectedItem().toString();
        String question4Answer = question4Spinner.getSelectedItem().toString();

        // Basic Validation: Check if any required field is empty
        if (name.isEmpty() || location.isEmpty() || weight.isEmpty()) {
            Toast.makeText(getContext(), "Please fill out all required fields", Toast.LENGTH_SHORT).show();
            return;
        }

        // Validate weight input (numeric)
        try {
            Double.parseDouble(weight);
        } catch (NumberFormatException e) {
            Toast.makeText(getContext(), "Please enter a valid weight", Toast.LENGTH_SHORT).show();
            return;
        }

        // Check for spinner selections, if a selection is not made, show an error
        if (age.equals("Select Age") || gender.equals("Select Gender") || fitnessGoal.equals("Select Fitness Goal") ||
                question1Answer.equals("Select Answer") || question2Answer.equals("Select Answer") ||
                question3Answer.equals("Select Answer") || question4Answer.equals("Select Answer")) {
            Toast.makeText(getContext(), "Please make a valid selection for all fields", Toast.LENGTH_SHORT).show();
            return;
        }

        // Save data to SharedPreferences
        SharedPreferences sharedPreferences = getActivity().getSharedPreferences("UserProfile", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();

        editor.putString("name", name);
        editor.putString("age", age);
        editor.putString("gender", gender);
        editor.putString("location", location);
        editor.putString("weight", weight);
        editor.putString("fitness_goal", fitnessGoal);
        editor.putString("question1_answer", question1Answer);
        editor.putString("question2_answer", question2Answer);
        editor.putString("question3_answer", question3Answer);
        editor.putString("question4_answer", question4Answer);

        // Apply changes
        editor.apply();

        // Notify the user
        Toast.makeText(getContext(), "Profile Saved Successfully!", Toast.LENGTH_SHORT).show();
    }
}
