import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSubmissions, updateSubmissionStatus } from "../utils/adminApi";
import SubmissionModal from "./SubmissionModal";
import { Submission } from "../types";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("admin_jwt");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }

    const load = async () => {
      try {
        const data = await fetchSubmissions(token);
        setSubmissions(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  const handleUpdate = async (id: number, status: "APPROVED" | "REJECTED") => {
    if (!token) return;
    try {
      await updateSubmissionStatus(id, status, token);
      setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const openModal = (s: Submission) => setSelected(s);
  const closeModal = () => setSelected(null);

  const toggleMenu = () => setMenuOpen((p) => !p);
  const logout = () => {
    localStorage.removeItem("admin_jwt");
    navigate("/admin/login");
  };

  if (loading) return (
    <div className="p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="flex items-center space-x-2 px-3 py-2 border rounded hover:bg-gray-50"
          >
            <span className="material-icons">account_circle</span>
            <span className="hidden sm:block">Profile</span>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      <p>Loading…</p>
    </div>
  );
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="flex items-center space-x-2 px-3 py-2 border rounded hover:bg-gray-50"
          >
            <span className="material-icons">account_circle</span>
            <span className="hidden sm:block">Profile</span>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      <h1 className="text-3xl font-bold mb-6">Submissions</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Applicant</th>
            <th className="border p-2">Position</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((s) => (
            <tr key={s.id}>
              <td className="border p-2">{s.id}</td>
              <td className="border p-2">{s.formData?.fullName ?? "-"}</td>
              <td className="border p-2">{s.formData?.position ?? "-"}</td>
              <td className="border p-2">{s.status}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => openModal(s)} className="px-2 py-1 border rounded">View</button>
                {s.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => handleUpdate(s.id, "APPROVED")}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleUpdate(s.id, "REJECTED")}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {submissions.length === 0 && (
            <tr>
              <td colSpan={5} className="border p-4 text-center">
                No submissions yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <SubmissionModal
        submission={selected}
        onClose={closeModal}
        onApprove={() => {
          if (selected) handleUpdate(selected.id, "APPROVED");
          closeModal();
        }}
        onReject={() => {
          if (selected) handleUpdate(selected.id, "REJECTED");
          closeModal();
        }}
      />
    </div>
  );
};

export default AdminDashboard;
