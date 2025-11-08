export function formatContext(books) {
  return {
    recommendations: books.map(b => ({
      title: b.title,
      author: b.author,
      pages: b.pages,
      year: b.first_publish_year,
    })),
  };
}

