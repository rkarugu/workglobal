import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSubmissions, updateSubmissionStatus } from "../utils/adminApi";
import SubmissionModal from "./SubmissionModal";
import { Submission } from "../types";
import api from '../utils/axios';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentRecords, setPaymentRecords] = useState<any[]>([]);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string|null>(null);
  const [paymentPhone, setPaymentPhone] = useState<string|null>(null);

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

  const openPaymentModal = async (phone: string) => {
    setPaymentModalOpen(true);
    setPaymentRecords([]);
    setPaymentLoading(true);
    setPaymentError(null);
    setPaymentPhone(phone);
    try {
      const { data } = await api.get(`/api/payments/by-phone?phone=${encodeURIComponent(phone)}`);
      setPaymentRecords(data);
    } catch (e: any) {
      setPaymentError(e.message || 'Failed to fetch payment info');
    } finally {
      setPaymentLoading(false);
    }
  };

  const closePaymentModal = () => {
    setPaymentModalOpen(false);
    setPaymentRecords([]);
    setPaymentPhone(null);
    setPaymentError(null);
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
            <th className="border p-2">Date of Application</th>
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
              <td className="border p-2">{s.createdAt ? new Date(s.createdAt).toLocaleString() : '-'}</td>
              <td className="border p-2">{s.formData?.fullName ?? "-"}</td>
              <td className="border p-2">{s.formData?.desiredPosition ?? "-"}</td>
              <td className="border p-2">{s.status}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => openModal(s)} className="px-2 py-1 border rounded">View</button>
                <button onClick={() => openPaymentModal(s.formData?.phone)} className="px-2 py-1 border rounded bg-blue-600 text-white">Payment</button>
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
              <td colSpan={6} className="border p-4 text-center">
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
      {/* Payment Modal */}
      {paymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl relative">
            <button onClick={closePaymentModal} className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl">&times;</button>
            <h2 className="text-2xl font-bold mb-4">Payment Information {paymentPhone && (<span className="text-base font-normal">({paymentPhone})</span>)}</h2>
            {paymentLoading ? (
              <p>Loading…</p>
            ) : paymentError ? (
              <p className="text-red-500">{paymentError}</p>
            ) : paymentRecords.length === 0 ? (
              <p>No payment records found for this applicant.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">ID</th>
                      <th className="border p-2">Name</th>
                      <th className="border p-2">Email</th>
                      <th className="border p-2">Phone</th>
                      <th className="border p-2">Amount</th>
                      <th className="border p-2">Status</th>
                      <th className="border p-2">Mpesa Code</th>
                      <th className="border p-2">Payment Method</th>
                      <th className="border p-2">Reference</th>
                      <th className="border p-2">Created At</th>
                      <th className="border p-2">Verified At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentRecords.map((p) => (
                      <tr key={p.id}>
                        <td className="border p-2">{p.id}</td>
                        <td className="border p-2">{p.name}</td>
                        <td className="border p-2">{p.email}</td>
                        <td className="border p-2">{p.phone}</td>
                        <td className="border p-2">{p.amount}</td>
                        <td className="border p-2">{p.status}</td>
                        <td className="border p-2">{p.mpesa_code ?? '-'}</td>
                        <td className="border p-2">{p.payment_method}</td>
                        <td className="border p-2">{p.reference}</td>
                        <td className="border p-2">{p.created_at ? new Date(p.created_at).toLocaleString() : '-'}</td>
                        <td className="border p-2">{p.verified_at ? new Date(p.verified_at).toLocaleString() : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
