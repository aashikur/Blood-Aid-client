import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/axiosPublic";
import Loading from "../home/Loading";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function Urgent() {
  const axiosPublic = useAxiosPublic();

  // Fetch urgent requests
  const { data: urgentRequests = [], isLoading } = useQuery({
    queryKey: ["urgent-requests"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/donation-request/public?status=pending");
      // Filter for urgent only (assuming there's an isUrgent flag or similar, 
      // if not, we might need to filter by date or just show all pending as urgent for now based on the page name)
      // For this example, I'll assume all pending requests on this page are considered "Urgent" needs.
      return data;
    },
  });

  if (isLoading) return <Loading />;

  // Calculate center of map based on requests or default to Bangladesh center
  const mapCenter = [23.685, 90.3563]; // Center of Bangladesh

  return (
    <div className="min-h-screen w-full pt-28 pb-12 relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="glass-panel rounded-3xl p-8 md:p-12 mb-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500/10 to-purple-500/10 -z-10" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Urgent <span className="text-gradient">Needs</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            These patients need blood immediately. Your donation can save a life today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map View */}
          <div className="lg:col-span-2 h-[600px] glass-panel rounded-2xl overflow-hidden relative z-0">
             <MapContainer center={mapCenter} zoom={7} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  className="map-tiles"
                />
                {urgentRequests.map((req) => {
                   // Use dummy coordinates if not present (In a real app, you'd geocode the address)
                   // For demo purposes, scattering markers around center if no coords
                   // Assuming req doesn't have lat/lng, we skip or mock. 
                   // Let's mock some random offsets for visualization if real data lacks coords
                   const lat = 23.685 + (Math.random() - 0.5) * 4;
                   const lng = 90.3563 + (Math.random() - 0.5) * 4;
                   
                   return (
                    <Marker key={req._id} position={[lat, lng]}>
                      <Popup>
                        <div className="text-black">
                          <strong className="block text-lg">{req.recipientName}</strong>
                          <span className="badge badge-error text-white my-1">{req.bloodGroup}</span>
                          <p className="m-0 text-sm">{req.hospitalName}</p>
                          <p className="m-0 text-sm">{req.district}, {req.upazila}</p>
                          <Link to={`/donation-requests/${req._id}`} className="btn btn-xs btn-primary mt-2 w-full">View Details</Link>
                        </div>
                      </Popup>
                    </Marker>
                   )
                })}
             </MapContainer>
             {/* Custom Map Overlay for Dark Mode feel if needed, or just rely on CSS filters on the tile layer */}
             <div className="absolute inset-0 pointer-events-none mix-blend-multiply bg-slate-900/20 z-[400]"></div>
          </div>

          {/* List View */}
          <div className="space-y-4 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {urgentRequests.length > 0 ? (
              urgentRequests.map((req) => (
                <div key={req._id} className="glass-panel p-5 rounded-xl hover:bg-white/5 transition-all group border-l-4 border-l-red-500">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-red-400 transition-colors">
                        {req.recipientName}
                      </h3>
                      <p className="text-gray-400 text-xs flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Urgent
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-bold border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                      {req.bloodGroup}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{req.hospitalName}, {req.district}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{req.donationDate} • {req.donationTime}</span>
                    </div>
                  </div>

                  <Link 
                    to={`/donation-requests/${req._id}`}
                    className="w-full py-2 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 transition-all text-sm font-bold flex items-center justify-center gap-2"
                  >
                    Donate Now
                  </Link>
                </div>
              ))
            ) : (
              <div className="glass-panel p-8 rounded-xl text-center text-gray-400">
                No urgent requests at the moment.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}