package com.example.moviebackend.respositories;

import com.example.moviebackend.data.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepositories extends JpaRepository<Movie, Long> {

        }
