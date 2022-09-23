package com.example.moviebackend.controllers;


import com.example.moviebackend.data.Movie;
import com.example.moviebackend.respositories.MovieRepositories;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping(value = "api/movies", produces = "application/json")
public class MoviesController {
    private MovieRepositories movieRepositories;

    @GetMapping("")
    private List<Movie> fetchAllMovies() {

        return movieRepositories.findAll();

    }


    @GetMapping("/{id}")
    public Optional<Movie> fetchPostById(@PathVariable long id) {
        Optional<Movie> optionalPost = movieRepositories.findById(id);
        if(optionalPost.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Movie id " + id + " not found");
        }
        return optionalPost;
    }






}
