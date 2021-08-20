package me.amplitudo.apiexample.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Movie.
 */
@Entity
@Table(name = "movie")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Movie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "director_name", nullable = false)
    private String directorName;

    @NotNull
    @Column(name = "writer_name", nullable = false)
    private String writerName;

    @NotNull
    @Column(name = "duration", nullable = false)
    private Integer duration;

    @NotNull
    @Column(name = "rating", nullable = false)
    private Integer rating;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Movie name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDirectorName() {
        return directorName;
    }

    public Movie directorName(String directorName) {
        this.directorName = directorName;
        return this;
    }

    public void setDirectorName(String directorName) {
        this.directorName = directorName;
    }

    public String getWriterName() {
        return writerName;
    }

    public Movie writerName(String writerName) {
        this.writerName = writerName;
        return this;
    }

    public void setWriterName(String writerName) {
        this.writerName = writerName;
    }

    public Integer getDuration() {
        return duration;
    }

    public Movie duration(Integer duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Integer getRating() {
        return rating;
    }

    public Movie rating(Integer rating) {
        this.rating = rating;
        return this;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Movie)) {
            return false;
        }
        return id != null && id.equals(((Movie) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Movie{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", directorName='" + getDirectorName() + "'" +
            ", writerName='" + getWriterName() + "'" +
            ", duration=" + getDuration() +
            ", rating=" + getRating() +
            "}";
    }
}
