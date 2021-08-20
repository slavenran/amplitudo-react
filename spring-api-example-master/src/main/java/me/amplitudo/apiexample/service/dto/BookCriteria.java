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
import io.github.jhipster.service.filter.LocalDateFilter;

/**
 * Criteria class for the {@link me.amplitudo.apiexample.domain.Book} entity. This class is used
 * in {@link me.amplitudo.apiexample.web.rest.BookResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /books?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class BookCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter isbn;

    private StringFilter writerName;

    private StringFilter publisherName;

    private LocalDateFilter publishedDate;

    private StringFilter genre;

    public BookCriteria() {
    }

    public BookCriteria(BookCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.isbn = other.isbn == null ? null : other.isbn.copy();
        this.writerName = other.writerName == null ? null : other.writerName.copy();
        this.publisherName = other.publisherName == null ? null : other.publisherName.copy();
        this.publishedDate = other.publishedDate == null ? null : other.publishedDate.copy();
        this.genre = other.genre == null ? null : other.genre.copy();
    }

    @Override
    public BookCriteria copy() {
        return new BookCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getIsbn() {
        return isbn;
    }

    public void setIsbn(StringFilter isbn) {
        this.isbn = isbn;
    }

    public StringFilter getWriterName() {
        return writerName;
    }

    public void setWriterName(StringFilter writerName) {
        this.writerName = writerName;
    }

    public StringFilter getPublisherName() {
        return publisherName;
    }

    public void setPublisherName(StringFilter publisherName) {
        this.publisherName = publisherName;
    }

    public LocalDateFilter getPublishedDate() {
        return publishedDate;
    }

    public void setPublishedDate(LocalDateFilter publishedDate) {
        this.publishedDate = publishedDate;
    }

    public StringFilter getGenre() {
        return genre;
    }

    public void setGenre(StringFilter genre) {
        this.genre = genre;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final BookCriteria that = (BookCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(isbn, that.isbn) &&
            Objects.equals(writerName, that.writerName) &&
            Objects.equals(publisherName, that.publisherName) &&
            Objects.equals(publishedDate, that.publishedDate) &&
            Objects.equals(genre, that.genre);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        isbn,
        writerName,
        publisherName,
        publishedDate,
        genre
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BookCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (isbn != null ? "isbn=" + isbn + ", " : "") +
                (writerName != null ? "writerName=" + writerName + ", " : "") +
                (publisherName != null ? "publisherName=" + publisherName + ", " : "") +
                (publishedDate != null ? "publishedDate=" + publishedDate + ", " : "") +
                (genre != null ? "genre=" + genre + ", " : "") +
            "}";
    }

}
