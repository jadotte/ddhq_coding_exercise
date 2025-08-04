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
      <div>
        <head><title>DDHQ Coding Exercise</title>
        </head>
      </div>
      <h1>
        DDHQ Coding Exercise
      </h1>
      <div className="App-content">
        <TextBlock/>
      </div>
    </>
    );
}
