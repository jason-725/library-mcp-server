import axios from "axios";

export async function fetchBooks(query) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5`;

  const { data } = await axios.get(url);
  return data.docs.map(book => ({
    title: book.title,
    author: book.author_name?.[0],
    pages: book.number_of_pages_median,
    first_publish_year: book.first_publish_year,
  }));
}

