package com.example.powermatch;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class CardAdapter extends RecyclerView.Adapter<CardAdapter.CardViewHolder> {

    private final List<CardItem> cardList;

    public CardAdapter(List<CardItem> cardList) {
        this.cardList = cardList;
    }

    @NonNull
    @Override
    public CardViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_card, parent, false);
        return new CardViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CardViewHolder holder, int position) {
        CardItem card = cardList.get(position);
        holder.cardName.setText(card.getName());
        holder.cardAge.setText(String.valueOf(card.getAge()));
        holder.cardImage.setImageResource(card.getImageResId());
    }

    @Override
    public int getItemCount() {
        return cardList.size();
    }

    static class CardViewHolder extends RecyclerView.ViewHolder {
        ImageView cardImage;
        TextView cardName, cardAge;

        public CardViewHolder(@NonNull View itemView) {
            super(itemView);
            cardImage = itemView.findViewById(R.id.cardImage);
            cardName = itemView.findViewById(R.id.cardName);
            cardAge = itemView.findViewById(R.id.cardAge);
        }
    }
}
