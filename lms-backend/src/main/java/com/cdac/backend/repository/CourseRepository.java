package com.cdac.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cdac.backend.model.Course;
@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
	   // Search courses by branch name or description
    @Query("SELECT c FROM Course c WHERE LOWER(c.branchName) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(c.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Course> searchCourses(String query);
}
