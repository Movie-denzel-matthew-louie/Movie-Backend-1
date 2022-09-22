package com.example.moviebackend.controllers;

import com.example.moviebackend.data.Genre;
import com.example.moviebackend.respositories.GenresRepositories;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "api/genres", produces = "application/json")
public class GenresController {

    private GenresRepositories genresRepositories;

    @GetMapping("")
    private List<Genre> fetchAllGenres(@RequestParam String genreName) {

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
