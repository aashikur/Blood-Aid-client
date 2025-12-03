import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FaEye, FaEnvelope, FaUserCircle, FaTimes, FaCalendarAlt } from "react-icons/fa";
import FilterBar from "@/components/dashboard/shared/FilterBar";
import Pagination from "@/components/dashboard/shared/Pagination";

export default function ViewContactsDashboard() {
  const axiosSecure = useAxiosSecure();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/contacts");
      return data;
    },
  });

  // --- Filtering Logic ---
  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const term = searchTerm.toLowerCase();
      return (
        contact.name?.toLowerCase().includes(term) ||
        contact.email?.toLowerCase().includes(term) ||
        contact.subject?.toLowerCase().includes(term)
      );
    });
  }, [contacts, searchTerm]);

  // --- Pagination Logic ---
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Contact Messages</h1>
        <p className="text-gray-400 text-sm">View and manage inquiries from users.</p>
      </div>

      {/* Filter Bar */}
      <FilterBar 
        searchTerm={searchTerm}
        onSearch={(e) => setSearchTerm(e.target.value)}
      />

      {/* Table Container */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-purple-500"></span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                  <th className="p-4 font-medium">Sender Info</th>
                  <th className="p-4 font-medium">Subject</th>
                  <th className="p-4 font-medium">Message Preview</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {paginatedContacts.length > 0 ? (
                  paginatedContacts.map((contact, idx) => (
                    <tr
                      key={contact._id || idx}
                      className="group border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-gray-400">
                             <FaUserCircle size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-white group-hover:text-purple-400 transition-colors">
                              {contact.name}
                            </p>
                            <p className="text-xs text-gray-500">{contact.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-gray-300 font-medium">
                        {contact.subject}
                      </td>

                      <td className="p-4">
                        <div className="max-w-xs truncate text-gray-400 text-xs">
                          {contact.message}
                        </div>
                      </td>

                      <td className="p-4 text-gray-500 text-xs">
                        {contact.createdAt
                          ? new Date(contact.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedMessage(contact)}
                          className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500 hover:text-white transition-all border border-purple-500/20"
                          title="View Full Message"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      No messages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#131320] border border-white/10 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-start bg-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 p-[1px]">
                  <div className="w-full h-full rounded-full bg-[#131320] flex items-center justify-center">
                    <FaUserCircle className="text-2xl text-gray-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedMessage.name}</h3>
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <FaEnvelope size={10} /> {selectedMessage.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</label>
                <p className="text-white font-medium mt-1">{selectedMessage.subject}</p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Message</label>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="flex justify-end items-center gap-2 text-xs text-gray-500 pt-2">
                <FaCalendarAlt />
                {selectedMessage.createdAt
                  ? new Date(selectedMessage.createdAt).toLocaleString()
                  : "Unknown Date"}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white/5 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
