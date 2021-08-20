package me.amplitudo.apiexample.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link me.amplitudo.apiexample.domain.Movie} entity. This class is used
 * in {@link me.amplitudo.apiexample.web.rest.MovieResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /movies?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class MovieCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter name;

    private StringFilter directorName;

    private StringFilter writerName;

    private IntegerFilter duration;

    private IntegerFilter rating;

    public MovieCriteria() {
    }

    public MovieCriteria(MovieCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.name = other.name == null ? null : other.name.copy();
        this.directorName = other.directorName == null ? null : other.directorName.copy();
        this.writerName = other.writerName == null ? null : other.writerName.copy();
        this.duration = other.duration == null ? null : other.duration.copy();
        this.rating = other.rating == null ? null : other.rating.copy();
    }

    @Override
    public MovieCriteria copy() {
        return new MovieCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getName() {
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public StringFilter getDirectorName() {
        return directorName;
    }

    public void setDirectorName(StringFilter directorName) {
        this.directorName = directorName;
    }

    public StringFilter getWriterName() {
        return writerName;
    }

    public void setWriterName(StringFilter writerName) {
        this.writerName = writerName;
    }

    public IntegerFilter getDuration() {
        return duration;
    }

    public void setDuration(IntegerFilter duration) {
        this.duration = duration;
    }

    public IntegerFilter getRating() {
        return rating;
    }

    public void setRating(IntegerFilter rating) {
        this.rating = rating;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final MovieCriteria that = (MovieCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(name, that.name) &&
            Objects.equals(directorName, that.directorName) &&
            Objects.equals(writerName, that.writerName) &&
            Objects.equals(duration, that.duration) &&
            Objects.equals(rating, that.rating);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        name,
        directorName,
        writerName,
        duration,
        rating
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MovieCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (name != null ? "name=" + name + ", " : "") +
                (directorName != null ? "directorName=" + directorName + ", " : "") +
                (writerName != null ? "writerName=" + writerName + ", " : "") +
                (duration != null ? "duration=" + duration + ", " : "") +
                (rating != null ? "rating=" + rating + ", " : "") +
            "}";
    }

}
