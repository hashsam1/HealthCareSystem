import React, { useState } from "react";

export default function ClaimsDashboard() {
  const [policyId, setPolicyId] = useState("");
  const [billId, setBillId] = useState("");
  const [claimId, setClaimId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [createdClaim, setCreatedClaim] = useState(null);
  const [error, setError] = useState(null);

  // Search by Claim ID
  const searchClaimById = () => {
    if (!claimId) {
      setError("Please enter a Claim ID");
      return;
    }
    fetch(`http://localhost:9090/api/claims/${claimId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Claim not found");
        return res.json();
      })
      .then((data) => {
        setSearchResult(data);
        setError(null);
      })
      .catch((err) => {
        setSearchResult(null);
        setError(err.message);
      });
  };

  // Create Claim using Bill ID + Policy ID
  const createClaim = () => {
    if (!policyId || !billId) {
      setError("Please enter both Bill ID and Policy ID");
      return;
    }

    // 1. Fetch the Bill first
    fetch(`http://localhost:9090/api/bill/${billId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Bill not found");
        return res.json();
      })
      .then((billData) => {
        // 2. Use bill amount in claim
        return fetch("http://localhost:9090/api/claims/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            policyId,
            claimAmount: billData.amount, // take amount from Bill
            claimStatus: "PENDING",
          }),
        });
      })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create claim");
        return res.json();
      })
      .then((data) => {
        setCreatedClaim(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setCreatedClaim(null);
      });
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

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {searchResult && (
          <div className="mt-4 p-4 bg-white rounded shadow">
            <p><strong>Claim ID:</strong> {searchResult.claimId}</p>
            <p><strong>Status:</strong> {searchResult.claimStatus}</p>
            <p><strong>Amount:</strong> ${searchResult.claimAmount}</p>
            <p><strong>Policy ID:</strong> {searchResult.policyId}</p>
            <p><strong>Date:</strong> {new Date(searchResult.claimDate).toLocaleString()}</p>
          </div>
        )}
      </div>

      {/* Create Claim */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Create Claim</h3>
        <input
          type="text"
          value={billId}
          onChange={(e) => setBillId(e.target.value)}
          placeholder="Enter Bill ID"
          className="border px-3 py-2 rounded mr-2"
        />
        <input
          type="text"
          value={policyId}
          onChange={(e) => setPolicyId(e.target.value)}
          placeholder="Enter Policy ID"
          className="border px-3 py-2 rounded mr-2"
        />
        <button
          onClick={createClaim}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Claim
        </button>

        {createdClaim && (
          <div className="mt-4 p-4 bg-white rounded shadow">
            <p><strong>Claim Created!</strong></p>
            <p><strong>Claim ID:</strong> {createdClaim.claimId}</p>
            <p><strong>Status:</strong> {createdClaim.claimStatus}</p>
            <p><strong>Amount:</strong> ${createdClaim.claimAmount}</p>
            <p><strong>Policy ID:</strong> {createdClaim.policyId}</p>
            <p><strong>Date:</strong> {new Date(createdClaim.claimDate).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}
