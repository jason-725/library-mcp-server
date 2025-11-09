document.getElementById("searchBtn").addEventListener("click", async () => {
  const genre = document.getElementById("genre").value;
  const length = document.getElementById("length").value;
  const theme = document.getElementById("theme").value;

  try {
    const res = await fetch("/mcp/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ genre, length, theme }),
    });

    const data = await res.json();
    document.getElementById("result").innerText = data.recommendation || data.error;
  } catch (err) {
    document.getElementById("result").innerText = "Error fetching recommendation";
  }
});
