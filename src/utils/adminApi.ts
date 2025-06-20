import { Submission } from "../types";

const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export async function adminLogin(email: string, password: string): Promise<{ token: string }> {
  const res = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error(`Login failed (${res.status})`);
  }
  return (await res.json()) as { token: string };
}

export async function fetchSubmissions(token: string): Promise<Submission[]> {
  const res = await fetch(`${baseUrl}/api/admin/submissions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to load submissions (${res.status})`);
  }
  return (await res.json()) as Submission[];
}

export async function updateSubmissionStatus(
  id: number,
  status: "APPROVED" | "REJECTED",
  token: string
) {
  const action = status === "APPROVED" ? "approve" : "reject";
  const res = await fetch(`${baseUrl}/api/admin/submissions/${id}/${action}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to update submission (${res.status})`);
  }
}
