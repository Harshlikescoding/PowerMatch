package com.example.powermatch;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList;
import java.util.List;

public class ChatFragment extends Fragment {

    private RecyclerView streaksRecyclerView;  // RecyclerView to display streaks
    private List<StreakItem> streakItems;      // List to hold the streak data

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_chat, container, false);

        // Initialize RecyclerView for Streaks
        streaksRecyclerView = view.findViewById(R.id.streaksRecyclerView);
        streaksRecyclerView.setLayoutManager(new LinearLayoutManager(getContext(), LinearLayoutManager.HORIZONTAL, false));

        // Initialize streak data (add demo data)
        streakItems = new ArrayList<>();
        streakItems.add(new StreakItem("John", R.drawable.ic_demo_image_1));
        streakItems.add(new StreakItem("Alice", R.drawable.ic_demo_image_2));
        streakItems.add(new StreakItem("Bob", R.drawable.ic_demo_image_3));
        streakItems.add(new StreakItem("Charlie", R.drawable.ic_demo_image_4));

        // Set the adapter for the RecyclerView
        StreaksAdapter adapter = new StreaksAdapter(streakItems);
        streaksRecyclerView.setAdapter(adapter);

        return view;
    }
}
