package me.amplitudo.apiexample.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link me.amplitudo.apiexample.domain.Movie} entity.
 */
public class MovieDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String directorName;

    @NotNull
    private String writerName;

    @NotNull
    private Integer duration;

    @NotNull
    private Integer rating;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDirectorName() {
        return directorName;
    }

    public void setDirectorName(String directorName) {
        this.directorName = directorName;
    }

    public String getWriterName() {
        return writerName;
    }

    public void setWriterName(String writerName) {
        this.writerName = writerName;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MovieDTO)) {
            return false;
        }

        return id != null && id.equals(((MovieDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MovieDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", directorName='" + getDirectorName() + "'" +
            ", writerName='" + getWriterName() + "'" +
            ", duration=" + getDuration() +
            ", rating=" + getRating() +
            "}";
    }
}
