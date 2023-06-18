import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  pages: number;
}

@Component({
  selector: 'app-book-list',
  template: `
    <h2>Book List</h2>
    <ul>
      <li *ngFor="let book of books">{{ book.title }} by {{ book.author }}</li>
    </ul>
  `,
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.http.get<Book[]>('http://localhost:3000/books').subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
