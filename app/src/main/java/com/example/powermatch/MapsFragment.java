package com.example.powermatch;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import android.widget.SearchView;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

import java.util.ArrayList;
import java.util.List;

public class MapsFragment extends Fragment implements OnMapReadyCallback {

    private MapView mapView;
    private GoogleMap googleMap;

    private List<LatLng> gymLocations = new ArrayList<>();

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_maps, container, false);

        // Initialize MapView
        mapView = view.findViewById(R.id.mapview);
        mapView.onCreate(savedInstanceState);
        mapView.getMapAsync(this); // Set up the map async to be ready

        // Add demo gym locations
        addDemoGymLocations();

        // Initialize SearchView
        SearchView searchView = view.findViewById(R.id.searchView);
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                // Simulate a search (no actual API call)
                showDemoSearchResults(query);
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                return false;
            }
        });

        return view;
    }

    public void onMapReady(GoogleMap googleMap) {
        this.googleMap = googleMap;

        // Default location (zoomed into a location, e.g., New York)
        LatLng defaultLocation = new LatLng(40.748817, -73.985428); // Example coordinates
        googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(defaultLocation, 12));

        // Add markers for demo gyms
        for (LatLng location : gymLocations) {
            googleMap.addMarker(new MarkerOptions().position(location).title("Gym"));
        }
    }

    private void addDemoGymLocations() {
        // Add some demo gym locations to the list
        gymLocations.add(new LatLng(40.748817, -73.985428)); // Example gym 1 (New York)
        gymLocations.add(new LatLng(40.730610, -73.935242)); // Example gym 2 (Brooklyn)
        gymLocations.add(new LatLng(40.712776, -74.005974)); // Example gym 3 (Manhattan)
    }

    private void showDemoSearchResults(String query) {
        // Simulate search and show a message to the user
        Toast.makeText(getContext(), "Demo Search: Showing results for '" + query + "' (No API used)", Toast.LENGTH_SHORT).show();

        // Add some demo gyms to the map based on the query (mock behavior)
        googleMap.clear(); // Clear any existing markers

        // Re-add demo gyms with markers
        for (LatLng location : gymLocations) {
            googleMap.addMarker(new MarkerOptions().position(location).title("Gym"));
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        mapView.onResume();  // Important to call this
    }

    @Override
    public void onPause() {
        super.onPause();
        mapView.onPause();  // Important to call this
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        mapView.onDestroy();  // Important to call this
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        mapView.onLowMemory();  // Important to call this
    }
}
