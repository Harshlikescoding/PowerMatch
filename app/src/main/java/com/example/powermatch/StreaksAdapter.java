package com.example.powermatch;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class StreaksAdapter extends RecyclerView.Adapter<StreaksAdapter.StreakViewHolder> {

    private List<StreakItem> streakItems;
    private Context context;



    public StreaksAdapter(List<StreakItem> streakItems) {
        this.streakItems = streakItems;
        this.context = context;
    }


    @NonNull
    @Override
    public StreakViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_streak, parent, false);
        return new StreakViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull StreakViewHolder holder, int position) {
        StreakItem streakItem = streakItems.get(position);
        holder.streakImage.setImageResource(streakItem.getImageResource());

        holder.streakImage.setOnClickListener(v -> {
            Toast.makeText(context, "User does not have any streaks yet", Toast.LENGTH_SHORT).show();
        });
    }

    @Override
    public int getItemCount() {
        return streakItems.size();
    }

    public static class StreakViewHolder extends RecyclerView.ViewHolder {
        ImageView streakImage;

        public StreakViewHolder(@NonNull View itemView) {
            super(itemView);
            streakImage = itemView.findViewById(R.id.streakImage);
        }
    }
}
