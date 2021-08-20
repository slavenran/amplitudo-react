package me.amplitudo.apiexample.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Book.
 */
@Entity
@Table(name = "book")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Book implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "isbn", nullable = false)
    private String isbn;

    @NotNull
    @Column(name = "writer_name", nullable = false)
    private String writerName;

    @NotNull
    @Column(name = "publisher_name", nullable = false)
    private String publisherName;

    @NotNull
    @Column(name = "published_date", nullable = false)
    private LocalDate publishedDate;

    @NotNull
    @Column(name = "genre", nullable = false)
    private String genre;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIsbn() {
        return isbn;
    }

    public Book isbn(String isbn) {
        this.isbn = isbn;
        return this;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getWriterName() {
        return writerName;
    }

    public Book writerName(String writerName) {
        this.writerName = writerName;
        return this;
    }

    public void setWriterName(String writerName) {
        this.writerName = writerName;
    }

    public String getPublisherName() {
        return publisherName;
    }

    public Book publisherName(String publisherName) {
        this.publisherName = publisherName;
        return this;
    }

    public void setPublisherName(String publisherName) {
        this.publisherName = publisherName;
    }

    public LocalDate getPublishedDate() {
        return publishedDate;
    }

    public Book publishedDate(LocalDate publishedDate) {
        this.publishedDate = publishedDate;
        return this;
    }

    public void setPublishedDate(LocalDate publishedDate) {
        this.publishedDate = publishedDate;
    }

    public String getGenre() {
        return genre;
    }

    public Book genre(String genre) {
        this.genre = genre;
        return this;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Book)) {
            return false;
        }
        return id != null && id.equals(((Book) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Book{" +
            "id=" + getId() +
            ", isbn='" + getIsbn() + "'" +
            ", writerName='" + getWriterName() + "'" +
            ", publisherName='" + getPublisherName() + "'" +
            ", publishedDate='" + getPublishedDate() + "'" +
            ", genre='" + getGenre() + "'" +
            "}";
    }
}
