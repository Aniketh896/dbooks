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
    author: "Abhishek Singh",
    title: "Ozymandias",
    date: "4th Nov, 2020",
    genre: ["Thriller"],
  },
  {
    id: 3,
    author: "Abdul Mateen",
    title: "Manga Man",
    date: "28th Oct, 2020",
    genre: ["Action"],
  },
  {
    id: 4,
    author: "Adarsh A Nair",
    title: "C++ Programming",
    date: "12th Nov, 2012",
    genre: ["study"],
  }
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
            <header class="card-title">
              <p>{ date }</p>
              <h2>{ title }</h2>
            </header>

            <div class="card-author">
              <a class="author-avatar" href="#">
                <img src="../dbooks-logo.svg" />
              </a>
              <svg class="half-circle" viewBox="0 0 106 57">
                <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
              </svg>

              <div class="author">
                <div class="author-heading">Author</div>
                { author }
              </div>
            </div>
            <div class="tags">
              <a href="#">{ genre }</a>
            </div>
          </article>

          
  );
}

const Book = () => {
  return (

    <div className="book">
      {booksList.map((book) => {
        return <Card key={book.id} {...book}></Card>;
      })}
    </div>

  );
};

export default Book;