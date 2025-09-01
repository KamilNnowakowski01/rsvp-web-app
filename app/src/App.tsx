// Zaktualizowany App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "@/pages/About";
import MainContent from "./components/content/MainContent";
import Layout from "@/components/layouts/Layout";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import EventCreator from "@/pages/EventCreator";
import EventsView from "@/pages/ManagementPanel/EventsView";
import UsersView from "@/pages/ManagementPanel/UsersView";
import SettingsView from "@/pages/ManagementPanel/SettingsView";
import DetailsEventView from "@/pages/ManagementPanel/DetailsEventView";
import LoginPage from "@/pages/Authentication/LoginPage";
import RegisterPage from "@/pages/Authentication/RegisterPage";
import ManagementLayout from "./components/layouts/ManagementLayout";
import UserEditView from "@/pages/ManagementPanel/UserEditView";
import EventDashboard from "@/pages/ManagementPanel/EventDashboard";
import WebsitesView from "@/pages/ManagementPanel/WebsitesView";
import EmailsView from "@/pages/ManagementPanel/EmailsView";
import PaymentsView from "@/pages/ManagementPanel/PaymentsView";
import TicketsView from "@/pages/ManagementPanel/TicketsView";
import ProfileView from "@/pages/ProfileView";
import HelperView from "@/pages/ManagementPanel/HelperView"; // Dodany import

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<MainContent />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="creator" element={<EventCreator />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/management/event" element={<ManagementLayout />}>
          <Route index element={<EventsView />} />
          <Route path=":idEvent" element={<DetailsEventView />} />
          <Route path=":idEvent/dashboard" element={<EventDashboard />} />
          <Route path=":idEvent/userlist" element={<UsersView />} />
          <Route path=":idEvent/userlist/:username" element={<UserEditView />} />
          <Route path=":idEvent/websites" element={<WebsitesView />} />
          <Route path=":idEvent/emails" element={<EmailsView />} />
          <Route path=":idEvent/payments" element={<PaymentsView />} />
          <Route path=":idEvent/settings" element={<SettingsView />} />
          <Route path=":idEvent/tickets" element={<TicketsView />} />
          <Route path=":idEvent/helper" element={<HelperView />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}