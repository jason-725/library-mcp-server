document.getElementById("searchBtn").addEventListener("click", async () => {
  const genre = document.getElementById("genre").value;
  const length = document.getElementById("length").value;
  const theme = document.getElementById("theme").value;

  const res = await fetch("http://localhost:5000/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ genre, length, theme }),
  });

  const data = await res.json();
  document.getElementById("result").innerText = data.recommendation || data.error;
});
