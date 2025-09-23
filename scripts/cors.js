fetch(
  "https://api.allorigins.win/raw?url=https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.text();
  })
  .then((data) => {
    // console.log(data); // pura XML print hoga
  })
  .catch((error) => console.error("Error:", error));
