package me.amplitudo.apiexample.web.rest;

import me.amplitudo.apiexample.ApiexampleApp;
import me.amplitudo.apiexample.domain.Person;
import me.amplitudo.apiexample.repository.PersonRepository;
import me.amplitudo.apiexample.service.PersonService;
import me.amplitudo.apiexample.service.dto.PersonDTO;
import me.amplitudo.apiexample.service.mapper.PersonMapper;
import me.amplitudo.apiexample.service.dto.PersonCriteria;
import me.amplitudo.apiexample.service.PersonQueryService;

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

import me.amplitudo.apiexample.domain.enumeration.Gender;
/**
 * Integration tests for the {@link PersonResource} REST controller.
 */
@SpringBootTest(classes = ApiexampleApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PersonResourceIT {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_OF_BIRTH = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_OF_BIRTH = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_DATE_OF_BIRTH = LocalDate.ofEpochDay(-1L);

    private static final Integer DEFAULT_AGE = 1;
    private static final Integer UPDATED_AGE = 2;
    private static final Integer SMALLER_AGE = 1 - 1;

    private static final Gender DEFAULT_GENDER = Gender.MALE;
    private static final Gender UPDATED_GENDER = Gender.FEMALE;

    private static final String DEFAULT_OCCUPATION = "AAAAAAAAAA";
    private static final String UPDATED_OCCUPATION = "BBBBBBBBBB";

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private PersonMapper personMapper;

    @Autowired
    private PersonService personService;

    @Autowired
    private PersonQueryService personQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPersonMockMvc;

    private Person person;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Person createEntity(EntityManager em) {
        Person person = new Person()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .dateOfBirth(DEFAULT_DATE_OF_BIRTH)
            .age(DEFAULT_AGE)
            .gender(DEFAULT_GENDER)
            .occupation(DEFAULT_OCCUPATION);
        return person;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Person createUpdatedEntity(EntityManager em) {
        Person person = new Person()
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .dateOfBirth(UPDATED_DATE_OF_BIRTH)
            .age(UPDATED_AGE)
            .gender(UPDATED_GENDER)
            .occupation(UPDATED_OCCUPATION);
        return person;
    }

    @BeforeEach
    public void initTest() {
        person = createEntity(em);
    }

    @Test
    @Transactional
    public void createPerson() throws Exception {
        int databaseSizeBeforeCreate = personRepository.findAll().size();
        // Create the Person
        PersonDTO personDTO = personMapper.toDto(person);
        restPersonMockMvc.perform(post("/api/people")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(personDTO)))
            .andExpect(status().isCreated());

        // Validate the Person in the database
        List<Person> personList = personRepository.findAll();
        assertThat(personList).hasSize(databaseSizeBeforeCreate + 1);
        Person testPerson = personList.get(personList.size() - 1);
        assertThat(testPerson.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testPerson.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testPerson.getDateOfBirth()).isEqualTo(DEFAULT_DATE_OF_BIRTH);
        assertThat(testPerson.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testPerson.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testPerson.getOccupation()).isEqualTo(DEFAULT_OCCUPATION);
    }

    @Test
    @Transactional
    public void createPersonWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = personRepository.findAll().size();

        // Create the Person with an existing ID
        person.setId(1L);
        PersonDTO personDTO = personMapper.toDto(person);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersonMockMvc.perform(post("/api/people")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(personDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Person in the database
        List<Person> personList = personRepository.findAll();
        assertThat(personList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFirstNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = personRepository.findAll().size();
        // set the field null
        person.setFirstName(null);

        // Create the Person, which fails.
        PersonDTO personDTO = personMapper.toDto(person);


        restPersonMockMvc.perform(post("/api/people")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(personDTO)))
            .andExpect(status().isBadRequest());

        List<Person> personList = personRepository.findAll();
        assertThat(personList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLastNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = personRepository.findAll().size();
        // set the field null
        person.setLastName(null);

        // Create the Person, which fails.
        PersonDTO personDTO = personMapper.toDto(person);


        restPersonMockMvc.perform(post("/api/people")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(personDTO)))
            .andExpect(status().isBadRequest());

        List<Person> personList = personRepository.findAll();
        assertThat(personList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateOfBirthIsRequired() throws Exception {
        int databaseSizeBeforeTest = personRepository.findAll().size();
        // set the field null
        person.setDateOfBirth(null);

        // Create the Person, which fails.
        PersonDTO personDTO = personMapper.toDto(person);


        restPersonMockMvc.perform(post("/api/people")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(personDTO)))
            .andExpect(status().isBadRequest());

        List<Person> personList = personRepository.findAll();
        assertThat(personList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAgeIsRequired() throws Exception {
        int databaseSizeBeforeTest = personRepository.findAll().size();
        // set the field null
        person.setAge(null);

        // Create the Person, which fails.
        PersonDTO personDTO = personMapper.toDto(person);


        restPersonMockMvc.perform(post("/api/people")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(personDTO)))
            .andExpect(status().isBadRequest());

        List<Person> personList = personRepository.findAll();
        assertThat(personList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGenderIsRequired() throws Exception {
        int databaseSizeBeforeTest = personRepository.findAll().size();
        // set the field null
        person.setGender(null);

        // Create the Person, which fails.
        PersonDTO personDTO = personMapper.toDto(person);


        restPersonMockMvc.perform(post("/api/people")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(personDTO)))
            .andExpect(status().isBadRequest());

        List<Person> personList = personRepository.findAll();
        assertThat(personList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOccupationIsRequired() throws Exception {
        int databaseSizeBeforeTest = personRepository.findAll().size();
        // set the field null
        person.setOccupation(null);

        // Create the Person, which fails.
        PersonDTO personDTO = personMapper.toDto(person);


        restPersonMockMvc.perform(post("/api/people")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(personDTO)))
            .andExpect(status().isBadRequest());

        List<Person> personList = personRepository.findAll();
        assertThat(personList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPeople() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList
        restPersonMockMvc.perform(get("/api/people?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(person.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].dateOfBirth").value(hasItem(DEFAULT_DATE_OF_BIRTH.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())))
            .andExpect(jsonPath("$.[*].occupation").value(hasItem(DEFAULT_OCCUPATION)));
    }
    
    @Test
    @Transactional
    public void getPerson() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get the person
        restPersonMockMvc.perform(get("/api/people/{id}", person.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(person.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.dateOfBirth").value(DEFAULT_DATE_OF_BIRTH.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()))
            .andExpect(jsonPath("$.occupation").value(DEFAULT_OCCUPATION));
    }


    @Test
    @Transactional
    public void getPeopleByIdFiltering() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        Long id = person.getId();

        defaultPersonShouldBeFound("id.equals=" + id);
        defaultPersonShouldNotBeFound("id.notEquals=" + id);

        defaultPersonShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultPersonShouldNotBeFound("id.greaterThan=" + id);

        defaultPersonShouldBeFound("id.lessThanOrEqual=" + id);
        defaultPersonShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllPeopleByFirstNameIsEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where firstName equals to DEFAULT_FIRST_NAME
        defaultPersonShouldBeFound("firstName.equals=" + DEFAULT_FIRST_NAME);

        // Get all the personList where firstName equals to UPDATED_FIRST_NAME
        defaultPersonShouldNotBeFound("firstName.equals=" + UPDATED_FIRST_NAME);
    }

    @Test
    @Transactional
    public void getAllPeopleByFirstNameIsNotEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where firstName not equals to DEFAULT_FIRST_NAME
        defaultPersonShouldNotBeFound("firstName.notEquals=" + DEFAULT_FIRST_NAME);

        // Get all the personList where firstName not equals to UPDATED_FIRST_NAME
        defaultPersonShouldBeFound("firstName.notEquals=" + UPDATED_FIRST_NAME);
    }

    @Test
    @Transactional
    public void getAllPeopleByFirstNameIsInShouldWork() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where firstName in DEFAULT_FIRST_NAME or UPDATED_FIRST_NAME
        defaultPersonShouldBeFound("firstName.in=" + DEFAULT_FIRST_NAME + "," + UPDATED_FIRST_NAME);

        // Get all the personList where firstName equals to UPDATED_FIRST_NAME
        defaultPersonShouldNotBeFound("firstName.in=" + UPDATED_FIRST_NAME);
    }

    @Test
    @Transactional
    public void getAllPeopleByFirstNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where firstName is not null
        defaultPersonShouldBeFound("firstName.specified=true");

        // Get all the personList where firstName is null
        defaultPersonShouldNotBeFound("firstName.specified=false");
    }
                @Test
    @Transactional
    public void getAllPeopleByFirstNameContainsSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where firstName contains DEFAULT_FIRST_NAME
        defaultPersonShouldBeFound("firstName.contains=" + DEFAULT_FIRST_NAME);

        // Get all the personList where firstName contains UPDATED_FIRST_NAME
        defaultPersonShouldNotBeFound("firstName.contains=" + UPDATED_FIRST_NAME);
    }

    @Test
    @Transactional
    public void getAllPeopleByFirstNameNotContainsSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where firstName does not contain DEFAULT_FIRST_NAME
        defaultPersonShouldNotBeFound("firstName.doesNotContain=" + DEFAULT_FIRST_NAME);

        // Get all the personList where firstName does not contain UPDATED_FIRST_NAME
        defaultPersonShouldBeFound("firstName.doesNotContain=" + UPDATED_FIRST_NAME);
    }


    @Test
    @Transactional
    public void getAllPeopleByLastNameIsEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where lastName equals to DEFAULT_LAST_NAME
        defaultPersonShouldBeFound("lastName.equals=" + DEFAULT_LAST_NAME);

        // Get all the personList where lastName equals to UPDATED_LAST_NAME
        defaultPersonShouldNotBeFound("lastName.equals=" + UPDATED_LAST_NAME);
    }

    @Test
    @Transactional
    public void getAllPeopleByLastNameIsNotEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where lastName not equals to DEFAULT_LAST_NAME
        defaultPersonShouldNotBeFound("lastName.notEquals=" + DEFAULT_LAST_NAME);

        // Get all the personList where lastName not equals to UPDATED_LAST_NAME
        defaultPersonShouldBeFound("lastName.notEquals=" + UPDATED_LAST_NAME);
    }

    @Test
    @Transactional
    public void getAllPeopleByLastNameIsInShouldWork() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where lastName in DEFAULT_LAST_NAME or UPDATED_LAST_NAME
        defaultPersonShouldBeFound("lastName.in=" + DEFAULT_LAST_NAME + "," + UPDATED_LAST_NAME);

        // Get all the personList where lastName equals to UPDATED_LAST_NAME
        defaultPersonShouldNotBeFound("lastName.in=" + UPDATED_LAST_NAME);
    }

    @Test
    @Transactional
    public void getAllPeopleByLastNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where lastName is not null
        defaultPersonShouldBeFound("lastName.specified=true");

        // Get all the personList where lastName is null
        defaultPersonShouldNotBeFound("lastName.specified=false");
    }
                @Test
    @Transactional
    public void getAllPeopleByLastNameContainsSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where lastName contains DEFAULT_LAST_NAME
        defaultPersonShouldBeFound("lastName.contains=" + DEFAULT_LAST_NAME);

        // Get all the personList where lastName contains UPDATED_LAST_NAME
        defaultPersonShouldNotBeFound("lastName.contains=" + UPDATED_LAST_NAME);
    }

    @Test
    @Transactional
    public void getAllPeopleByLastNameNotContainsSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where lastName does not contain DEFAULT_LAST_NAME
        defaultPersonShouldNotBeFound("lastName.doesNotContain=" + DEFAULT_LAST_NAME);

        // Get all the personList where lastName does not contain UPDATED_LAST_NAME
        defaultPersonShouldBeFound("lastName.doesNotContain=" + UPDATED_LAST_NAME);
    }


    @Test
    @Transactional
    public void getAllPeopleByDateOfBirthIsEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where dateOfBirth equals to DEFAULT_DATE_OF_BIRTH
        defaultPersonShouldBeFound("dateOfBirth.equals=" + DEFAULT_DATE_OF_BIRTH);

        // Get all the personList where dateOfBirth equals to UPDATED_DATE_OF_BIRTH
        defaultPersonShouldNotBeFound("dateOfBirth.equals=" + UPDATED_DATE_OF_BIRTH);
    }

    @Test
    @Transactional
    public void getAllPeopleByDateOfBirthIsNotEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where dateOfBirth not equals to DEFAULT_DATE_OF_BIRTH
        defaultPersonShouldNotBeFound("dateOfBirth.notEquals=" + DEFAULT_DATE_OF_BIRTH);

        // Get all the personList where dateOfBirth not equals to UPDATED_DATE_OF_BIRTH
        defaultPersonShouldBeFound("dateOfBirth.notEquals=" + UPDATED_DATE_OF_BIRTH);
    }

    @Test
    @Transactional
    public void getAllPeopleByDateOfBirthIsInShouldWork() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where dateOfBirth in DEFAULT_DATE_OF_BIRTH or UPDATED_DATE_OF_BIRTH
        defaultPersonShouldBeFound("dateOfBirth.in=" + DEFAULT_DATE_OF_BIRTH + "," + UPDATED_DATE_OF_BIRTH);

        // Get all the personList where dateOfBirth equals to UPDATED_DATE_OF_BIRTH
        defaultPersonShouldNotBeFound("dateOfBirth.in=" + UPDATED_DATE_OF_BIRTH);
    }

    @Test
    @Transactional
    public void getAllPeopleByDateOfBirthIsNullOrNotNull() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where dateOfBirth is not null
        defaultPersonShouldBeFound("dateOfBirth.specified=true");

        // Get all the personList where dateOfBirth is null
        defaultPersonShouldNotBeFound("dateOfBirth.specified=false");
    }

    @Test
    @Transactional
    public void getAllPeopleByDateOfBirthIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where dateOfBirth is greater than or equal to DEFAULT_DATE_OF_BIRTH
        defaultPersonShouldBeFound("dateOfBirth.greaterThanOrEqual=" + DEFAULT_DATE_OF_BIRTH);

        // Get all the personList where dateOfBirth is greater than or equal to UPDATED_DATE_OF_BIRTH
        defaultPersonShouldNotBeFound("dateOfBirth.greaterThanOrEqual=" + UPDATED_DATE_OF_BIRTH);
    }

    @Test
    @Transactional
    public void getAllPeopleByDateOfBirthIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where dateOfBirth is less than or equal to DEFAULT_DATE_OF_BIRTH
        defaultPersonShouldBeFound("dateOfBirth.lessThanOrEqual=" + DEFAULT_DATE_OF_BIRTH);

        // Get all the personList where dateOfBirth is less than or equal to SMALLER_DATE_OF_BIRTH
        defaultPersonShouldNotBeFound("dateOfBirth.lessThanOrEqual=" + SMALLER_DATE_OF_BIRTH);
    }

    @Test
    @Transactional
    public void getAllPeopleByDateOfBirthIsLessThanSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where dateOfBirth is less than DEFAULT_DATE_OF_BIRTH
        defaultPersonShouldNotBeFound("dateOfBirth.lessThan=" + DEFAULT_DATE_OF_BIRTH);

        // Get all the personList where dateOfBirth is less than UPDATED_DATE_OF_BIRTH
        defaultPersonShouldBeFound("dateOfBirth.lessThan=" + UPDATED_DATE_OF_BIRTH);
    }

    @Test
    @Transactional
    public void getAllPeopleByDateOfBirthIsGreaterThanSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where dateOfBirth is greater than DEFAULT_DATE_OF_BIRTH
        defaultPersonShouldNotBeFound("dateOfBirth.greaterThan=" + DEFAULT_DATE_OF_BIRTH);

        // Get all the personList where dateOfBirth is greater than SMALLER_DATE_OF_BIRTH
        defaultPersonShouldBeFound("dateOfBirth.greaterThan=" + SMALLER_DATE_OF_BIRTH);
    }


    @Test
    @Transactional
    public void getAllPeopleByAgeIsEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where age equals to DEFAULT_AGE
        defaultPersonShouldBeFound("age.equals=" + DEFAULT_AGE);

        // Get all the personList where age equals to UPDATED_AGE
        defaultPersonShouldNotBeFound("age.equals=" + UPDATED_AGE);
    }

    @Test
    @Transactional
    public void getAllPeopleByAgeIsNotEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where age not equals to DEFAULT_AGE
        defaultPersonShouldNotBeFound("age.notEquals=" + DEFAULT_AGE);

        // Get all the personList where age not equals to UPDATED_AGE
        defaultPersonShouldBeFound("age.notEquals=" + UPDATED_AGE);
    }

    @Test
    @Transactional
    public void getAllPeopleByAgeIsInShouldWork() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where age in DEFAULT_AGE or UPDATED_AGE
        defaultPersonShouldBeFound("age.in=" + DEFAULT_AGE + "," + UPDATED_AGE);

        // Get all the personList where age equals to UPDATED_AGE
        defaultPersonShouldNotBeFound("age.in=" + UPDATED_AGE);
    }

    @Test
    @Transactional
    public void getAllPeopleByAgeIsNullOrNotNull() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where age is not null
        defaultPersonShouldBeFound("age.specified=true");

        // Get all the personList where age is null
        defaultPersonShouldNotBeFound("age.specified=false");
    }

    @Test
    @Transactional
    public void getAllPeopleByAgeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where age is greater than or equal to DEFAULT_AGE
        defaultPersonShouldBeFound("age.greaterThanOrEqual=" + DEFAULT_AGE);

        // Get all the personList where age is greater than or equal to UPDATED_AGE
        defaultPersonShouldNotBeFound("age.greaterThanOrEqual=" + UPDATED_AGE);
    }

    @Test
    @Transactional
    public void getAllPeopleByAgeIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where age is less than or equal to DEFAULT_AGE
        defaultPersonShouldBeFound("age.lessThanOrEqual=" + DEFAULT_AGE);

        // Get all the personList where age is less than or equal to SMALLER_AGE
        defaultPersonShouldNotBeFound("age.lessThanOrEqual=" + SMALLER_AGE);
    }

    @Test
    @Transactional
    public void getAllPeopleByAgeIsLessThanSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where age is less than DEFAULT_AGE
        defaultPersonShouldNotBeFound("age.lessThan=" + DEFAULT_AGE);

        // Get all the personList where age is less than UPDATED_AGE
        defaultPersonShouldBeFound("age.lessThan=" + UPDATED_AGE);
    }

    @Test
    @Transactional
    public void getAllPeopleByAgeIsGreaterThanSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where age is greater than DEFAULT_AGE
        defaultPersonShouldNotBeFound("age.greaterThan=" + DEFAULT_AGE);

        // Get all the personList where age is greater than SMALLER_AGE
        defaultPersonShouldBeFound("age.greaterThan=" + SMALLER_AGE);
    }


    @Test
    @Transactional
    public void getAllPeopleByGenderIsEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where gender equals to DEFAULT_GENDER
        defaultPersonShouldBeFound("gender.equals=" + DEFAULT_GENDER);

        // Get all the personList where gender equals to UPDATED_GENDER
        defaultPersonShouldNotBeFound("gender.equals=" + UPDATED_GENDER);
    }

    @Test
    @Transactional
    public void getAllPeopleByGenderIsNotEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where gender not equals to DEFAULT_GENDER
        defaultPersonShouldNotBeFound("gender.notEquals=" + DEFAULT_GENDER);

        // Get all the personList where gender not equals to UPDATED_GENDER
        defaultPersonShouldBeFound("gender.notEquals=" + UPDATED_GENDER);
    }

    @Test
    @Transactional
    public void getAllPeopleByGenderIsInShouldWork() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where gender in DEFAULT_GENDER or UPDATED_GENDER
        defaultPersonShouldBeFound("gender.in=" + DEFAULT_GENDER + "," + UPDATED_GENDER);

        // Get all the personList where gender equals to UPDATED_GENDER
        defaultPersonShouldNotBeFound("gender.in=" + UPDATED_GENDER);
    }

    @Test
    @Transactional
    public void getAllPeopleByGenderIsNullOrNotNull() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where gender is not null
        defaultPersonShouldBeFound("gender.specified=true");

        // Get all the personList where gender is null
        defaultPersonShouldNotBeFound("gender.specified=false");
    }

    @Test
    @Transactional
    public void getAllPeopleByOccupationIsEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where occupation equals to DEFAULT_OCCUPATION
        defaultPersonShouldBeFound("occupation.equals=" + DEFAULT_OCCUPATION);

        // Get all the personList where occupation equals to UPDATED_OCCUPATION
        defaultPersonShouldNotBeFound("occupation.equals=" + UPDATED_OCCUPATION);
    }

    @Test
    @Transactional
    public void getAllPeopleByOccupationIsNotEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where occupation not equals to DEFAULT_OCCUPATION
        defaultPersonShouldNotBeFound("occupation.notEquals=" + DEFAULT_OCCUPATION);

        // Get all the personList where occupation not equals to UPDATED_OCCUPATION
        defaultPersonShouldBeFound("occupation.notEquals=" + UPDATED_OCCUPATION);
    }

    @Test
    @Transactional
    public void getAllPeopleByOccupationIsInShouldWork() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where occupation in DEFAULT_OCCUPATION or UPDATED_OCCUPATION
        defaultPersonShouldBeFound("occupation.in=" + DEFAULT_OCCUPATION + "," + UPDATED_OCCUPATION);

        // Get all the personList where occupation equals to UPDATED_OCCUPATION
        defaultPersonShouldNotBeFound("occupation.in=" + UPDATED_OCCUPATION);
    }

    @Test
    @Transactional
    public void getAllPeopleByOccupationIsNullOrNotNull() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where occupation is not null
        defaultPersonShouldBeFound("occupation.specified=true");

        // Get all the personList where occupation is null
        defaultPersonShouldNotBeFound("occupation.specified=false");
    }
                @Test
    @Transactional
    public void getAllPeopleByOccupationContainsSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where occupation contains DEFAULT_OCCUPATION
        defaultPersonShouldBeFound("occupation.contains=" + DEFAULT_OCCUPATION);

        // Get all the personList where occupation contains UPDATED_OCCUPATION
        defaultPersonShouldNotBeFound("occupation.contains=" + UPDATED_OCCUPATION);
    }

    @Test
    @Transactional
    public void getAllPeopleByOccupationNotContainsSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where occupation does not contain DEFAULT_OCCUPATION
        defaultPersonShouldNotBeFound("occupation.doesNotContain=" + DEFAULT_OCCUPATION);

        // Get all the personList where occupation does not contain UPDATED_OCCUPATION
        defaultPersonShouldBeFound("occupation.doesNotContain=" + UPDATED_OCCUPATION);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultPersonShouldBeFound(String filter) throws Exception {
        restPersonMockMvc.perform(get("/api/people?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(person.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].dateOfBirth").value(hasItem(DEFAULT_DATE_OF_BIRTH.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())))
            .andExpect(jsonPath("$.[*].occupation").value(hasItem(DEFAULT_OCCUPATION)));

        // Check, that the count call also returns 1
        restPersonMockMvc.perform(get("/api/people/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultPersonShouldNotBeFound(String filter) throws Exception {
        restPersonMockMvc.perform(get("/api/people?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restPersonMockMvc.perform(get("/api/people/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    public void getNonExistingPerson() throws Exception {
        // Get the person
        restPersonMockMvc.perform(get("/api/people/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePerson() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        int databaseSizeBeforeUpdate = personRepository.findAll().size();

        // Update the person
        Person updatedPerson = personRepository.findById(person.getId()).get();
        // Disconnect from session so that the updates on updatedPerson are not directly saved in db
        em.detach(updatedPerson);
        updatedPerson
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .dateOfBirth(UPDATED_DATE_OF_BIRTH)
            .age(UPDATED_AGE)
            .gender(UPDATED_GENDER)
            .occupation(UPDATED_OCCUPATION);
        PersonDTO personDTO = personMapper.toDto(updatedPerson);

        restPersonMockMvc.perform(put("/api/people")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(personDTO)))
            .andExpect(status().isOk());

        // Validate the Person in the database
        List<Person> personList = personRepository.findAll();
        assertThat(personList).hasSize(databaseSizeBeforeUpdate);
        Person testPerson = personList.get(personList.size() - 1);
        assertThat(testPerson.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testPerson.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testPerson.getDateOfBirth()).isEqualTo(UPDATED_DATE_OF_BIRTH);
        assertThat(testPerson.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testPerson.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testPerson.getOccupation()).isEqualTo(UPDATED_OCCUPATION);
    }

    @Test
    @Transactional
    public void updateNonExistingPerson() throws Exception {
        int databaseSizeBeforeUpdate = personRepository.findAll().size();

        // Create the Person
        PersonDTO personDTO = personMapper.toDto(person);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPersonMockMvc.perform(put("/api/people")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(personDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Person in the database
        List<Person> personList = personRepository.findAll();
        assertThat(personList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePerson() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        int databaseSizeBeforeDelete = personRepository.findAll().size();

        // Delete the person
        restPersonMockMvc.perform(delete("/api/people/{id}", person.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Person> personList = personRepository.findAll();
        assertThat(personList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
