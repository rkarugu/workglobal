import React from "react";
import { Submission } from "../types";

interface Props {
  submission: Submission | null;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

const SubmissionModal: React.FC<Props> = ({ submission, onClose, onApprove, onReject }) => {
  if (!submission) return null;

  const form = (submission as any).formData ?? {};
  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800'
  };

  const apiBase = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full overflow-y-auto max-h-[90vh]">
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Applicant #{submission.id}</h2>
            <span className={`mt-1 inline-block px-2 py-0.5 text-xs rounded ${statusColors[submission.status]}`}>{submission.status}</span>
          </div>
          <h2 className="text-xl font-bold">Applicant #{submission.id}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="p-6 text-sm grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
          {Object.entries(form).map(([key, value]) => (
            <div key={key}>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">{key.replace(/([A-Z])/g,' $1')}</p>
              <p className="text-gray-800 break-words">{String(value)}</p>
            </div>
          ))}
          {submission.paymentInfo && (
            <div className="sm:col-span-2">
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Payment Information</p>
              <div className="space-y-1">
                <p>Card: **** **** **** {submission.paymentInfo.cardNumber.slice(-4)}</p>
                <p>Expiry: {submission.paymentInfo.expiry}</p>
              </div>
            </div>
          )}
          {(submission.resumePath || submission.idCopyPath || (submission.certPaths && submission.certPaths.length)) && (
            <div className="sm:col-span-2">
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Documents</p>
              <ul className="list-disc list-inside space-y-1 text-blue-600 underline">
                {submission.resumePath && (
                  <li>
                    <a href={`${apiBase}${submission.resumePath}`} target="_blank" rel="noopener noreferrer">Resume/CV</a>
                  </li>
                )}
                {submission.idCopyPath && (
                  <li>
                    <a href={`${apiBase}${submission.idCopyPath}`} target="_blank" rel="noopener noreferrer">ID/Passport</a>
                  </li>
                )}
                {submission.certPaths?.map((p, i) => (
                  <li key={i}>
                    <a href={`${apiBase}${p}`} target="_blank" rel="noopener noreferrer">Certificate {i + 1}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="p-4 border-t flex justify-end space-x-2">
          {submission.status === "PENDING" && (
            <>
              <button onClick={onApprove} className="bg-green-600 text-white px-4 py-2 rounded">Approve</button>
              <button onClick={onReject} className="bg-red-600 text-white px-4 py-2 rounded">Reject</button>
            </>
          )}
          <button onClick={onClose} className="px-4 py-2 border rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;
