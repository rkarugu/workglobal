import { ApplicationFormData } from "../types";

function serializeFormData(data: ApplicationFormData) {
  // Remove File / FileList fields because JSON.stringify will omit them anyway
  const { resume, idCopy, certFiles, ...rest } = data as any;
  return rest;
}

export async function postSubmission(formData: ApplicationFormData) {
  const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

  // Build multipart FormData
  const fd = new FormData();
  fd.append("formData", JSON.stringify(serializeFormData(formData)));
  if (formData.resume) fd.append("resume", formData.resume);
  if (formData.idCopy) fd.append("idCopy", formData.idCopy);
  if (formData.certFiles) {
    Array.from(formData.certFiles).forEach((file) => fd.append("certFiles", file));
  }

  const response = await fetch(`${baseUrl}/api/submissions`, {
    method: "POST",
    body: fd,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Submission failed: ${response.status} ${text}`);
  }
  return (await response.json()) as { id: number };
}
