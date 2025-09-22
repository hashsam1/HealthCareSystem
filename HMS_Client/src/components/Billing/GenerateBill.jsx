import React, { useState, useEffect } from 'react';

const GenerateBill = () => {
  const [bills, setBills] = useState([]);
  const [searchAppointmentId, setSearchAppointmentId] = useState('');
  const [searchedBill, setSearchedBill] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all bills
  const fetchAllBills = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:9090/bill');
      if (!response.ok) {
        throw new Error('Failed to fetch bills');
      }
      const data = await response.json();
      setBills(data);
      setError('');
    } catch (err) {
      setError('Error fetching bills: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Search bill by appointment ID
  const searchBillByAppointmentId = async () => {
    if (!searchAppointmentId) {
      setError('Please enter an appointment ID');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/byAppointment/${searchAppointmentId}`);
      
      if (response.status === 404) {
        setSearchedBill(null);
        setError('No bill found for this appointment ID');
        return;
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch bill');
      }
      
      const data = await response.json();
      setSearchedBill(data);
      setError('');
    } catch (err) {
      setError('Error searching bill: ' + err.message);
      setSearchedBill(null);
    } finally {
      setLoading(false);
    }
  };

  // Mark bill as paid
  const markAsPaid = async (billId) => {
    try {
      setLoading(true);
      // First get the current bill
      const response = await fetch(`http://localhost:8080/bill/${billId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bill details');
      }
      
      const bill = await response.json();
      
      // Update the status to PAID
      const updateResponse = await fetch(`http://localhost:8080/bill/${billId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bill,
          status: 'PAID'
        }),
      });
      
      if (!updateResponse.ok) {
        throw new Error('Failed to update bill status');
      }
      
      setSuccess('Bill marked as paid successfully');
      // Refresh the bills list
      fetchAllBills();
      // If we're currently viewing this bill, update it
      if (searchedBill && searchedBill.billId === billId) {
        setSearchedBill({...searchedBill, status: 'PAID'});
      }
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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="bg-blue-600 p-3 rounded-lg mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Billing Management</h1>
        </div>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
            <p>{error}</p>
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded" role="alert">
            <p>{success}</p>
          </div>
        )}

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Bill by Appointment ID</h2>
          <div className="flex items-center">
            <input
              type="text"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter Appointment ID"
              value={searchAppointmentId}
              onChange={(e) => setSearchAppointmentId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchBillByAppointmentId()}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg flex items-center"
              onClick={searchBillByAppointmentId}
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
              Search
            </button>
          </div>
        </div>

        {/* Searched Bill Details */}
        {searchedBill && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Bill Details for Appointment #{searchedBill.appointment?.appointment_id}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500">Bill ID</h3>
                <p className="text-lg font-semibold">{searchedBill.billId}</p>
                
                <h3 className="text-sm font-medium text-gray-500 mt-4">Amount</h3>
                <p className="text-2xl font-bold text-blue-600">${searchedBill.amount.toFixed(2)}</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <div className="mt-1">
                  {searchedBill.status === 'PAID' ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      PAID
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      UNPAID
                    </span>
                  )}
                </div>
                
                <h3 className="text-sm font-medium text-gray-500 mt-4">Billing Date</h3>
                <p className="text-lg">{formatDate(searchedBill.billingDate)}</p>
              </div>
              
              {searchedBill.appointment && (
                <>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500">Doctor Name</h3>
                    <p className="text-lg font-medium">{searchedBill.appointment.doctor_name}</p>
                    
                    <h3 className="text-sm font-medium text-gray-500 mt-4">Appointment Time</h3>
                    <p className="text-lg">{new Date(searchedBill.appointment.time_of_appointment).toLocaleTimeString()}</p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500">Patient ID</h3>
                    <p className="text-lg">{searchedBill.appointment.patient?.id || 'N/A'}</p>
                    
                    <h3 className="text-sm font-medium text-gray-500 mt-4">Appointment Status</h3>
                    <div className="mt-1">
                      {searchedBill.appointment.status === 'COMPLETED' ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          COMPLETED
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                          SCHEDULED
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {searchedBill.status === 'UNPAID' && (
              <div className="mt-6">
                <button
                  onClick={() => markAsPaid(searchedBill.billId)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mark as Paid
                </button>
              </div>
            )}
          </div>
        )}

        {/* All Bills List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">All Bills</h2>
            <button
              onClick={fetchAllBills}
              disabled={loading}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              Refresh
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billing Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bills.length > 0 ? (
                  bills.map((bill) => (
                    <tr 
                      key={bill.billId} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSearchAppointmentId(bill.appointment?.appointment_id || '');
                        setSearchedBill(bill);
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bill.billId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill.appointment?.appointment_id || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${bill.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {bill.status === 'PAID' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            PAID
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            UNPAID
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(bill.billingDate)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {bill.status === 'UNPAID' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsPaid(bill.billId);
                            }}
                            className="text-green-600 hover:text-green-900"
                          >
                            Mark Paid
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      {loading ? 'Loading bills...' : 'No bills found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateBill;