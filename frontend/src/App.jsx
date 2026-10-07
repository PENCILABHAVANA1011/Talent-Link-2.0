import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CreateProject from "./Pages/CreateProject";
import Dashboard from "./Pages/Dashboard";
import ClientDashboard from "./Pages/ClientDashboard";
import Projects from "./Pages/Projects";
import ProjectDetails from "./Pages/ProjectDetails";
import ClientProjects from "./Pages/ClientProjects";
import ClientProposals from "./Pages/ClientProposals";
import MyProposals from "./Pages/MyProposals";
import Profile from "./Pages/Profile";
import FreelancerContracts from "./Pages/FreelancerContracts";
import ContractDetails from "./Pages/ContractDetails";
import ClientContracts from "./Pages/ClientContracts";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/create-project"
          element={<CreateProject />}
        />

        {/* =========================
            FREELANCER
        ========================= */}

        <Route
          path="/freelancer-dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/projects/:id"
          element={<ProjectDetails />}
        />

        <Route
          path="/my-proposals"
          element={<MyProposals />}
        />

        <Route
          path="/freelancer-contracts"
          element={<FreelancerContracts />}
        />

        <Route
          path="/freelancer-contracts/:id"
          element={<ContractDetails />}
        />

        {/* =========================
            CLIENT
        ========================= */}

        <Route
          path="/client-dashboard"
          element={<ClientDashboard />}
        />

        <Route
          path="/client-projects"
          element={<ClientProjects />}
        />

        <Route
          path="/client-proposals"
          element={<ClientProposals />}
        />

        <Route
          path="/client-contracts"
          element={<ClientContracts />}
        />

        {/* =========================
            PROFILE
        ========================= */}

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* =========================
            CONTRACT DETAILS
        ========================= */}

        <Route
          path="/contracts/:id"
          element={<ContractDetails />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;