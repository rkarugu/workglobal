import React, { useState, useEffect, useRef } from "react";
import paymentApi from "../utils/paymentApi";

interface Props {
  onPaid: (paymentDetails: { name: string; email: string; phone: string }) => void;
  fullName?: string;
  email?: string;
  phone?: string;
}

const POLL_INTERVAL = 4000; // 4 seconds
const TIMEOUT_MS = 2 * 60 * 1000; // 2 minutes

const TermsAndPayment: React.FC<Props> = ({ onPaid, fullName, email, phone: initialPhone }) => {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [mpesaCode, setMpesaCode] = useState('');
  const [paybillInfo, setPaybillInfo] = useState<any>(null);
  const [showManual, setShowManual] = useState(false);
  const [waitingSTK, setWaitingSTK] = useState(false);
  const [stkInitiated, setStkInitiated] = useState(false);
  const [polling, setPolling] = useState(false);
  const pollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [paymentInfo, setPaymentInfo] = useState({
    name: fullName || '',
    email: email || '',
    phone: initialPhone || ''
  });

  useEffect(() => {
    if (waitingSTK && paymentId && !showManual) {
      setPolling(true);
      const start = Date.now();
      const poll = async () => {
        try {
          const res = await paymentApi.get(`/api/payments/${paymentId}`);
          if (res.data.status === 'verified') {
            setPolling(false);
            setWaitingSTK(false);
            onPaid(paymentInfo);
            return;
          }
          if (Date.now() - start > TIMEOUT_MS) {
            setPolling(false);
            setWaitingSTK(false);
            setShowManual(true);
            return;
          }
          if (!showManual) {
            pollTimeoutRef.current = setTimeout(poll, POLL_INTERVAL);
          }
        } catch (e) {
          setPolling(false);
          setWaitingSTK(false);
          setShowManual(true);
        }
      };
      poll();
      return () => {
        if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current);
      };
    }
  }, [waitingSTK, paymentId, showManual, onPaid, paymentInfo]);

  const handleInitiate = async () => {
    if (!paymentInfo.name || !paymentInfo.email || !paymentInfo.phone) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);
    setShowManual(false);
    setWaitingSTK(false);
    setStkInitiated(false);
    try {
      const { data } = await paymentApi.post("/api/payments/mpesa", {
        name: paymentInfo.name,
        email: paymentInfo.email,
        phone: paymentInfo.phone,
        amount: 5200,
        terms_accepted: accepted,
      });
      setPaymentId(data.payment_id);
      setPaybillInfo(data.paybill);
      if (data.stk && data.stk.success) {
        setWaitingSTK(true);
        setStkInitiated(true);
      } else {
        setShowManual(true);
        setStkInitiated(false);
        setError(data.stk?.error || 'STK Push could not be initiated. Please use manual payment.');
      }
    } catch (e: any) {
      setError(e.message || "Failed to initialize payment");
      setShowManual(true);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!paymentId) return;
    setLoading(true);
    setError(null);
    try {
      await paymentApi.post(`/api/payments/${paymentId}/verify`, {
        mpesa_code: mpesaCode,
      });
      onPaid(paymentInfo);
    } catch (e: any) {
      setError(e.message || "Invalid M-Pesa code");
    } finally {
      setLoading(false);
    }
  };

  const handleManualFallback = () => {
    setShowManual(true);
    setWaitingSTK(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-4xl font-bold text-center mb-8 text-slate-800">
          Terms & Conditions
        </h2>

      <div className="space-y-6">
        {/* Terms and Conditions */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-4 max-h-[400px] overflow-y-auto">
          <h3 className="text-xl font-semibold text-gray-800">TERMS AND CONDITIONS OF USE OF WORKFORCEINTERNATIONAL LIMITED PLATFORMS</h3>
          
          <div className="space-y-4 text-gray-600">
            <p><strong>1. Introduction</strong></p>
            <p>Workforceinternational Limited ("Company," "we," "us," or "our") provides a digital platform accessible via www.workforceinternational.com and the Workforceinternational Mobile Application (collectively, the "Platform") that connects job seekers ("Applicants") with employers ("Employers") for fixed-term contractual opportunities worldwide. These Terms and Conditions ("Terms") constitute a legally binding agreement governing all users ("User," "you," or "your") who access or utilize the Platform. By registering an account, submitting an application, or engaging with our Services, you expressly acknowledge, understand, and agree to comply with these Terms in their entirety. If you do not accept any provision herein, you must immediately cease all use of the Platform.</p>

            <p><strong>2. Definitions</strong></p>
            <p>The following terms shall have the meanings ascribed to them throughout this agreement: "Applicant" refers to any individual seeking employment opportunities through the Platform. "Employer" denotes any corporate entity, organization, or individual seeking labor or expertise via the Platform. "Services" encompass all offerings provided by Workforceinternational Limited, including but not limited to job placement facilitation, recruitment coordination, document verification, and visa processing assistance. "Fees" include all mandatory and discretionary charges levied on Users for accessing premium features, application processing, due diligence, and other value-added services, as further detailed in Section 5.</p>

            <p><strong>3. Eligibility and Account Registration</strong></p>
            <p>To qualify as a User of the Platform, you must be at least eighteen (18) years of age and possess the legal capacity to enter into binding contractual obligations under the applicable laws of your jurisdiction. Applicants are required to furnish accurate, current, and complete personal and professional details during the registration process, including but not limited to educational qualifications, employment history, certifications, and contact information. Employers must undergo a verification process to confirm their legitimacy, which may involve submission of business licenses, tax identification documents, or other proof of organizational existence. Workforceinternational Limited reserves the unilateral right to suspend or terminate any account that provides false, misleading, or incomplete information without prior notice or liability.</p>

            <p><strong>4. Description of Services</strong></p>
            <p>Workforceinternational Limited operates as an intermediary platform bridging the gap between Applicants and Employers by facilitating fixed-term employment contracts of varying durations, as dictated by the hiring party. Our Services include, but are not limited to, job listing aggregation, applicant screening, interview coordination, and post-placement support. The Platform also offers ancillary services such as document authentication, notarization, and visa application assistance, subject to additional Fees. It is expressly understood that Workforceinternational Limited does not function as an employer, and no employer-employee relationship is established between the Company and any Applicant. We do not guarantee job placement, interview selection, or successful visa approvals, as these outcomes depend on third-party decisions beyond our control.</p>

            <p><strong>5. Fee Structure and Payment Terms</strong></p>
            <p><strong>5.1. Applicable Fees</strong></p>
            <p>Workforceinternational Limited imposes various Fees to sustain operational efficiency and deliver premium Services. Applicants may incur the following charges:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Registration Fee: A one-time, non-refundable payment required to activate an Applicant's account on the Platform, granting access to basic job listings and application submission capabilities.</li>
              <li>Processing Fee: A mandatory charge applied per job application submitted through the Platform, covering administrative costs associated with resume parsing, employer matching, and application forwarding.</li>
              <li>Due Diligence Fee: An investigative charge levied for comprehensive background verification, which may include criminal record checks, employment history validation, credential authentication, and reference verification.</li>
              <li>Document Authentication and Notarization Fee: A service charge applied when Applicants require certified attestation, legalization, or notarization of educational certificates, professional licenses, or other supporting documents.</li>
              <li>Premium Placement Fee: An optional charge for prioritized profile visibility, guaranteed employer review, and expedited application processing.</li>
              <li>Visa/Work Permit Assistance Fee: A variable charge covering consultancy services for visa application preparation, consular coordination, and immigration compliance support.</li>
            </ul>

            <p><strong>5.2. Payment Obligations</strong></p>
            <p>All Fees are non-refundable, irrespective of application outcome, interview performance, or Employer rejection. Payments must be rendered through the Platform's integrated third-party payment gateways, and Users agree not to initiate chargebacks or payment disputes without prior written consent from Workforceinternational Limited. Delinquent accounts may be suspended, and overdue balances will accrue interest at a rate of 5% per month.</p>

            <p><strong>6. No Guarantee of Employment or Services</strong></p>
            <p>Workforceinternational Limited explicitly disclaims any warranty, express or implied, regarding the success of job applications, the availability of vacancies, or the suitability of Applicants for specific roles. The Company serves solely as a facilitator and assumes no liability for Employer hiring decisions, visa rejections by governmental authorities, contract breaches between Applicants and Employers, or workplace disputes post-placement.</p>

            <p><strong>7. Limitation of Liability</strong></p>
            <p>To the maximum extent permissible under applicable law, Workforceinternational Limited, its directors, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to lost profits, reputational harm, or emotional distress, arising from Platform use, Service delivery, or third-party interactions.</p>

            <p><strong>8. Indemnification</strong></p>
            <p>Users agree to indemnify, defend, and hold harmless Workforceinternational Limited from and against all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from: (a) misrepresentation of credentials or eligibility; (b) unauthorized use of the Platform; (c) violation of third-party intellectual property rights; (d) breach of these Terms; or (e) disputes with Employers or co-workers post-placement.</p>

            <p><strong>9. Intellectual Property Rights</strong></p>
            <p>The Platform, including its software, algorithms, logos, trademarks, and content, is the exclusive property of Workforceinternational Limited and is protected under international copyright and trademark laws. Users are granted a limited, non-exclusive, revocable license to access the Platform for personal, non-commercial use.</p>

            <p><strong>10. Termination and Account Suspension</strong></p>
            <p>Workforceinternational Limited reserves the right to suspend or terminate User accounts at its sole discretion, without prior notice, for violations of these Terms, fraudulent activity, or non-payment of Fees. Users may request account deletion via written notice, but all Fees paid prior to termination remain non-refundable.</p>

            <p><strong>11. Dispute Resolution and Governing Law</strong></p>
            <p>Any disputes arising from these Terms shall first be resolved through good-faith negotiations. If unresolved within thirty (30) days, the matter shall be referred to mediation in Dubai, UAE, with costs shared equally. Should mediation fail, binding arbitration shall be conducted in person under the rules of the Dubai International Arbitration Centre (DIAC). These Terms are governed by UAE federal laws, excluding conflict-of-law principles.</p>

            <p><strong>12. Amendments and Modifications</strong></p>
            <p>Workforceinternational Limited may amend these Terms at any time by posting revised versions on the Platform. Continued use after modifications constitutes acceptance. Users are responsible for periodically reviewing updates.</p>

            <p><strong>13. Force Majeure</strong></p>
            <p>The Company shall not be liable for delays or failures in performance resulting from acts beyond its reasonable control, including but not limited to governmental delays, natural disasters, war, terrorism, pandemics, or governmental restrictions.</p>

            <p><strong>14. General Provisions</strong></p>
            <p>If any provision herein is deemed invalid, the remainder shall remain enforceable. No waiver of any breach shall constitute a waiver of subsequent breaches. These Terms constitute the entire agreement between Users and Workforceinternational Limited, superseding all prior understandings.</p>

            <p><strong>15. Contact Information</strong></p>
            <p>For inquiries regarding these Terms, please contact:</p>
            <p>Workforceinternational Limited<br/>
            Al Manara Area,<br/>
            Sheikh Zayed Road,<br/>
            Near Emirates Towers Metro Station,<br/>
            Dubai, UAE<br/>
            Email: recruitments@workforceinternational.com</p>
          </div>
        </div>
        
        {/* Terms Acceptance */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I have read and agree to the terms and conditions, including the non-refundable application fee of KES 5,200.
          </label>
        </div>

        {accepted && (
          <>
            {/* User Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
              <input
                type="text"
                  value={paymentInfo.name}
                  onChange={(e) => setPaymentInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={paymentInfo.email}
                  onChange={(e) => setPaymentInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (M-Pesa) *
                </label>
                <input
                  type="tel"
                  value={paymentInfo.phone}
                  onChange={(e) => setPaymentInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                  placeholder="254700000000"
              />
              </div>
            </div>

            {/* Application Fee Notice */}
            <div className="bg-pink-50 p-4 rounded-lg">
              <p className="text-lg font-semibold text-red-600">
                Application Fee: KES 5,200 (non-refundable)
              </p>
            </div>

            {/* Payment Status and Actions */}
            <div className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                  {error}
                </div>
              )}

              {!paymentId && (
                <button
                  onClick={handleInitiate}
                  disabled={loading || !paymentInfo.name || !paymentInfo.email || !paymentInfo.phone}
                  className={`w-full font-bold py-4 px-12 rounded-lg text-lg transition-all duration-300 transform shadow-lg ${
                    loading || !paymentInfo.name || !paymentInfo.email || !paymentInfo.phone
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                  }`}
                >
                  {loading ? 'Processing...' : 'Pay with M-Pesa'}
                </button>
              )}

              {/* STK Push Status */}
              {stkInitiated && waitingSTK && (
                <div className="text-center space-y-4">
                  <p className="text-lg text-gray-600">
                    Please check your phone for the M-Pesa prompt and enter your PIN to complete the payment.
                  </p>
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                  <button
                    onClick={handleManualFallback}
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    Didn't receive the prompt?
                  </button>
                </div>
              )}

              {/* Manual Payment Section */}
              {showManual && paybillInfo && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                    <p className="font-semibold">Manual Payment Instructions:</p>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      <li>Go to M-Pesa</li>
                      <li>Select Lipa na M-Pesa</li>
                      <li>Enter Till number: 493969</li>
                      <li>Enter Amount: {paybillInfo.amount}</li>
                      <li>Enter your M-Pesa PIN</li>
                    </ol>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter M-Pesa Transaction Code</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={mpesaCode}
                        onChange={(e) => setMpesaCode(e.target.value.toUpperCase())}
                        placeholder="e.g., QWE1234567"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all uppercase"
                      />
              <button
                onClick={handleVerify}
                        disabled={loading || !mpesaCode}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                          loading || !mpesaCode
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
              >
                        {loading ? 'Verifying...' : 'Verify Payment'}
              </button>
            </div>
          </div>
        </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TermsAndPayment;
