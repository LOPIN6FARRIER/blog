import { Navigate, Route, Routes } from "react-router-dom";
import { type ReactElement } from "react";
import Home from "../../pages/Home";
import Photos from "../../pages/Photos";
import Music from "../../pages/Music";
import Videos from "../../pages/Videos";
import Thoughts from "../../pages/Thoughts";
import Articles from "../../pages/Articles";
import Projects from "../../pages/Projects";
import Events from "../../pages/Events";
import Links from "../../pages/Links";
import CreatePost from "../../pages/CreatePost";

import Announcements from "../../pages/Announcements";
import Post from "../../pages/Post";
import NotFound from "../../pages/NotFound";
import Unauthorized from "../../pages/Unauthorized";
import { useUserStore } from "../../store/user.store";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import Entertainment from "../../pages/Entertainment";
import Contacto from "../../pages/Contacto";
import EditPost from "../../pages/EditPost";

function ProtectedRoute({ children }: { children: ReactElement }) {
  const user = useUserStore((state) => state.user);

  if (!user || user.role !== "admin") {
    return <Unauthorized />;
  }

  return children;
}

function GuestRoute({ children }: { children: ReactElement }) {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/photos" element={<Photos />} />
      <Route path="/music" element={<Music />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/thoughts" element={<Thoughts />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/events" element={<Events />} />
      <Route path="/links" element={<Links />} />
      <Route path="/entertainment" element={<Entertainment />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route
        path="/create-post"
        element={
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        }
      />
      <Route
        path="/posts/:id/edit"
        element={
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        }
      />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/posts/:id" element={<Post />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <GuestRoute>
            <SignUp />
          </GuestRoute>
        }
      />
    </Routes>
  );
}
