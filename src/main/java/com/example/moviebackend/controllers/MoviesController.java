package com.example.moviebackend.controllers;


import com.example.moviebackend.data.Genre;
import com.example.moviebackend.data.Movie;
import com.example.moviebackend.misc.FieldHelper;
import com.example.moviebackend.respositories.GenresRepositories;
import com.example.moviebackend.respositories.MovieRepositories;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/movies", produces = "application/json")
public class MoviesController {
    private MovieRepositories movieRepositories;
    private GenresRepositories genresRepositories;

    @GetMapping("")
    private List<Movie> fetchAllMovies() {

        return movieRepositories.findAll();

    }


    @GetMapping("/{id}")
    public Optional<Movie> fetchMovieById(@PathVariable long id) {
        Optional<Movie> optionalPost = movieRepositories.findById(id);
        if (optionalPost.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Movie id " + id + " not found");
        }
        return optionalPost;
    }


    @PostMapping("")
    public void createMovie(@RequestBody Movie newMovie){


        System.out.println(newMovie);
        // use first 2 categories for the post by default


        movieRepositories.save(newMovie);
    }

    @DeleteMapping("/{id}")

    public void deleteMovieById(@PathVariable long id) {


        Optional<Movie> optionalPost = movieRepositories.findById(id);
        if (optionalPost.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post id " + id + " not found");
        }
        // grab the original post from the optional and check the logged in user
        Movie originalPost = optionalPost.get();

//

        movieRepositories.deleteById(id);

    }



    @PutMapping ("/{id}")
    private void updateMovie(@RequestBody Movie updatedMovie, @PathVariable  long id){
        // Check if the record exxists
        // if not throw a 404
        Optional<Movie>movie = movieRepositories.findById(id);
        if(movie.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, " Cannot find the id ");
        }


        updatedMovie.setId(id);
        movieRepositories.save(updatedMovie);

    }
}