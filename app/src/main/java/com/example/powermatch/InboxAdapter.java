package com.example.powermatch;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;

public class InboxAdapter extends RecyclerView.Adapter<InboxAdapter.InboxViewHolder> {

    private List<String> messages;

    public InboxAdapter(List<String> messages) {
        this.messages = messages;
    }

    @Override
    public InboxViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_inbox_message, parent, false);
        return new InboxViewHolder(view);
    }

    @Override
    public void onBindViewHolder(InboxViewHolder holder, int position) {
        String message = messages.get(position);
        holder.messageTextView.setText(message);
    }

    @Override
    public int getItemCount() {
        return messages.size();
    }

    public static class InboxViewHolder extends RecyclerView.ViewHolder {
        TextView messageTextView;

        public InboxViewHolder(View itemView) {
            super(itemView);
            messageTextView = itemView.findViewById(R.id.messageText);
        }
    }
}
