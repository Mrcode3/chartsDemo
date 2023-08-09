const fetchData = async (key) => {
  try {
    const response = await fetch(`http://localhost:3001/${key}`); // Make a GET request to the backend route
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
};

export { fetchData };
