import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/photos" element={<div>Photos</div>} />
      <Route path="/music" element={<div>Music</div>} />
      <Route path="/videos" element={<div>Videos</div>} />
      <Route path="/thoughts" element={<div>Thoughts</div>} />
      <Route path="/articles" element={<div>Articles</div>} />
      <Route path="/projects" element={<div>Projects</div>} />
      <Route path="/events" element={<div>Events</div>} />
      <Route path="/links" element={<div>Links</div>} />
      <Route path="/contacto" element={<div>Contacto</div>} />
    </Routes>
  );
}
