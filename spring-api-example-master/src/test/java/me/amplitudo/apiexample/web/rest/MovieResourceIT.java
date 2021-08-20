package me.amplitudo.apiexample.web.rest;

import me.amplitudo.apiexample.ApiexampleApp;
import me.amplitudo.apiexample.domain.Movie;
import me.amplitudo.apiexample.repository.MovieRepository;
import me.amplitudo.apiexample.service.MovieService;
import me.amplitudo.apiexample.service.dto.MovieDTO;
import me.amplitudo.apiexample.service.mapper.MovieMapper;
import me.amplitudo.apiexample.service.dto.MovieCriteria;
import me.amplitudo.apiexample.service.MovieQueryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MovieResource} REST controller.
 */
@SpringBootTest(classes = ApiexampleApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MovieResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECTOR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DIRECTOR_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_WRITER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_WRITER_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_DURATION = 1;
    private static final Integer UPDATED_DURATION = 2;
    private static final Integer SMALLER_DURATION = 1 - 1;

    private static final Integer DEFAULT_RATING = 1;
    private static final Integer UPDATED_RATING = 2;
    private static final Integer SMALLER_RATING = 1 - 1;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private MovieMapper movieMapper;

    @Autowired
    private MovieService movieService;

    @Autowired
    private MovieQueryService movieQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMovieMockMvc;

    private Movie movie;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Movie createEntity(EntityManager em) {
        Movie movie = new Movie()
            .name(DEFAULT_NAME)
            .directorName(DEFAULT_DIRECTOR_NAME)
            .writerName(DEFAULT_WRITER_NAME)
            .duration(DEFAULT_DURATION)
            .rating(DEFAULT_RATING);
        return movie;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Movie createUpdatedEntity(EntityManager em) {
        Movie movie = new Movie()
            .name(UPDATED_NAME)
            .directorName(UPDATED_DIRECTOR_NAME)
            .writerName(UPDATED_WRITER_NAME)
            .duration(UPDATED_DURATION)
            .rating(UPDATED_RATING);
        return movie;
    }

    @BeforeEach
    public void initTest() {
        movie = createEntity(em);
    }

    @Test
    @Transactional
    public void createMovie() throws Exception {
        int databaseSizeBeforeCreate = movieRepository.findAll().size();
        // Create the Movie
        MovieDTO movieDTO = movieMapper.toDto(movie);
        restMovieMockMvc.perform(post("/api/movies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(movieDTO)))
            .andExpect(status().isCreated());

        // Validate the Movie in the database
        List<Movie> movieList = movieRepository.findAll();
        assertThat(movieList).hasSize(databaseSizeBeforeCreate + 1);
        Movie testMovie = movieList.get(movieList.size() - 1);
        assertThat(testMovie.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testMovie.getDirectorName()).isEqualTo(DEFAULT_DIRECTOR_NAME);
        assertThat(testMovie.getWriterName()).isEqualTo(DEFAULT_WRITER_NAME);
        assertThat(testMovie.getDuration()).isEqualTo(DEFAULT_DURATION);
        assertThat(testMovie.getRating()).isEqualTo(DEFAULT_RATING);
    }

    @Test
    @Transactional
    public void createMovieWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = movieRepository.findAll().size();

        // Create the Movie with an existing ID
        movie.setId(1L);
        MovieDTO movieDTO = movieMapper.toDto(movie);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMovieMockMvc.perform(post("/api/movies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(movieDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Movie in the database
        List<Movie> movieList = movieRepository.findAll();
        assertThat(movieList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = movieRepository.findAll().size();
        // set the field null
        movie.setName(null);

        // Create the Movie, which fails.
        MovieDTO movieDTO = movieMapper.toDto(movie);


        restMovieMockMvc.perform(post("/api/movies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(movieDTO)))
            .andExpect(status().isBadRequest());

        List<Movie> movieList = movieRepository.findAll();
        assertThat(movieList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDirectorNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = movieRepository.findAll().size();
        // set the field null
        movie.setDirectorName(null);

        // Create the Movie, which fails.
        MovieDTO movieDTO = movieMapper.toDto(movie);


        restMovieMockMvc.perform(post("/api/movies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(movieDTO)))
            .andExpect(status().isBadRequest());

        List<Movie> movieList = movieRepository.findAll();
        assertThat(movieList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkWriterNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = movieRepository.findAll().size();
        // set the field null
        movie.setWriterName(null);

        // Create the Movie, which fails.
        MovieDTO movieDTO = movieMapper.toDto(movie);


        restMovieMockMvc.perform(post("/api/movies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(movieDTO)))
            .andExpect(status().isBadRequest());

        List<Movie> movieList = movieRepository.findAll();
        assertThat(movieList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDurationIsRequired() throws Exception {
        int databaseSizeBeforeTest = movieRepository.findAll().size();
        // set the field null
        movie.setDuration(null);

        // Create the Movie, which fails.
        MovieDTO movieDTO = movieMapper.toDto(movie);


        restMovieMockMvc.perform(post("/api/movies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(movieDTO)))
            .andExpect(status().isBadRequest());

        List<Movie> movieList = movieRepository.findAll();
        assertThat(movieList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRatingIsRequired() throws Exception {
        int databaseSizeBeforeTest = movieRepository.findAll().size();
        // set the field null
        movie.setRating(null);

        // Create the Movie, which fails.
        MovieDTO movieDTO = movieMapper.toDto(movie);


        restMovieMockMvc.perform(post("/api/movies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(movieDTO)))
            .andExpect(status().isBadRequest());

        List<Movie> movieList = movieRepository.findAll();
        assertThat(movieList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMovies() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList
        restMovieMockMvc.perform(get("/api/movies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(movie.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].directorName").value(hasItem(DEFAULT_DIRECTOR_NAME)))
            .andExpect(jsonPath("$.[*].writerName").value(hasItem(DEFAULT_WRITER_NAME)))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION)))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING)));
    }
    
    @Test
    @Transactional
    public void getMovie() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get the movie
        restMovieMockMvc.perform(get("/api/movies/{id}", movie.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(movie.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.directorName").value(DEFAULT_DIRECTOR_NAME))
            .andExpect(jsonPath("$.writerName").value(DEFAULT_WRITER_NAME))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING));
    }


    @Test
    @Transactional
    public void getMoviesByIdFiltering() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        Long id = movie.getId();

        defaultMovieShouldBeFound("id.equals=" + id);
        defaultMovieShouldNotBeFound("id.notEquals=" + id);

        defaultMovieShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultMovieShouldNotBeFound("id.greaterThan=" + id);

        defaultMovieShouldBeFound("id.lessThanOrEqual=" + id);
        defaultMovieShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllMoviesByNameIsEqualToSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where name equals to DEFAULT_NAME
        defaultMovieShouldBeFound("name.equals=" + DEFAULT_NAME);

        // Get all the movieList where name equals to UPDATED_NAME
        defaultMovieShouldNotBeFound("name.equals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllMoviesByNameIsNotEqualToSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where name not equals to DEFAULT_NAME
        defaultMovieShouldNotBeFound("name.notEquals=" + DEFAULT_NAME);

        // Get all the movieList where name not equals to UPDATED_NAME
        defaultMovieShouldBeFound("name.notEquals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllMoviesByNameIsInShouldWork() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where name in DEFAULT_NAME or UPDATED_NAME
        defaultMovieShouldBeFound("name.in=" + DEFAULT_NAME + "," + UPDATED_NAME);

        // Get all the movieList where name equals to UPDATED_NAME
        defaultMovieShouldNotBeFound("name.in=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllMoviesByNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where name is not null
        defaultMovieShouldBeFound("name.specified=true");

        // Get all the movieList where name is null
        defaultMovieShouldNotBeFound("name.specified=false");
    }
                @Test
    @Transactional
    public void getAllMoviesByNameContainsSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where name contains DEFAULT_NAME
        defaultMovieShouldBeFound("name.contains=" + DEFAULT_NAME);

        // Get all the movieList where name contains UPDATED_NAME
        defaultMovieShouldNotBeFound("name.contains=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllMoviesByNameNotContainsSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where name does not contain DEFAULT_NAME
        defaultMovieShouldNotBeFound("name.doesNotContain=" + DEFAULT_NAME);

        // Get all the movieList where name does not contain UPDATED_NAME
        defaultMovieShouldBeFound("name.doesNotContain=" + UPDATED_NAME);
    }


    @Test
    @Transactional
    public void getAllMoviesByDirectorNameIsEqualToSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where directorName equals to DEFAULT_DIRECTOR_NAME
        defaultMovieShouldBeFound("directorName.equals=" + DEFAULT_DIRECTOR_NAME);

        // Get all the movieList where directorName equals to UPDATED_DIRECTOR_NAME
        defaultMovieShouldNotBeFound("directorName.equals=" + UPDATED_DIRECTOR_NAME);
    }

    @Test
    @Transactional
    public void getAllMoviesByDirectorNameIsNotEqualToSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where directorName not equals to DEFAULT_DIRECTOR_NAME
        defaultMovieShouldNotBeFound("directorName.notEquals=" + DEFAULT_DIRECTOR_NAME);

        // Get all the movieList where directorName not equals to UPDATED_DIRECTOR_NAME
        defaultMovieShouldBeFound("directorName.notEquals=" + UPDATED_DIRECTOR_NAME);
    }

    @Test
    @Transactional
    public void getAllMoviesByDirectorNameIsInShouldWork() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where directorName in DEFAULT_DIRECTOR_NAME or UPDATED_DIRECTOR_NAME
        defaultMovieShouldBeFound("directorName.in=" + DEFAULT_DIRECTOR_NAME + "," + UPDATED_DIRECTOR_NAME);

        // Get all the movieList where directorName equals to UPDATED_DIRECTOR_NAME
        defaultMovieShouldNotBeFound("directorName.in=" + UPDATED_DIRECTOR_NAME);
    }

    @Test
    @Transactional
    public void getAllMoviesByDirectorNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where directorName is not null
        defaultMovieShouldBeFound("directorName.specified=true");

        // Get all the movieList where directorName is null
        defaultMovieShouldNotBeFound("directorName.specified=false");
    }
                @Test
    @Transactional
    public void getAllMoviesByDirectorNameContainsSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where directorName contains DEFAULT_DIRECTOR_NAME
        defaultMovieShouldBeFound("directorName.contains=" + DEFAULT_DIRECTOR_NAME);

        // Get all the movieList where directorName contains UPDATED_DIRECTOR_NAME
        defaultMovieShouldNotBeFound("directorName.contains=" + UPDATED_DIRECTOR_NAME);
    }

    @Test
    @Transactional
    public void getAllMoviesByDirectorNameNotContainsSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where directorName does not contain DEFAULT_DIRECTOR_NAME
        defaultMovieShouldNotBeFound("directorName.doesNotContain=" + DEFAULT_DIRECTOR_NAME);

        // Get all the movieList where directorName does not contain UPDATED_DIRECTOR_NAME
        defaultMovieShouldBeFound("directorName.doesNotContain=" + UPDATED_DIRECTOR_NAME);
    }


    @Test
    @Transactional
    public void getAllMoviesByWriterNameIsEqualToSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where writerName equals to DEFAULT_WRITER_NAME
        defaultMovieShouldBeFound("writerName.equals=" + DEFAULT_WRITER_NAME);

        // Get all the movieList where writerName equals to UPDATED_WRITER_NAME
        defaultMovieShouldNotBeFound("writerName.equals=" + UPDATED_WRITER_NAME);
    }

    @Test
    @Transactional
    public void getAllMoviesByWriterNameIsNotEqualToSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where writerName not equals to DEFAULT_WRITER_NAME
        defaultMovieShouldNotBeFound("writerName.notEquals=" + DEFAULT_WRITER_NAME);

        // Get all the movieList where writerName not equals to UPDATED_WRITER_NAME
        defaultMovieShouldBeFound("writerName.notEquals=" + UPDATED_WRITER_NAME);
    }

    @Test
    @Transactional
    public void getAllMoviesByWriterNameIsInShouldWork() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where writerName in DEFAULT_WRITER_NAME or UPDATED_WRITER_NAME
        defaultMovieShouldBeFound("writerName.in=" + DEFAULT_WRITER_NAME + "," + UPDATED_WRITER_NAME);

        // Get all the movieList where writerName equals to UPDATED_WRITER_NAME
        defaultMovieShouldNotBeFound("writerName.in=" + UPDATED_WRITER_NAME);
    }

    @Test
    @Transactional
    public void getAllMoviesByWriterNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where writerName is not null
        defaultMovieShouldBeFound("writerName.specified=true");

        // Get all the movieList where writerName is null
        defaultMovieShouldNotBeFound("writerName.specified=false");
    }
                @Test
    @Transactional
    public void getAllMoviesByWriterNameContainsSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where writerName contains DEFAULT_WRITER_NAME
        defaultMovieShouldBeFound("writerName.contains=" + DEFAULT_WRITER_NAME);

        // Get all the movieList where writerName contains UPDATED_WRITER_NAME
        defaultMovieShouldNotBeFound("writerName.contains=" + UPDATED_WRITER_NAME);
    }

    @Test
    @Transactional
    public void getAllMoviesByWriterNameNotContainsSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where writerName does not contain DEFAULT_WRITER_NAME
        defaultMovieShouldNotBeFound("writerName.doesNotContain=" + DEFAULT_WRITER_NAME);

        // Get all the movieList where writerName does not contain UPDATED_WRITER_NAME
        defaultMovieShouldBeFound("writerName.doesNotContain=" + UPDATED_WRITER_NAME);
    }


    @Test
    @Transactional
    public void getAllMoviesByDurationIsEqualToSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where duration equals to DEFAULT_DURATION
        defaultMovieShouldBeFound("duration.equals=" + DEFAULT_DURATION);

        // Get all the movieList where duration equals to UPDATED_DURATION
        defaultMovieShouldNotBeFound("duration.equals=" + UPDATED_DURATION);
    }

    @Test
    @Transactional
    public void getAllMoviesByDurationIsNotEqualToSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where duration not equals to DEFAULT_DURATION
        defaultMovieShouldNotBeFound("duration.notEquals=" + DEFAULT_DURATION);

        // Get all the movieList where duration not equals to UPDATED_DURATION
        defaultMovieShouldBeFound("duration.notEquals=" + UPDATED_DURATION);
    }

    @Test
    @Transactional
    public void getAllMoviesByDurationIsInShouldWork() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where duration in DEFAULT_DURATION or UPDATED_DURATION
        defaultMovieShouldBeFound("duration.in=" + DEFAULT_DURATION + "," + UPDATED_DURATION);

        // Get all the movieList where duration equals to UPDATED_DURATION
        defaultMovieShouldNotBeFound("duration.in=" + UPDATED_DURATION);
    }

    @Test
    @Transactional
    public void getAllMoviesByDurationIsNullOrNotNull() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where duration is not null
        defaultMovieShouldBeFound("duration.specified=true");

        // Get all the movieList where duration is null
        defaultMovieShouldNotBeFound("duration.specified=false");
    }

    @Test
    @Transactional
    public void getAllMoviesByDurationIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where duration is greater than or equal to DEFAULT_DURATION
        defaultMovieShouldBeFound("duration.greaterThanOrEqual=" + DEFAULT_DURATION);

        // Get all the movieList where duration is greater than or equal to UPDATED_DURATION
        defaultMovieShouldNotBeFound("duration.greaterThanOrEqual=" + UPDATED_DURATION);
    }

    @Test
    @Transactional
    public void getAllMoviesByDurationIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where duration is less than or equal to DEFAULT_DURATION
        defaultMovieShouldBeFound("duration.lessThanOrEqual=" + DEFAULT_DURATION);

        // Get all the movieList where duration is less than or equal to SMALLER_DURATION
        defaultMovieShouldNotBeFound("duration.lessThanOrEqual=" + SMALLER_DURATION);
    }

    @Test
    @Transactional
    public void getAllMoviesByDurationIsLessThanSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where duration is less than DEFAULT_DURATION
        defaultMovieShouldNotBeFound("duration.lessThan=" + DEFAULT_DURATION);

        // Get all the movieList where duration is less than UPDATED_DURATION
        defaultMovieShouldBeFound("duration.lessThan=" + UPDATED_DURATION);
    }

    @Test
    @Transactional
    public void getAllMoviesByDurationIsGreaterThanSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where duration is greater than DEFAULT_DURATION
        defaultMovieShouldNotBeFound("duration.greaterThan=" + DEFAULT_DURATION);

        // Get all the movieList where duration is greater than SMALLER_DURATION
        defaultMovieShouldBeFound("duration.greaterThan=" + SMALLER_DURATION);
    }


    @Test
    @Transactional
    public void getAllMoviesByRatingIsEqualToSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where rating equals to DEFAULT_RATING
        defaultMovieShouldBeFound("rating.equals=" + DEFAULT_RATING);

        // Get all the movieList where rating equals to UPDATED_RATING
        defaultMovieShouldNotBeFound("rating.equals=" + UPDATED_RATING);
    }

    @Test
    @Transactional
    public void getAllMoviesByRatingIsNotEqualToSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where rating not equals to DEFAULT_RATING
        defaultMovieShouldNotBeFound("rating.notEquals=" + DEFAULT_RATING);

        // Get all the movieList where rating not equals to UPDATED_RATING
        defaultMovieShouldBeFound("rating.notEquals=" + UPDATED_RATING);
    }

    @Test
    @Transactional
    public void getAllMoviesByRatingIsInShouldWork() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where rating in DEFAULT_RATING or UPDATED_RATING
        defaultMovieShouldBeFound("rating.in=" + DEFAULT_RATING + "," + UPDATED_RATING);

        // Get all the movieList where rating equals to UPDATED_RATING
        defaultMovieShouldNotBeFound("rating.in=" + UPDATED_RATING);
    }

    @Test
    @Transactional
    public void getAllMoviesByRatingIsNullOrNotNull() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where rating is not null
        defaultMovieShouldBeFound("rating.specified=true");

        // Get all the movieList where rating is null
        defaultMovieShouldNotBeFound("rating.specified=false");
    }

    @Test
    @Transactional
    public void getAllMoviesByRatingIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where rating is greater than or equal to DEFAULT_RATING
        defaultMovieShouldBeFound("rating.greaterThanOrEqual=" + DEFAULT_RATING);

        // Get all the movieList where rating is greater than or equal to UPDATED_RATING
        defaultMovieShouldNotBeFound("rating.greaterThanOrEqual=" + UPDATED_RATING);
    }

    @Test
    @Transactional
    public void getAllMoviesByRatingIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where rating is less than or equal to DEFAULT_RATING
        defaultMovieShouldBeFound("rating.lessThanOrEqual=" + DEFAULT_RATING);

        // Get all the movieList where rating is less than or equal to SMALLER_RATING
        defaultMovieShouldNotBeFound("rating.lessThanOrEqual=" + SMALLER_RATING);
    }

    @Test
    @Transactional
    public void getAllMoviesByRatingIsLessThanSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where rating is less than DEFAULT_RATING
        defaultMovieShouldNotBeFound("rating.lessThan=" + DEFAULT_RATING);

        // Get all the movieList where rating is less than UPDATED_RATING
        defaultMovieShouldBeFound("rating.lessThan=" + UPDATED_RATING);
    }

    @Test
    @Transactional
    public void getAllMoviesByRatingIsGreaterThanSomething() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        // Get all the movieList where rating is greater than DEFAULT_RATING
        defaultMovieShouldNotBeFound("rating.greaterThan=" + DEFAULT_RATING);

        // Get all the movieList where rating is greater than SMALLER_RATING
        defaultMovieShouldBeFound("rating.greaterThan=" + SMALLER_RATING);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultMovieShouldBeFound(String filter) throws Exception {
        restMovieMockMvc.perform(get("/api/movies?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(movie.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].directorName").value(hasItem(DEFAULT_DIRECTOR_NAME)))
            .andExpect(jsonPath("$.[*].writerName").value(hasItem(DEFAULT_WRITER_NAME)))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION)))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING)));

        // Check, that the count call also returns 1
        restMovieMockMvc.perform(get("/api/movies/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultMovieShouldNotBeFound(String filter) throws Exception {
        restMovieMockMvc.perform(get("/api/movies?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restMovieMockMvc.perform(get("/api/movies/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    public void getNonExistingMovie() throws Exception {
        // Get the movie
        restMovieMockMvc.perform(get("/api/movies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMovie() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        int databaseSizeBeforeUpdate = movieRepository.findAll().size();

        // Update the movie
        Movie updatedMovie = movieRepository.findById(movie.getId()).get();
        // Disconnect from session so that the updates on updatedMovie are not directly saved in db
        em.detach(updatedMovie);
        updatedMovie
            .name(UPDATED_NAME)
            .directorName(UPDATED_DIRECTOR_NAME)
            .writerName(UPDATED_WRITER_NAME)
            .duration(UPDATED_DURATION)
            .rating(UPDATED_RATING);
        MovieDTO movieDTO = movieMapper.toDto(updatedMovie);

        restMovieMockMvc.perform(put("/api/movies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(movieDTO)))
            .andExpect(status().isOk());

        // Validate the Movie in the database
        List<Movie> movieList = movieRepository.findAll();
        assertThat(movieList).hasSize(databaseSizeBeforeUpdate);
        Movie testMovie = movieList.get(movieList.size() - 1);
        assertThat(testMovie.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testMovie.getDirectorName()).isEqualTo(UPDATED_DIRECTOR_NAME);
        assertThat(testMovie.getWriterName()).isEqualTo(UPDATED_WRITER_NAME);
        assertThat(testMovie.getDuration()).isEqualTo(UPDATED_DURATION);
        assertThat(testMovie.getRating()).isEqualTo(UPDATED_RATING);
    }

    @Test
    @Transactional
    public void updateNonExistingMovie() throws Exception {
        int databaseSizeBeforeUpdate = movieRepository.findAll().size();

        // Create the Movie
        MovieDTO movieDTO = movieMapper.toDto(movie);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovieMockMvc.perform(put("/api/movies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(movieDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Movie in the database
        List<Movie> movieList = movieRepository.findAll();
        assertThat(movieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMovie() throws Exception {
        // Initialize the database
        movieRepository.saveAndFlush(movie);

        int databaseSizeBeforeDelete = movieRepository.findAll().size();

        // Delete the movie
        restMovieMockMvc.perform(delete("/api/movies/{id}", movie.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Movie> movieList = movieRepository.findAll();
        assertThat(movieList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
