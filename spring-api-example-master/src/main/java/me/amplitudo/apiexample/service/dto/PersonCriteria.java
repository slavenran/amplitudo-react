package me.amplitudo.apiexample.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import me.amplitudo.apiexample.domain.enumeration.Gender;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;
import io.github.jhipster.service.filter.LocalDateFilter;

/**
 * Criteria class for the {@link me.amplitudo.apiexample.domain.Person} entity. This class is used
 * in {@link me.amplitudo.apiexample.web.rest.PersonResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /people?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class PersonCriteria implements Serializable, Criteria {
    /**
     * Class for filtering Gender
     */
    public static class GenderFilter extends Filter<Gender> {

        public GenderFilter() {
        }

        public GenderFilter(GenderFilter filter) {
            super(filter);
        }

        @Override
        public GenderFilter copy() {
            return new GenderFilter(this);
        }

    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter firstName;

    private StringFilter lastName;

    private LocalDateFilter dateOfBirth;

    private IntegerFilter age;

    private GenderFilter gender;

    private StringFilter occupation;

    public PersonCriteria() {
    }

    public PersonCriteria(PersonCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.firstName = other.firstName == null ? null : other.firstName.copy();
        this.lastName = other.lastName == null ? null : other.lastName.copy();
        this.dateOfBirth = other.dateOfBirth == null ? null : other.dateOfBirth.copy();
        this.age = other.age == null ? null : other.age.copy();
        this.gender = other.gender == null ? null : other.gender.copy();
        this.occupation = other.occupation == null ? null : other.occupation.copy();
    }

    @Override
    public PersonCriteria copy() {
        return new PersonCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getFirstName() {
        return firstName;
    }

    public void setFirstName(StringFilter firstName) {
        this.firstName = firstName;
    }

    public StringFilter getLastName() {
        return lastName;
    }

    public void setLastName(StringFilter lastName) {
        this.lastName = lastName;
    }

    public LocalDateFilter getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDateFilter dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public IntegerFilter getAge() {
        return age;
    }

    public void setAge(IntegerFilter age) {
        this.age = age;
    }

    public GenderFilter getGender() {
        return gender;
    }

    public void setGender(GenderFilter gender) {
        this.gender = gender;
    }

    public StringFilter getOccupation() {
        return occupation;
    }

    public void setOccupation(StringFilter occupation) {
        this.occupation = occupation;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final PersonCriteria that = (PersonCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(firstName, that.firstName) &&
            Objects.equals(lastName, that.lastName) &&
            Objects.equals(dateOfBirth, that.dateOfBirth) &&
            Objects.equals(age, that.age) &&
            Objects.equals(gender, that.gender) &&
            Objects.equals(occupation, that.occupation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        firstName,
        lastName,
        dateOfBirth,
        age,
        gender,
        occupation
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PersonCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (firstName != null ? "firstName=" + firstName + ", " : "") +
                (lastName != null ? "lastName=" + lastName + ", " : "") +
                (dateOfBirth != null ? "dateOfBirth=" + dateOfBirth + ", " : "") +
                (age != null ? "age=" + age + ", " : "") +
                (gender != null ? "gender=" + gender + ", " : "") +
                (occupation != null ? "occupation=" + occupation + ", " : "") +
            "}";
    }

}
