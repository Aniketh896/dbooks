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


export const Card = props => {
	const { authorAddress, title, genre, ipfsHash, price, date } = props

	return (
		<article className='card'>
			<header className='card-title'>
				<p>{date}</p>
				<h2>{title}</h2>
			</header>

			<div className='card-author'>
				<a className='author-avatar' href='#'>
					<img src='../dbooks-logo.svg' />
				</a>
				<svg className='half-circle' viewBox='0 0 106 57'>
					<path d='M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4'></path>
				</svg>

				<div className='author'>
					<div className='author-heading'>Author</div>
					{authorAddress.slice(0, 4) +
						'...' +
						authorAddress.slice(authorAddress.length - 4, authorAddress.length)}
				</div>
			</div>
			<div className='tags'>
				<a href='#'>{genre}</a>
			</div>
		</article>
	)
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