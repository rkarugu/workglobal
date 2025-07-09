import api from './axios';
import { Submission } from "../types";

export async function adminLogin(email: string, password: string): Promise<{ token: string }> {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
}

export async function fetchSubmissions(token: string): Promise<Submission[]> {
  const response = await api.get('/api/admin/submissions', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // Map created_at to createdAt for each submission
  return response.data.map((s: any) => ({
    ...s,
    createdAt: s.created_at || s.createdAt,
  }));
}

export async function updateSubmissionStatus(
  id: number,
  status: "APPROVED" | "REJECTED",
  token: string
) {
  const action = status === "APPROVED" ? "approve" : "reject";
  await api.post(`/api/admin/submissions/${id}/${action}`, {},
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
