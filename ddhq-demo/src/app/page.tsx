"use client"
import Image from "next/image";
import TextBlock from "./TextBlock";
import React, { useState, useEffect } from "react"

export default function Home() {
    const [image_url, set_image_url] = useState<string | null>(null);
    useEffect(() => {
      set_image_url("http://localhost:8000/test");
      }, []);
  return (
    <>
      <div className="centered">
      { image_url ? (
      <img src={image_url} alt="Bigram Histogram" width='400px'/>
      ) : (
       <p>Input data</p>
       )}
    </div>
    <div className="App-content">
      <TextBlock/>
    </div>
  </>
    );
}
