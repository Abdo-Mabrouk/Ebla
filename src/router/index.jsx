import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout/Layout";

const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Register = lazy(() => import("../pages/Auth/Register"));
const ChatPage = lazy(() => import("../pages/Chat/ChatPage"));
const SmartSearchPage = lazy(
  () => import("../pages/SmartSearch/SmartSearchPage"),
);
const PersonaPage = lazy(() => import("../pages/Persona/PersonaPage"));
const HistoryPage = lazy(() => import("../pages/History/HistoryPage"));
const BotPage = lazy(() => import("../pages/Bot/BotPage"));
const VideoPage = lazy(() => import("../pages/Video/VideoPage"));
const DocsPage = lazy(() => import("../pages/Docs/DocsPage"));
const WebTrackPage = lazy(() => import("../pages/WebTrack/WebTrackPage"));

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children }) {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/" replace />;
}

function SuspenseRoute({ children }) {
  return (
    <Suspense fallback={<div className="p-4 text-center">جاري التحميل...</div>}>
      {children}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <GuestRoute>
        <SuspenseRoute>
          <Login />
        </SuspenseRoute>
      </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <SuspenseRoute>
          <Register />
        </SuspenseRoute>
      </GuestRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <SuspenseRoute>
            <Home />
          </SuspenseRoute>
        ),
      },
      {
        path: "chat",
        element: (
          <SuspenseRoute>
            <ChatPage />
          </SuspenseRoute>
        ),
      },
      {
        path: "smart-search",
        element: (
          <SuspenseRoute>
            <SmartSearchPage />
          </SuspenseRoute>
        ),
      },
      {
        path: "persona",
        element: (
          <SuspenseRoute>
            <PersonaPage />
          </SuspenseRoute>
        ),
      },
      {
        path: "history",
        element: (
          <SuspenseRoute>
            <HistoryPage />
          </SuspenseRoute>
        ),
      },
      {
        path: "bot",
        element: (
          <SuspenseRoute>
            <BotPage />
          </SuspenseRoute>
        ),
      },
      {
        path: "video",
        element: (
          <SuspenseRoute>
            <VideoPage />
          </SuspenseRoute>
        ),
      },
      {
        path: "docs",
        element: (
          <SuspenseRoute>
            <DocsPage />
          </SuspenseRoute>
        ),
      },
      {
        path: "web-track",
        element: (
          <SuspenseRoute>
            <WebTrackPage />
          </SuspenseRoute>
        ),
      },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
