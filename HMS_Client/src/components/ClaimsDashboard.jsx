// ClaimsDashboard.jsx
import React, { useState, useEffect } from "react";

export default function ClaimsDashboard() {
  const [policyId, setPolicyId] = useState("");
  const [claimId, setClaimId] = useState("");
  const [claims, setClaims] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  // Fetch all claims on load
  useEffect(() => {
    fetch("http://localhost:9090/claim/all") // You can add a backend endpoint for all claims
      .then((res) => res.json())
      .then(setClaims)
      .catch(console.error);
  }, []);

  // Search by Claim ID
  const searchClaimById = () => {
    if (!claimId) return;
    fetch(`http://localhost:9090/claim/${claimId}`)
      .then((res) => res.json())
      .then(setSearchResult)
      .catch(() => setSearchResult(null));
  };

  // Create Claim
  const createClaim = (amount, policyId) => {
    fetch("http://localhost:9090/claim/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ policyId, claimAmount: amount }),
    })
      .then((res) => res.json())
      .then((claim) => setClaims((prev) => [...prev, claim]))
      .catch(console.error);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Insurance Claims Dashboard</h2>

      {/* Search Claim */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Search Claim by ID</h3>
        <input
          type="text"
          value={claimId}
          onChange={(e) => setClaimId(e.target.value)}
          placeholder="Enter Claim ID"
          className="border px-3 py-2 rounded mr-2"
        />
        <button
          onClick={searchClaimById}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>

        {searchResult && (
          <div className="mt-4 p-4 bg-white rounded shadow">
            <p><strong>Claim ID:</strong> {searchResult.claimId}</p>
            <p><strong>Status:</strong> {searchResult.claimStatus}</p>
            <p><strong>Amount:</strong> ${searchResult.claimAmount}</p>
            <p><strong>Policy ID:</strong> {searchResult.policyId}</p>
          </div>
        )}
      </div>

      {/* Create Claim */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Create Claim</h3>
        <input
          type="text"
          value={policyId}
          onChange={(e) => setPolicyId(e.target.value)}
          placeholder="Enter Policy ID"
          className="border px-3 py-2 rounded mr-2"
        />
        <button
          onClick={() => createClaim(1000, policyId)} // example amount
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Claim
        </button>
      </div>

      {/* All Claims */}
      <h3 className="font-semibold mb-2">All Claims</h3>
      <div className="space-y-4">
        {claims.map((claim) => (
          <div key={claim.claimId} className="bg-white p-4 rounded shadow">
            <p><strong>Claim ID:</strong> {claim.claimId}</p>
            <p><strong>Status:</strong> {claim.claimStatus}</p>
            <p><strong>Amount:</strong> ${claim.claimAmount}</p>
            <p><strong>Policy ID:</strong> {claim.policyId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
