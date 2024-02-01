// src/components/Home.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import ShowList from "../components/ShowList";
import ShowDetails from "../components/ShowDetails";
import BookingForm from "../components/BookingForm";

function Home() {
  return (
    <Routes>
      <Route path="/" element={<ShowList />} />
      <Route path="/show/:showId" element={<ShowDetails />} />
      <Route path="/booking/:showId" element={<BookingForm />} />
    </Routes>
  );
}

export default Home;
