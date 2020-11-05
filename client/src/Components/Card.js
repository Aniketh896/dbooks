import React from "react";
import "./card.css";

export const booksList = [
  {
    id: 1,
    author: "Aniketh Hotagi",
    title: "The Theory of Everything",
    date: "4th Nov, 2020",
    genre: ["Horror", "Romance"],
  },
  {
    id: 2,
    author: "Abhishek",
    title: "Savita BHabhi",
    date: "4th Nov, 2020",
    genre: ["Horror"],
  },
  {
    id: 3,
    author: "Aniketh Hotagi",
    title: "The Theory of Everything",
    date: "4th Nov, 2020",
    genre: ["Horror", "Romance", "Drama"],
  },
  {
    id: 4,
    author: "Aniketh Hotagi",
    title: "The Theory of Everything",
    date: "4th Nov, 2020",
    genre: ["Horror", "Romance"],
  },
  {
    id: 5,
    author: "Aniketh Hotagi",
    title: "The Theory of Everything",
    date: "4th Nov, 2020",
    genre: ["Horror", "Romance"],
  },
]; 

/* const Tags = (props) => {

  for (var books in booksList) {
    for(var gen in books.genre){
    return (<a>{gen}</a>);
  }
}

}; */


/* const TagsList = () => {

  return (

    <a>
      {booksList.map((tag) => {
        return <Tags key={tag.id} {...tag}></Tags>;
      })}
    </a>
  );
  
} */



const Card = (props) => {

  const {author, title, genre, date} = props;

  return (
          <article class="card">
            <header class="card-header">
              <p>{date}</p>
              <h2>{title}</h2>
            </header>

            <div class="card-author">
              <a class="author-avatar" href="#">
                <img src="avatar.png" />
              </a>
              <svg class="half-circle" viewBox="0 0 106 57">
                <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
              </svg>

              <div class="author-name">
                <div class="author-name-prefix">Author</div>
                {author}
              </div>
            </div>
            <div class="tags">
              <a href="">{ genre}</a>
            </div>
          </article>

          
  );
}

const Book = () => {
  return (
    <section className="book">
      {booksList.map((book) => {
        return <Card key={book.id} {...book}></Card>;
      })}
    </section>
  );
};


// Tried to create a Funtion to map array to the book

/* function BookList() {
  return (
    <section className="booklist">
      {booksList.map((book) => {
        return <Card key={book.id} {...book}></Card>;
      })}
    </section>
  );
} */

export default Book;