import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShowDetails from "./components/ShowDetails";
import BookingForm from "./components/BookingForm";
import Layout from "./components/Layout";


function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="show/:showId" element={<ShowDetails />} />
            <Route path="booking/:showId" element={<BookingForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
