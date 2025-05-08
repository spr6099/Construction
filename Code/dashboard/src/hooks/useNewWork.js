import { useState, useEffect } from "react";
import { getAllWorksAPI } from "../services/ContractorService"; // adjust path as needed

const useNewWorks = (userId) => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchWorks = async () => {
      try {
        setLoading(true);
        const response = await getAllWorksAPI({ id: userId });
        const data = response?.data?.data || [];

        const filteredTenders = data.filter(
          (work) =>
            (work.contractorId?._id === userId ||
              work.contractorId?.toString() === userId) &&
            work?.status !== "completed"
        );

        setWorks(filteredTenders);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, [userId]);

  return { works, loading, error };
};

export default useNewWorks;
