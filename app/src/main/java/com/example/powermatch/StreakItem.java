package com.example.powermatch;

public class StreakItem {
    private String name;
    private int imageResource;

    // Constructor to initialize the data
    public StreakItem(String name, int imageResource) {
        this.name = name;
        this.imageResource = imageResource;
    }

    // Getter for the name
    public String getName() {
        return name;
    }

    // Getter for the image resource
    public int getImageResource() {
        return imageResource;
    }
}
