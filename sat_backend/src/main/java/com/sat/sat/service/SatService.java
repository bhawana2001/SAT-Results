package com.sat.sat.service;

import com.sat.sat.entity.SatResults;
import com.sat.sat.exception.SatException;
import com.sat.sat.repository.SatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class SatService {

    @Autowired
    private SatRepository satRepository;

    public SatResults insertSATResult(SatResults satResult) {
        if (satRepository.existsById(satResult.getName())) {
            throw new SatException("Result already exist with this name: " + satResult.getName());
        }
        // Calculate 'Passed' based on SAT score
        satResult.setPassed(satResult.getSatScore() > 30);
        return satRepository.save(satResult);
    }

    public List<SatResults> getAllSATResults() {
        return satRepository.findAll();
    }

    public int getRankByName(String name) {
        List<SatResults> allResults = satRepository.findAll();
        allResults.sort(Comparator.comparing(SatResults::getSatScore).reversed());
        for (int i = 0; i < allResults.size(); i++) {
            if (allResults.get(i).getName().equalsIgnoreCase(name)) {
                return i + 1; // Rank is 1-based
            }
        }
        throw new SatException("Result doesn't found with this name: "+name);
    }

    public SatResults updateScoreByName(String name, int newScore) {
        if(satRepository.existsById(name)) {
            SatResults result = satRepository.findByName(name);
            if (result != null) {
                result.setSatScore(newScore);
                result.setPassed(newScore > 30);
                return satRepository.save(result);
            } else {
                throw new SatException("Result doesn't found with this name: " + name);
            }
        }else{
            throw new SatException("Result doesn't found with this name: " + name);
        }
    }

    public void deleteSATResultByName(String name) {
        SatResults result = satRepository.findByName(name);
        if (result != null) {
            satRepository.delete(result);
        }else{
            throw new SatException("Result doesn't found with this name: "+name);
        }
    }
}
