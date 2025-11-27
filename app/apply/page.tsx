'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    childDOB: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    address: '',
    selectedClass: '',
    additionalInfo: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-blue-600 hover:text-blue-700 mb-6 inline-block">
          ← Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Admission Application</h1>
          <p className="text-gray-600 mb-8">Complete the form below to apply for admission</p>

          {submitted && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              ✓ Application submitted successfully! We'll contact you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Child Information */}
            <fieldset className="border-t pt-6">
              <legend className="text-xl font-semibold text-gray-800 mb-4">Child Information</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Child's Name *</label>
                  <input
                    type="text"
                    name="childName"
                    value={formData.childName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter child's name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    name="childDOB"
                    value={formData.childDOB}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Select Class *</label>
                  <select
                    name="selectedClass"
                    value={formData.selectedClass}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">-- Choose Class --</option>
                    <option value="nursery">Nursery (2-3 years)</option>
                    <option value="pre-primary">Pre-Primary (3-4 years)</option>
                    <option value="kindergarten">Kindergarten (4-5 years)</option>
                  </select>
                </div>
              </div>
            </fieldset>

            {/* Parent Information */}
            <fieldset className="border-t pt-6">
              <legend className="text-xl font-semibold text-gray-800 mb-4">Parent/Guardian Information</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Parent Name *</label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter parent's name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter address"
                  />
                </div>
              </div>
            </fieldset>

            {/* Additional Information */}
            <fieldset className="border-t pt-6">
              <legend className="text-xl font-semibold text-gray-800 mb-4">Additional Information</legend>
              <label className="block text-gray-700 font-semibold mb-2">Any special requirements or queries?</label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                rows={4}
                placeholder="Tell us anything we should know..."
              />
            </fieldset>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Submit Application
              </button>
              <Link href="/" className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold text-center hover:bg-gray-300 transition">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
