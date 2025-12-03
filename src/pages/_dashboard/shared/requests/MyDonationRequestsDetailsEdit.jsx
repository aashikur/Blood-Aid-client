import { useParams, useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "@/pages/_fronted/home/Loading";
import DonationRequestForm from "@/components/dashboard/shared/DonationRequestForm";
import { useState } from "react";

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch existing donation request data
  const { data: request, isLoading, isError } = useQuery({
    queryKey: ["donation-request", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donation-request/${id}`);
      return data;
    },
  });

  // Handle form submission
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const { _id, ...updateData } = formData; // Exclude _id from update payload
      const { data } = await axiosSecure.patch(`/donation-request/${id}`, updateData);
      
      if (data.modifiedCount > 0 || data.acknowledged) {
        Swal.fire({
          title: "Success",
          text: "Donation request updated!",
          icon: "success",
          background: "#131320",
          color: "#fff",
          confirmButtonColor: "#9333ea"
        });
        queryClient.invalidateQueries(["donation-request", id]);
        navigate(-1); // Go back
      } else {
        Swal.fire({
          title: "No changes",
          text: "No updates were made.",
          icon: "info",
          background: "#131320",
          color: "#fff",
          confirmButtonColor: "#9333ea"
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Failed to update request",
        icon: "error",
        background: "#131320",
        color: "#fff",
        confirmButtonColor: "#ef4444"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loading />;
  if (isError || !request) return <div className="text-red-500 text-center py-10">Error loading data.</div>;

  return (
    <div className="mx-auto">
      <DonationRequestForm 
        initialData={request} 
        mode="edit" 
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditDonationRequest;