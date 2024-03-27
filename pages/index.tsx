import React, { useState } from "react";

const Index = () => {
  const [name, setName] = useState<string>("");

  const postHandler = async () => {
    const res = await fetch("/api/data", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Val" />

      <button onClick={postHandler}>Click me</button>
    </div>
  );
};

export default Index;
