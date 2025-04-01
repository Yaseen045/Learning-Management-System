package com.cdac.backend.repository;

import com.cdac.backend.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {
    List<Module> findByCourseId(Long courseId);
    // Search modules by module name or syllabus
    @Query("SELECT m FROM Module m WHERE LOWER(m.moduleName) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(m.syllabus) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Module> searchModules(String query);
    
}
