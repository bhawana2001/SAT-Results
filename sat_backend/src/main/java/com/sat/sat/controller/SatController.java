package com.sat.sat.controller;
import com.sat.sat.entity.SatResults;
import com.sat.sat.service.SatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/satresults")
@CrossOrigin("*")
public class SatController {

    @Autowired
    private SatService satService;

    @PostMapping
    public ResponseEntity<SatResults> insertSATResult(@RequestBody SatResults satResult) {
        SatResults insertedResult = satService.insertSATResult(satResult);
        return ResponseEntity.ok(insertedResult);
    }

    @GetMapping
    public ResponseEntity<List<SatResults>> getAllSATResults() {
        List<SatResults> allResults = satService.getAllSATResults();
        // Sort the results by dateRecorded in descending order (most recent to oldest)
        Collections.sort(allResults, Comparator.comparing(SatResults::getDateRecorded).reversed());
        return ResponseEntity.ok(allResults);
    }

    @GetMapping("/rank/{name}")
    public ResponseEntity<Integer> getRankByName(@PathVariable String name) {
        int rank = satService.getRankByName(name);
        return ResponseEntity.ok(rank);
    }

    @PutMapping("/{name}")
    public ResponseEntity<SatResults> updateScoreByName(@PathVariable String name, @RequestBody Map<String, Object> requestBody) {
        if (requestBody.containsKey("satScore") && requestBody.get("satScore") instanceof Integer) {
            int newScore = (int) requestBody.get("satScore");
            SatResults updatedResult = satService.updateScoreByName(name, newScore);
            return ResponseEntity.ok(updatedResult);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }


    @DeleteMapping("/{name}")
    public ResponseEntity<Void> deleteSATResultByName(@PathVariable String name) {
        satService.deleteSATResultByName(name);
        return ResponseEntity.noContent().build();
    }
}
