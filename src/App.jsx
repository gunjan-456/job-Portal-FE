import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Jobs from "./Pages/Jobs";
import ProtectedRoute from "./Components/ProtectedRoute";
import Applications from "./Pages/Application"
import MyJobs from "./Pages/MyJobs"
import Applicants from "./Pages/Applicants"
import CreateJobs from "./Pages/CreateJobs"
import UpdateJob from "./Pages/UpdateJob"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />

        <Route
        path="/my-jobs"
        element={
        <ProtectedRoute>
          <MyJobs />
        </ProtectedRoute>
      }
      />


      {/* <Route
      path="/applicants/:jobId"
      element={
      <ProtectedRoute>
        <Applicants />
        </ProtectedRoute>
      }
      /> */}

      <Route path="/applicants/:id" element={<Applicants />} />



      <Route
      path="/create-job"
      element={
      <ProtectedRoute>
        <CreateJobs />
        </ProtectedRoute>
      }
      />


      <Route
      path="/update-job/:id"
      element={
      <ProtectedRoute>
        <UpdateJob />
      </ProtectedRoute>
    }
    />

        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;