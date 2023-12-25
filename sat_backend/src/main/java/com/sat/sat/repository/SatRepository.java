package com.sat.sat.repository;

import com.sat.sat.entity.SatResults;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SatRepository extends JpaRepository<SatResults,String> {
    SatResults findByName(String name);
}
