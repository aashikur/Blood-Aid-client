import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "@/providers/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/axiosPublic";
import Loading from "@/pages/_fronted/home/Loading";
import BloodRequestCard from "@/components/home/BloodRequestCard";

export default function DonationRequestsPublic() {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();
    // Search/filter state
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Fetch all requests
    const { data: requests = [], isLoading, isError  } = useQuery({
        queryKey: ["public-donation-requests"],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/public-donation-requests");
            return data;
        },
    });

    // Filter by status and search
    const filteredRequests = requests
        .filter((r) =>
            statusFilter === "all" ? true : r.donationStatus === statusFilter
        )
        .filter((r) =>
            search
                ? r.recipientName?.toLowerCase().includes(search.toLowerCase()) ||
                r.recipientDistrict?.toLowerCase().includes(search.toLowerCase()) ||
                r.bloodGroup?.toLowerCase().includes(search.toLowerCase())
                : true
        );

    // Respond handler
    const handleRespond = (id) => {
        if (!user) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You need to login first!",
                background: "#1A103C",
                color: "#fff",
                confirmButtonColor: "#8B5CF6"
            })
            navigate("/login");
            return;
        }
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to Donate blood to this Person?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#8B5CF6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Please!",
            background: "#1A103C",
            color: "#fff"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/donation-request/${id}/respond`).then(() => {
                    Swal.fire({
                        title: "Thank you!",
                        text: "You have responded to donate.",
                        icon: "success",
                        background: "#1A103C",
                        color: "#fff",
                        confirmButtonColor: "#8B5CF6"
                    });
                    // Optionally refetch data
                    queryClient.invalidateQueries(["public-donation-requests"]);
                });
            }
        });
    };

    if (isLoading) return <Loading></Loading>

    return (
        <div className="min-h-screen w-full pt-28 pb-12 relative">
           {/* Background Elements */}
           <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -z-10" />
           <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] -z-10" />

           <div className="max-w-7xl mx-auto px-4 md:px-6">
               {/* Header Section */}
               <div className="glass-panel rounded-2xl p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            Donation <span className="text-gradient">Requests</span>
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">
                            Total Requests: <span className="text-white font-bold">{filteredRequests.length}</span>
                        </p>
                    </div>
                    <button 
                        onClick={() => navigate('/dashboard/donor/requests/create')}
                        className="btn-primary-gradient px-6 py-3 rounded-full font-bold flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Request
                    </button>
               </div>

                {/* Search & Filter */}
                <div className="glass-panel rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-1/2">
                        <input
                            type="text"
                            placeholder="Search by recipient, location, or blood group..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    
                    <div className="flex gap-2 items-center flex-wrap justify-center">
                        <span className="text-gray-400 text-sm font-medium mr-2">Status:</span>
                        {["all", "pending", "inprogress", "done", "canceled"].map((status) => (
                            <button
                                key={status}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                    statusFilter === status
                                        ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                                        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                }`}
                                onClick={() => setStatusFilter(status)}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRequests.length > 0 ? (
                        filteredRequests.map((req) => (
                            <BloodRequestCard key={req._id} req={req} handleRespond={handleRespond} />
                        ))
                    ) : (
                        <div className="col-span-full glass-panel rounded-2xl p-12 text-center">
                            <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No Requests Found</h3>
                            <p className="text-gray-400">Try adjusting your search or filters to find what you're looking for.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}