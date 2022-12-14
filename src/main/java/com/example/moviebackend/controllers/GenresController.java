package com.example.moviebackend.controllers;

import com.example.moviebackend.data.Genre;
import com.example.moviebackend.data.Movie;
import com.example.moviebackend.respositories.GenresRepositories;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@RestController
@RequestMapping(value = "api/genres", produces = "application/json")
public class GenresController {

    private GenresRepositories genresRepositories;

    @GetMapping("/genres")
    private List<Genre> fetchAllGenres( ) {

        return genresRepositories.findAll();

    }
    @GetMapping("/search")
    private Genre fetchGenreByGenrename(@RequestParam String genreName) {
        Genre genre = genresRepositories.findByName(genreName);
        if(genre == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Genre " + genreName + " not found");
        }
        return genre;
    }


}