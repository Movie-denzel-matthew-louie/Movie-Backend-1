package com.example.moviebackend.respositories;

import com.example.moviebackend.data.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenresRepositories  extends JpaRepository<Genre, Long> {
    Genre findByName(String name);
}
