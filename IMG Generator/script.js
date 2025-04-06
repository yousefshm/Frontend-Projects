const getImage = async () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${api}`,
    },
    body: JSON.stringify({
      prompt: inp.value,
      n: 3,  // If n=3 is too high, try n=1 to see if the request goes through
      size: "1024x1024",
    }),
  };

  try {
    const res = await fetch("https://api.openai.com/v1/images/generations", options);
    if (!res.ok) {
      const errorData = await res.json();  // Capture more details about the error
      console.error("Error Details:", errorData); // Log specific error details for debugging
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    
    const data = await res.json();
    const listImages = data.data;
    images.innerHTML = "";
    listImages.map(function (photo) {
      const container = document.createElement("div");
      images.append(container);
      const img = document.createElement("img");
      container.append(img);
      img.src = photo.url;
    });
  } catch (error) {
    console.error("Failed to fetch image:", error);
    alert("Error fetching image. Please check the console for details.");
  }
};
