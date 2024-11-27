package com.example.powermatch;

import android.graphics.Canvas;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.ItemTouchHelper;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;

public class HomeFragment extends Fragment {

    private RecyclerView recyclerView;
    private List<CardItem> cardItems;
    private CardAdapter adapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home, container, false);

        // Initialize RecyclerView and Buttons
        recyclerView = view.findViewById(R.id.swipeableCards);
        ImageButton buttonLike = view.findViewById(R.id.buttonLike);
        ImageButton buttonFavorite = view.findViewById(R.id.buttonFavorite);
        ImageButton buttonDislike = view.findViewById(R.id.buttonDislike);

        // Initialize data
        cardItems = new ArrayList<>();
        cardItems.add(new CardItem("Charlie", 23, R.drawable.ic_demo_image_1));
        cardItems.add(new CardItem("Bob", 25, R.drawable.ic_demo_image_2));
        cardItems.add(new CardItem("Alice", 22, R.drawable.ic_demo_image_3));

        // Setup RecyclerView
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        adapter = new CardAdapter(cardItems);
        recyclerView.setAdapter(adapter);

        // Attach swipe functionality
        attachSwipeHandler();

        // Setup button click listeners
        buttonLike.setOnClickListener(v -> handleCardAction("Liked"));
        buttonFavorite.setOnClickListener(v -> handleCardAction("Favorited"));
        buttonDislike.setOnClickListener(v -> handleCardAction("Disliked"));

        return view;
    }

    private void handleCardAction(String action) {
        if (cardItems.isEmpty()) {
            Toast.makeText(getContext(), "No more cards!", Toast.LENGTH_SHORT).show();
            return;
        }

        // Get the top card
        CardItem cardItem = cardItems.get(0);
        cardItems.remove(0); // Remove the card from the list
        adapter.notifyItemRemoved(0); // Notify adapter

        // Show the action Toast
        Toast.makeText(getContext(), action + ": " + cardItem.getName(), Toast.LENGTH_SHORT).show();

        // If no more cards, show a message
        if (cardItems.isEmpty()) {
            Toast.makeText(getContext(), "No more cards!", Toast.LENGTH_SHORT).show();
        }
    }

    private void attachSwipeHandler() {
        ItemTouchHelper.SimpleCallback simpleCallback = new ItemTouchHelper.SimpleCallback(0, ItemTouchHelper.LEFT | ItemTouchHelper.RIGHT) {
            @Override
            public boolean onMove(@NonNull RecyclerView recyclerView, @NonNull RecyclerView.ViewHolder viewHolder, @NonNull RecyclerView.ViewHolder target) {
                return false;
            }

            @Override
            public void onSwiped(@NonNull RecyclerView.ViewHolder viewHolder, int direction) {
                int position = viewHolder.getBindingAdapterPosition(); // Corrected to getBindingAdapterPosition()
                if (position != RecyclerView.NO_POSITION) {
                    CardItem swipedCard = cardItems.get(position);

                    // Handle swipe actions based on direction
                    if (direction == ItemTouchHelper.RIGHT) {
                        Toast.makeText(getContext(), "Liked: " + swipedCard.getName(), Toast.LENGTH_SHORT).show();
                    } else {
                        Toast.makeText(getContext(), "Disliked: " + swipedCard.getName(), Toast.LENGTH_SHORT).show();
                    }

                    // Remove the card from the list
                    cardItems.remove(position);
                    adapter.notifyItemRemoved(position);

                    // If no more cards, show a message
                    if (cardItems.isEmpty()) {
                        Toast.makeText(getContext(), "No more cards!", Toast.LENGTH_SHORT).show();
                    }
                }
            }

            @Override
            public void onChildDraw(@NonNull Canvas c, @NonNull RecyclerView recyclerView, @NonNull RecyclerView.ViewHolder viewHolder, float dX, float dY, int actionState, boolean isCurrentlyActive) {
                float alpha = 1.0f - (Math.abs(dX) / recyclerView.getWidth());
                viewHolder.itemView.setAlpha(alpha);
                viewHolder.itemView.setTranslationX(dX);
                super.onChildDraw(c, recyclerView, viewHolder, dX, dY, actionState, isCurrentlyActive);
            }

            @Override
            public void clearView(@NonNull RecyclerView recyclerView, @NonNull RecyclerView.ViewHolder viewHolder) {
                super.clearView(recyclerView, viewHolder);
                viewHolder.itemView.setAlpha(1.0f);
                viewHolder.itemView.setTranslationX(0f);
            }
        };

        ItemTouchHelper itemTouchHelper = new ItemTouchHelper(simpleCallback);
        itemTouchHelper.attachToRecyclerView(recyclerView);
    }
}