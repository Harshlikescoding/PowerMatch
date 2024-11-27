package com.example.powermatch;

public class CardItem {
    private final String name;
    private final int age;
    private final int imageResId;

    public CardItem(String name, int age, int imageResId) {
        this.name = name;
        this.age = age;
        this.imageResId = imageResId;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public int getImageResId() {
        return imageResId;
    }
}
