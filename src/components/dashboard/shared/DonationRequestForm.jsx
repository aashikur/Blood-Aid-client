import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaHospital, FaMapMarkerAlt, FaTint, FaCalendarAlt, FaClock, FaNotesMedical, FaSave, FaEdit } from "react-icons/fa";
import useDistrictUpazila from "@/hooks/useDistrictUpazila";

const DonationRequestForm = ({ 
  initialData, 
  mode = "view", // "view" | "edit"
  onSubmit, 
  isSubmitting = false 
}) => {
  const { bloodGroups, districts, getUpazilasByDistrict } = useDistrictUpazila();
  const [formData, setFormData] = useState(initialData || {});
  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.recipientDistrict) {
        setUpazilas(getUpazilasByDistrict(initialData.recipientDistrict));
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      if (name === "recipientDistrict") {
        newData.recipientUpazila = "";
        setUpazilas(getUpazilasByDistrict(value));
      }
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const isEdit = mode === "edit";

  // Reusable Input Wrapper
  const FieldWrapper = ({ label, icon: Icon, children }) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
        {Icon && <Icon className="text-purple-500" />} {label}
      </label>
      {children}
    </div>
  );

  // Input Class
  const inputClass = "w-full bg-[#131320] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed placeholder-gray-600";
  const viewClass = "w-full bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-gray-300";

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          {isEdit ? <FaEdit className="text-purple-500" /> : <FaNotesMedical className="text-purple-500" />}
          {isEdit ? "Edit Donation Request" : "Donation Request Details"}
        </h2>
        {/* Status Badge */}
        <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
          formData.donationStatus === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
          formData.donationStatus === 'inprogress' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
          formData.donationStatus === 'done' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
          'bg-red-500/10 text-red-500 border-red-500/20'
        }`}>
          {formData.donationStatus || 'Unknown'}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section: Requester Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white/80 border-l-4 border-purple-500 pl-3">Requester Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FieldWrapper label="Requester Name" icon={FaUser}>
              {isEdit ? (
                <input type="text" name="requesterName" value={formData.requesterName || ''} onChange={handleChange} className={inputClass} required />
              ) : (
                <div className={viewClass}>{formData.requesterName}</div>
              )}
            </FieldWrapper>
            <FieldWrapper label="Requester Email" icon={FaEnvelope}>
              {isEdit ? (
                <input type="email" name="requesterEmail" value={formData.requesterEmail || ''} onChange={handleChange} className={inputClass} required />
              ) : (
                <div className={viewClass}>{formData.requesterEmail}</div>
              )}
            </FieldWrapper>
          </div>
        </div>

        {/* Section: Recipient Info */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-white/80 border-l-4 border-purple-500 pl-3">Recipient Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FieldWrapper label="Recipient Name" icon={FaUser}>
              {isEdit ? (
                <input type="text" name="recipientName" value={formData.recipientName || ''} onChange={handleChange} className={inputClass} required />
              ) : (
                <div className={viewClass}>{formData.recipientName}</div>
              )}
            </FieldWrapper>
            <FieldWrapper label="Hospital Name" icon={FaHospital}>
              {isEdit ? (
                <input type="text" name="hospitalName" value={formData.hospitalName || ''} onChange={handleChange} className={inputClass} required />
              ) : (
                <div className={viewClass}>{formData.hospitalName}</div>
              )}
            </FieldWrapper>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FieldWrapper label="District" icon={FaMapMarkerAlt}>
              {isEdit ? (
                <select name="recipientDistrict" value={formData.recipientDistrict || ''} onChange={handleChange} className={inputClass} required>
                  <option value="">Select District</option>
                  {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
              ) : (
                <div className={viewClass}>{formData.recipientDistrict}</div>
              )}
            </FieldWrapper>
            <FieldWrapper label="Upazila" icon={FaMapMarkerAlt}>
              {isEdit ? (
                <select name="recipientUpazila" value={formData.recipientUpazila || ''} onChange={handleChange} className={inputClass} required disabled={!formData.recipientDistrict}>
                  <option value="">Select Upazila</option>
                  {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                </select>
              ) : (
                <div className={viewClass}>{formData.recipientUpazila}</div>
              )}
            </FieldWrapper>
          </div>

          <FieldWrapper label="Full Address" icon={FaMapMarkerAlt}>
            {isEdit ? (
              <input type="text" name="addressLine" value={formData.addressLine || ''} onChange={handleChange} className={inputClass} required />
            ) : (
              <div className={viewClass}>{formData.addressLine}</div>
            )}
          </FieldWrapper>
        </div>

        {/* Section: Donation Details */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-white/80 border-l-4 border-purple-500 pl-3">Donation Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FieldWrapper label="Blood Group" icon={FaTint}>
              {isEdit ? (
                <select name="bloodGroup" value={formData.bloodGroup || ''} onChange={handleChange} className={inputClass} required>
                  <option value="">Select Group</option>
                  {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                </select>
              ) : (
                <div className={viewClass}>{formData.bloodGroup}</div>
              )}
            </FieldWrapper>
            <FieldWrapper label="Date" icon={FaCalendarAlt}>
              {isEdit ? (
                <input type="date" name="donationDate" value={formData.donationDate || ''} onChange={handleChange} className={inputClass} required />
              ) : (
                <div className={viewClass}>{formData.donationDate}</div>
              )}
            </FieldWrapper>
            <FieldWrapper label="Time" icon={FaClock}>
              {isEdit ? (
                <input type="time" name="donationTime" value={formData.donationTime || ''} onChange={handleChange} className={inputClass} required />
              ) : (
                <div className={viewClass}>{formData.donationTime}</div>
              )}
            </FieldWrapper>
          </div>

          <FieldWrapper label="Request Message" icon={FaNotesMedical}>
            {isEdit ? (
              <textarea name="requestMessage" value={formData.requestMessage || ''} onChange={handleChange} rows="4" className={inputClass} required />
            ) : (
              <div className={`${viewClass} min-h-[100px]`}>{formData.requestMessage}</div>
            )}
          </FieldWrapper>
        </div>

        {/* Action Buttons */}
        {isEdit && (
          <div className="flex justify-end pt-6 border-t border-white/10">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
            >
              {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : <FaSave />}
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default DonationRequestForm;
