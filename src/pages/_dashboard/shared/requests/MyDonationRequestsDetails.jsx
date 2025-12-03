import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Loading from "@/pages/_fronted/home/Loading";
import DonationRequestForm from "@/components/dashboard/shared/DonationRequestForm";

export default function MyDonationRequestsDetails() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: request, isLoading, isError, error } = useQuery({
    queryKey: ["donation-request-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donation-request/${id}`);
      return data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <div className="text-red-500 text-center py-10">{error.message}</div>;
  if (!request) return <div className="text-center py-10 text-gray-400">No data found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <DonationRequestForm 
        initialData={request} 
        mode="view" 
      />
    </div>
  );
}
