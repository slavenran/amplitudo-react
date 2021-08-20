package me.amplitudo.apiexample.web.rest;

import me.amplitudo.apiexample.ApiexampleApp;
import me.amplitudo.apiexample.domain.Book;
import me.amplitudo.apiexample.repository.BookRepository;
import me.amplitudo.apiexample.service.BookService;
import me.amplitudo.apiexample.service.dto.BookDTO;
import me.amplitudo.apiexample.service.mapper.BookMapper;
import me.amplitudo.apiexample.service.dto.BookCriteria;
import me.amplitudo.apiexample.service.BookQueryService;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link BookResource} REST controller.
 */
@SpringBootTest(classes = ApiexampleApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BookResourceIT {

    private static final String DEFAULT_ISBN = "AAAAAAAAAA";
    private static final String UPDATED_ISBN = "BBBBBBBBBB";

    private static final String DEFAULT_WRITER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_WRITER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PUBLISHER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PUBLISHER_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_PUBLISHED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PUBLISHED_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_PUBLISHED_DATE = LocalDate.ofEpochDay(-1L);

    private static final String DEFAULT_GENRE = "AAAAAAAAAA";
    private static final String UPDATED_GENRE = "BBBBBBBBBB";

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookMapper bookMapper;

    @Autowired
    private BookService bookService;

    @Autowired
    private BookQueryService bookQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBookMockMvc;

    private Book book;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Book createEntity(EntityManager em) {
        Book book = new Book()
            .isbn(DEFAULT_ISBN)
            .writerName(DEFAULT_WRITER_NAME)
            .publisherName(DEFAULT_PUBLISHER_NAME)
            .publishedDate(DEFAULT_PUBLISHED_DATE)
            .genre(DEFAULT_GENRE);
        return book;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Book createUpdatedEntity(EntityManager em) {
        Book book = new Book()
            .isbn(UPDATED_ISBN)
            .writerName(UPDATED_WRITER_NAME)
            .publisherName(UPDATED_PUBLISHER_NAME)
            .publishedDate(UPDATED_PUBLISHED_DATE)
            .genre(UPDATED_GENRE);
        return book;
    }

    @BeforeEach
    public void initTest() {
        book = createEntity(em);
    }

    @Test
    @Transactional
    public void createBook() throws Exception {
        int databaseSizeBeforeCreate = bookRepository.findAll().size();
        // Create the Book
        BookDTO bookDTO = bookMapper.toDto(book);
        restBookMockMvc.perform(post("/api/books")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bookDTO)))
            .andExpect(status().isCreated());

        // Validate the Book in the database
        List<Book> bookList = bookRepository.findAll();
        assertThat(bookList).hasSize(databaseSizeBeforeCreate + 1);
        Book testBook = bookList.get(bookList.size() - 1);
        assertThat(testBook.getIsbn()).isEqualTo(DEFAULT_ISBN);
        assertThat(testBook.getWriterName()).isEqualTo(DEFAULT_WRITER_NAME);
        assertThat(testBook.getPublisherName()).isEqualTo(DEFAULT_PUBLISHER_NAME);
        assertThat(testBook.getPublishedDate()).isEqualTo(DEFAULT_PUBLISHED_DATE);
        assertThat(testBook.getGenre()).isEqualTo(DEFAULT_GENRE);
    }

    @Test
    @Transactional
    public void createBookWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bookRepository.findAll().size();

        // Create the Book with an existing ID
        book.setId(1L);
        BookDTO bookDTO = bookMapper.toDto(book);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBookMockMvc.perform(post("/api/books")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bookDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Book in the database
        List<Book> bookList = bookRepository.findAll();
        assertThat(bookList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkIsbnIsRequired() throws Exception {
        int databaseSizeBeforeTest = bookRepository.findAll().size();
        // set the field null
        book.setIsbn(null);

        // Create the Book, which fails.
        BookDTO bookDTO = bookMapper.toDto(book);


        restBookMockMvc.perform(post("/api/books")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bookDTO)))
            .andExpect(status().isBadRequest());

        List<Book> bookList = bookRepository.findAll();
        assertThat(bookList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkWriterNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = bookRepository.findAll().size();
        // set the field null
        book.setWriterName(null);

        // Create the Book, which fails.
        BookDTO bookDTO = bookMapper.toDto(book);


        restBookMockMvc.perform(post("/api/books")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bookDTO)))
            .andExpect(status().isBadRequest());

        List<Book> bookList = bookRepository.findAll();
        assertThat(bookList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPublisherNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = bookRepository.findAll().size();
        // set the field null
        book.setPublisherName(null);

        // Create the Book, which fails.
        BookDTO bookDTO = bookMapper.toDto(book);


        restBookMockMvc.perform(post("/api/books")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bookDTO)))
            .andExpect(status().isBadRequest());

        List<Book> bookList = bookRepository.findAll();
        assertThat(bookList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPublishedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = bookRepository.findAll().size();
        // set the field null
        book.setPublishedDate(null);

        // Create the Book, which fails.
        BookDTO bookDTO = bookMapper.toDto(book);


        restBookMockMvc.perform(post("/api/books")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bookDTO)))
            .andExpect(status().isBadRequest());

        List<Book> bookList = bookRepository.findAll();
        assertThat(bookList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGenreIsRequired() throws Exception {
        int databaseSizeBeforeTest = bookRepository.findAll().size();
        // set the field null
        book.setGenre(null);

        // Create the Book, which fails.
        BookDTO bookDTO = bookMapper.toDto(book);


        restBookMockMvc.perform(post("/api/books")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bookDTO)))
            .andExpect(status().isBadRequest());

        List<Book> bookList = bookRepository.findAll();
        assertThat(bookList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBooks() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList
        restBookMockMvc.perform(get("/api/books?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(book.getId().intValue())))
            .andExpect(jsonPath("$.[*].isbn").value(hasItem(DEFAULT_ISBN)))
            .andExpect(jsonPath("$.[*].writerName").value(hasItem(DEFAULT_WRITER_NAME)))
            .andExpect(jsonPath("$.[*].publisherName").value(hasItem(DEFAULT_PUBLISHER_NAME)))
            .andExpect(jsonPath("$.[*].publishedDate").value(hasItem(DEFAULT_PUBLISHED_DATE.toString())))
            .andExpect(jsonPath("$.[*].genre").value(hasItem(DEFAULT_GENRE)));
    }
    
    @Test
    @Transactional
    public void getBook() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get the book
        restBookMockMvc.perform(get("/api/books/{id}", book.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(book.getId().intValue()))
            .andExpect(jsonPath("$.isbn").value(DEFAULT_ISBN))
            .andExpect(jsonPath("$.writerName").value(DEFAULT_WRITER_NAME))
            .andExpect(jsonPath("$.publisherName").value(DEFAULT_PUBLISHER_NAME))
            .andExpect(jsonPath("$.publishedDate").value(DEFAULT_PUBLISHED_DATE.toString()))
            .andExpect(jsonPath("$.genre").value(DEFAULT_GENRE));
    }


    @Test
    @Transactional
    public void getBooksByIdFiltering() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        Long id = book.getId();

        defaultBookShouldBeFound("id.equals=" + id);
        defaultBookShouldNotBeFound("id.notEquals=" + id);

        defaultBookShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultBookShouldNotBeFound("id.greaterThan=" + id);

        defaultBookShouldBeFound("id.lessThanOrEqual=" + id);
        defaultBookShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllBooksByIsbnIsEqualToSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where isbn equals to DEFAULT_ISBN
        defaultBookShouldBeFound("isbn.equals=" + DEFAULT_ISBN);

        // Get all the bookList where isbn equals to UPDATED_ISBN
        defaultBookShouldNotBeFound("isbn.equals=" + UPDATED_ISBN);
    }

    @Test
    @Transactional
    public void getAllBooksByIsbnIsNotEqualToSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where isbn not equals to DEFAULT_ISBN
        defaultBookShouldNotBeFound("isbn.notEquals=" + DEFAULT_ISBN);

        // Get all the bookList where isbn not equals to UPDATED_ISBN
        defaultBookShouldBeFound("isbn.notEquals=" + UPDATED_ISBN);
    }

    @Test
    @Transactional
    public void getAllBooksByIsbnIsInShouldWork() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where isbn in DEFAULT_ISBN or UPDATED_ISBN
        defaultBookShouldBeFound("isbn.in=" + DEFAULT_ISBN + "," + UPDATED_ISBN);

        // Get all the bookList where isbn equals to UPDATED_ISBN
        defaultBookShouldNotBeFound("isbn.in=" + UPDATED_ISBN);
    }

    @Test
    @Transactional
    public void getAllBooksByIsbnIsNullOrNotNull() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where isbn is not null
        defaultBookShouldBeFound("isbn.specified=true");

        // Get all the bookList where isbn is null
        defaultBookShouldNotBeFound("isbn.specified=false");
    }
                @Test
    @Transactional
    public void getAllBooksByIsbnContainsSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where isbn contains DEFAULT_ISBN
        defaultBookShouldBeFound("isbn.contains=" + DEFAULT_ISBN);

        // Get all the bookList where isbn contains UPDATED_ISBN
        defaultBookShouldNotBeFound("isbn.contains=" + UPDATED_ISBN);
    }

    @Test
    @Transactional
    public void getAllBooksByIsbnNotContainsSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where isbn does not contain DEFAULT_ISBN
        defaultBookShouldNotBeFound("isbn.doesNotContain=" + DEFAULT_ISBN);

        // Get all the bookList where isbn does not contain UPDATED_ISBN
        defaultBookShouldBeFound("isbn.doesNotContain=" + UPDATED_ISBN);
    }


    @Test
    @Transactional
    public void getAllBooksByWriterNameIsEqualToSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where writerName equals to DEFAULT_WRITER_NAME
        defaultBookShouldBeFound("writerName.equals=" + DEFAULT_WRITER_NAME);

        // Get all the bookList where writerName equals to UPDATED_WRITER_NAME
        defaultBookShouldNotBeFound("writerName.equals=" + UPDATED_WRITER_NAME);
    }

    @Test
    @Transactional
    public void getAllBooksByWriterNameIsNotEqualToSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where writerName not equals to DEFAULT_WRITER_NAME
        defaultBookShouldNotBeFound("writerName.notEquals=" + DEFAULT_WRITER_NAME);

        // Get all the bookList where writerName not equals to UPDATED_WRITER_NAME
        defaultBookShouldBeFound("writerName.notEquals=" + UPDATED_WRITER_NAME);
    }

    @Test
    @Transactional
    public void getAllBooksByWriterNameIsInShouldWork() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where writerName in DEFAULT_WRITER_NAME or UPDATED_WRITER_NAME
        defaultBookShouldBeFound("writerName.in=" + DEFAULT_WRITER_NAME + "," + UPDATED_WRITER_NAME);

        // Get all the bookList where writerName equals to UPDATED_WRITER_NAME
        defaultBookShouldNotBeFound("writerName.in=" + UPDATED_WRITER_NAME);
    }

    @Test
    @Transactional
    public void getAllBooksByWriterNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where writerName is not null
        defaultBookShouldBeFound("writerName.specified=true");

        // Get all the bookList where writerName is null
        defaultBookShouldNotBeFound("writerName.specified=false");
    }
                @Test
    @Transactional
    public void getAllBooksByWriterNameContainsSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where writerName contains DEFAULT_WRITER_NAME
        defaultBookShouldBeFound("writerName.contains=" + DEFAULT_WRITER_NAME);

        // Get all the bookList where writerName contains UPDATED_WRITER_NAME
        defaultBookShouldNotBeFound("writerName.contains=" + UPDATED_WRITER_NAME);
    }

    @Test
    @Transactional
    public void getAllBooksByWriterNameNotContainsSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where writerName does not contain DEFAULT_WRITER_NAME
        defaultBookShouldNotBeFound("writerName.doesNotContain=" + DEFAULT_WRITER_NAME);

        // Get all the bookList where writerName does not contain UPDATED_WRITER_NAME
        defaultBookShouldBeFound("writerName.doesNotContain=" + UPDATED_WRITER_NAME);
    }


    @Test
    @Transactional
    public void getAllBooksByPublisherNameIsEqualToSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where publisherName equals to DEFAULT_PUBLISHER_NAME
        defaultBookShouldBeFound("publisherName.equals=" + DEFAULT_PUBLISHER_NAME);

        // Get all the bookList where publisherName equals to UPDATED_PUBLISHER_NAME
        defaultBookShouldNotBeFound("publisherName.equals=" + UPDATED_PUBLISHER_NAME);
    }

    @Test
    @Transactional
    public void getAllBooksByPublisherNameIsNotEqualToSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where publisherName not equals to DEFAULT_PUBLISHER_NAME
        defaultBookShouldNotBeFound("publisherName.notEquals=" + DEFAULT_PUBLISHER_NAME);

        // Get all the bookList where publisherName not equals to UPDATED_PUBLISHER_NAME
        defaultBookShouldBeFound("publisherName.notEquals=" + UPDATED_PUBLISHER_NAME);
    }

    @Test
    @Transactional
    public void getAllBooksByPublisherNameIsInShouldWork() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where publisherName in DEFAULT_PUBLISHER_NAME or UPDATED_PUBLISHER_NAME
        defaultBookShouldBeFound("publisherName.in=" + DEFAULT_PUBLISHER_NAME + "," + UPDATED_PUBLISHER_NAME);

        // Get all the bookList where publisherName equals to UPDATED_PUBLISHER_NAME
        defaultBookShouldNotBeFound("publisherName.in=" + UPDATED_PUBLISHER_NAME);
    }

    @Test
    @Transactional
    public void getAllBooksByPublisherNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where publisherName is not null
        defaultBookShouldBeFound("publisherName.specified=true");

        // Get all the bookList where publisherName is null
        defaultBookShouldNotBeFound("publisherName.specified=false");
    }
                @Test
    @Transactional
    public void getAllBooksByPublisherNameContainsSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where publisherName contains DEFAULT_PUBLISHER_NAME
        defaultBookShouldBeFound("publisherName.contains=" + DEFAULT_PUBLISHER_NAME);

        // Get all the bookList where publisherName contains UPDATED_PUBLISHER_NAME
        defaultBookShouldNotBeFound("publisherName.contains=" + UPDATED_PUBLISHER_NAME);
    }

    @Test
    @Transactional
    public void getAllBooksByPublisherNameNotContainsSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where publisherName does not contain DEFAULT_PUBLISHER_NAME
        defaultBookShouldNotBeFound("publisherName.doesNotContain=" + DEFAULT_PUBLISHER_NAME);

        // Get all the bookList where publisherName does not contain UPDATED_PUBLISHER_NAME
        defaultBookShouldBeFound("publisherName.doesNotContain=" + UPDATED_PUBLISHER_NAME);
    }


    @Test
    @Transactional
    public void getAllBooksByPublishedDateIsEqualToSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where publishedDate equals to DEFAULT_PUBLISHED_DATE
        defaultBookShouldBeFound("publishedDate.equals=" + DEFAULT_PUBLISHED_DATE);

        // Get all the bookList where publishedDate equals to UPDATED_PUBLISHED_DATE
        defaultBookShouldNotBeFound("publishedDate.equals=" + UPDATED_PUBLISHED_DATE);
    }

    @Test
    @Transactional
    public void getAllBooksByPublishedDateIsNotEqualToSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where publishedDate not equals to DEFAULT_PUBLISHED_DATE
        defaultBookShouldNotBeFound("publishedDate.notEquals=" + DEFAULT_PUBLISHED_DATE);

        // Get all the bookList where publishedDate not equals to UPDATED_PUBLISHED_DATE
        defaultBookShouldBeFound("publishedDate.notEquals=" + UPDATED_PUBLISHED_DATE);
    }

    @Test
    @Transactional
    public void getAllBooksByPublishedDateIsInShouldWork() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where publishedDate in DEFAULT_PUBLISHED_DATE or UPDATED_PUBLISHED_DATE
        defaultBookShouldBeFound("publishedDate.in=" + DEFAULT_PUBLISHED_DATE + "," + UPDATED_PUBLISHED_DATE);

        // Get all the bookList where publishedDate equals to UPDATED_PUBLISHED_DATE
        defaultBookShouldNotBeFound("publishedDate.in=" + UPDATED_PUBLISHED_DATE);
    }

    @Test
    @Transactional
    public void getAllBooksByPublishedDateIsNullOrNotNull() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where publishedDate is not null
        defaultBookShouldBeFound("publishedDate.specified=true");

        // Get all the bookList where publishedDate is null
        defaultBookShouldNotBeFound("publishedDate.specified=false");
    }

    @Test
    @Transactional
    public void getAllBooksByPublishedDateIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where publishedDate is greater than or equal to DEFAULT_PUBLISHED_DATE
        defaultBookShouldBeFound("publishedDate.greaterThanOrEqual=" + DEFAULT_PUBLISHED_DATE);

        // Get all the bookList where publishedDate is greater than or equal to UPDATED_PUBLISHED_DATE
        defaultBookShouldNotBeFound("publishedDate.greaterThanOrEqual=" + UPDATED_PUBLISHED_DATE);
    }

    @Test
    @Transactional
    public void getAllBooksByPublishedDateIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where publishedDate is less than or equal to DEFAULT_PUBLISHED_DATE
        defaultBookShouldBeFound("publishedDate.lessThanOrEqual=" + DEFAULT_PUBLISHED_DATE);

        // Get all the bookList where publishedDate is less than or equal to SMALLER_PUBLISHED_DATE
        defaultBookShouldNotBeFound("publishedDate.lessThanOrEqual=" + SMALLER_PUBLISHED_DATE);
    }

    @Test
    @Transactional
    public void getAllBooksByPublishedDateIsLessThanSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where publishedDate is less than DEFAULT_PUBLISHED_DATE
        defaultBookShouldNotBeFound("publishedDate.lessThan=" + DEFAULT_PUBLISHED_DATE);

        // Get all the bookList where publishedDate is less than UPDATED_PUBLISHED_DATE
        defaultBookShouldBeFound("publishedDate.lessThan=" + UPDATED_PUBLISHED_DATE);
    }

    @Test
    @Transactional
    public void getAllBooksByPublishedDateIsGreaterThanSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where publishedDate is greater than DEFAULT_PUBLISHED_DATE
        defaultBookShouldNotBeFound("publishedDate.greaterThan=" + DEFAULT_PUBLISHED_DATE);

        // Get all the bookList where publishedDate is greater than SMALLER_PUBLISHED_DATE
        defaultBookShouldBeFound("publishedDate.greaterThan=" + SMALLER_PUBLISHED_DATE);
    }


    @Test
    @Transactional
    public void getAllBooksByGenreIsEqualToSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where genre equals to DEFAULT_GENRE
        defaultBookShouldBeFound("genre.equals=" + DEFAULT_GENRE);

        // Get all the bookList where genre equals to UPDATED_GENRE
        defaultBookShouldNotBeFound("genre.equals=" + UPDATED_GENRE);
    }

    @Test
    @Transactional
    public void getAllBooksByGenreIsNotEqualToSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where genre not equals to DEFAULT_GENRE
        defaultBookShouldNotBeFound("genre.notEquals=" + DEFAULT_GENRE);

        // Get all the bookList where genre not equals to UPDATED_GENRE
        defaultBookShouldBeFound("genre.notEquals=" + UPDATED_GENRE);
    }

    @Test
    @Transactional
    public void getAllBooksByGenreIsInShouldWork() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where genre in DEFAULT_GENRE or UPDATED_GENRE
        defaultBookShouldBeFound("genre.in=" + DEFAULT_GENRE + "," + UPDATED_GENRE);

        // Get all the bookList where genre equals to UPDATED_GENRE
        defaultBookShouldNotBeFound("genre.in=" + UPDATED_GENRE);
    }

    @Test
    @Transactional
    public void getAllBooksByGenreIsNullOrNotNull() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where genre is not null
        defaultBookShouldBeFound("genre.specified=true");

        // Get all the bookList where genre is null
        defaultBookShouldNotBeFound("genre.specified=false");
    }
                @Test
    @Transactional
    public void getAllBooksByGenreContainsSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where genre contains DEFAULT_GENRE
        defaultBookShouldBeFound("genre.contains=" + DEFAULT_GENRE);

        // Get all the bookList where genre contains UPDATED_GENRE
        defaultBookShouldNotBeFound("genre.contains=" + UPDATED_GENRE);
    }

    @Test
    @Transactional
    public void getAllBooksByGenreNotContainsSomething() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        // Get all the bookList where genre does not contain DEFAULT_GENRE
        defaultBookShouldNotBeFound("genre.doesNotContain=" + DEFAULT_GENRE);

        // Get all the bookList where genre does not contain UPDATED_GENRE
        defaultBookShouldBeFound("genre.doesNotContain=" + UPDATED_GENRE);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultBookShouldBeFound(String filter) throws Exception {
        restBookMockMvc.perform(get("/api/books?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(book.getId().intValue())))
            .andExpect(jsonPath("$.[*].isbn").value(hasItem(DEFAULT_ISBN)))
            .andExpect(jsonPath("$.[*].writerName").value(hasItem(DEFAULT_WRITER_NAME)))
            .andExpect(jsonPath("$.[*].publisherName").value(hasItem(DEFAULT_PUBLISHER_NAME)))
            .andExpect(jsonPath("$.[*].publishedDate").value(hasItem(DEFAULT_PUBLISHED_DATE.toString())))
            .andExpect(jsonPath("$.[*].genre").value(hasItem(DEFAULT_GENRE)));

        // Check, that the count call also returns 1
        restBookMockMvc.perform(get("/api/books/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultBookShouldNotBeFound(String filter) throws Exception {
        restBookMockMvc.perform(get("/api/books?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restBookMockMvc.perform(get("/api/books/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    public void getNonExistingBook() throws Exception {
        // Get the book
        restBookMockMvc.perform(get("/api/books/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBook() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        int databaseSizeBeforeUpdate = bookRepository.findAll().size();

        // Update the book
        Book updatedBook = bookRepository.findById(book.getId()).get();
        // Disconnect from session so that the updates on updatedBook are not directly saved in db
        em.detach(updatedBook);
        updatedBook
            .isbn(UPDATED_ISBN)
            .writerName(UPDATED_WRITER_NAME)
            .publisherName(UPDATED_PUBLISHER_NAME)
            .publishedDate(UPDATED_PUBLISHED_DATE)
            .genre(UPDATED_GENRE);
        BookDTO bookDTO = bookMapper.toDto(updatedBook);

        restBookMockMvc.perform(put("/api/books")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bookDTO)))
            .andExpect(status().isOk());

        // Validate the Book in the database
        List<Book> bookList = bookRepository.findAll();
        assertThat(bookList).hasSize(databaseSizeBeforeUpdate);
        Book testBook = bookList.get(bookList.size() - 1);
        assertThat(testBook.getIsbn()).isEqualTo(UPDATED_ISBN);
        assertThat(testBook.getWriterName()).isEqualTo(UPDATED_WRITER_NAME);
        assertThat(testBook.getPublisherName()).isEqualTo(UPDATED_PUBLISHER_NAME);
        assertThat(testBook.getPublishedDate()).isEqualTo(UPDATED_PUBLISHED_DATE);
        assertThat(testBook.getGenre()).isEqualTo(UPDATED_GENRE);
    }

    @Test
    @Transactional
    public void updateNonExistingBook() throws Exception {
        int databaseSizeBeforeUpdate = bookRepository.findAll().size();

        // Create the Book
        BookDTO bookDTO = bookMapper.toDto(book);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBookMockMvc.perform(put("/api/books")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bookDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Book in the database
        List<Book> bookList = bookRepository.findAll();
        assertThat(bookList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBook() throws Exception {
        // Initialize the database
        bookRepository.saveAndFlush(book);

        int databaseSizeBeforeDelete = bookRepository.findAll().size();

        // Delete the book
        restBookMockMvc.perform(delete("/api/books/{id}", book.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Book> bookList = bookRepository.findAll();
        assertThat(bookList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
