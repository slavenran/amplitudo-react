package me.amplitudo.apiexample.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link me.amplitudo.apiexample.domain.Book} entity.
 */
public class BookDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String isbn;

    @NotNull
    private String writerName;

    @NotNull
    private String publisherName;

    @NotNull
    private LocalDate publishedDate;

    @NotNull
    private String genre;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getWriterName() {
        return writerName;
    }

    public void setWriterName(String writerName) {
        this.writerName = writerName;
    }

    public String getPublisherName() {
        return publisherName;
    }

    public void setPublisherName(String publisherName) {
        this.publisherName = publisherName;
    }

    public LocalDate getPublishedDate() {
        return publishedDate;
    }

    public void setPublishedDate(LocalDate publishedDate) {
        this.publishedDate = publishedDate;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BookDTO)) {
            return false;
        }

        return id != null && id.equals(((BookDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BookDTO{" +
            "id=" + getId() +
            ", isbn='" + getIsbn() + "'" +
            ", writerName='" + getWriterName() + "'" +
            ", publisherName='" + getPublisherName() + "'" +
            ", publishedDate='" + getPublishedDate() + "'" +
            ", genre='" + getGenre() + "'" +
            "}";
    }
}
