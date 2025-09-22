import React, { useState, useEffect } from 'react';

const GenerateBill = () => {
  const [bills, setBills] = useState([]);
  const [searchPatientId, setSearchPatientId] = useState('');
  const [searchedBills, setSearchedBills] = useState([]); // now can return multiple bills
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all bills
  const fetchAllBills = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:9090/bill');
      if (!response.ok) throw new Error('Failed to fetch bills');
      const data = await response.json();
      setBills(data);
      setError('');
    } catch (err) {
      setError('Error fetching bills: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Search bill(s) by patient ID
  const searchBillByPatientId = () => {
    if (!searchPatientId) {
      setError('Please enter a patient ID');
      return;
    }
    const results = bills.filter(
      (b) => b.appointment?.patient?.id?.toString() === searchPatientId.toString()
    );
    if (results.length === 0) {
      setSearchedBills([]);
      setError('No bills found for this patient ID');
    } else {
      setSearchedBills(results);
      setError('');
    }
  };

  // Mark bill as paid
  const markAsPaid = async (billId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:9090/bill/${billId}`);
      if (!response.ok) throw new Error('Failed to fetch bill details');
      const bill = await response.json();

      const updateResponse = await fetch(`http://localhost:9090/bill/${billId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...bill, status: 'PAID' }),
      });
      if (!updateResponse.ok) throw new Error('Failed to update bill status');

      setSuccess('Bill marked as paid successfully');
      fetchAllBills();
      setSearchedBills((prev) =>
        prev.map((b) => (b.billId === billId ? { ...b, status: 'PAID' } : b))
      );
    } catch (err) {
      setError('Error updating bill: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBills();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Search Bills by Patient ID
          </h2>
          <div className="flex items-center">
            <input
              type="text"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
              placeholder="Enter Patient ID"
              value={searchPatientId}
              onChange={(e) => setSearchPatientId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchBillByPatientId()}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg"
              onClick={searchBillByPatientId}
              disabled={loading}
            >
              Search
            </button>
          </div>
        </div>

        {/* Searched Bills */}
        {searchedBills.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Bills for Patient #{searchPatientId}
            </h2>
            {searchedBills.map((bill) => (
              <div
                key={bill.billId}
                className="border border-gray-200 rounded-lg p-4 mb-4"
              >
                <p>
                  <span className="font-semibold">Bill ID:</span> {bill.billId}
                </p>
                <p>
                  <span className="font-semibold">Amount:</span> ₹{bill.amount}
                </p>
                <p>
                  <span className="font-semibold">Status:</span> {bill.status}
                </p>
                <p>
                  <span className="font-semibold">Billing Date:</span>{' '}
                  {formatDate(bill.billingDate)}
                </p>
                <p>
                  <span className="font-semibold">Appointment ID:</span>{' '}
                  {bill.appointment?.appointment_id}
                </p>
                <p>
                  <span className="font-semibold">Patient Name:</span>{' '}
                  {bill.appointment?.patient?.name}
                </p>
                {bill.status === 'UNPAID' && (
                  <button
                    onClick={() => markAsPaid(bill.billId)}
                    className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Mark as Paid
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateBill;
