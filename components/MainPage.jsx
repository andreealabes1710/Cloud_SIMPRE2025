import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deleteRecord, getRecords } from "@/utils/recordsFunctions";

const MainPage = () => {
  const router = useRouter();
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    try {
      const response = await getRecords();
      setRecords(response);
    } catch (error) {
      console.error("Eroare la fetchRecords:", error);
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      const response = await deleteRecord(id);

      if (response.deletedCount === 1) {
        const newRecords = records.filter((record) => record._id !== id);
        setRecords(newRecords);
      }
    } catch (error) {
      console.error("Eroare la ștergere:", error);
    }
  };

  const handleUpdateRecord = (id) => {
    router.push(`/records/edit?id=${id}`);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="p-4 flex flex-wrap gap-4">
      {records.map((record) => (
        <div
          key={record._id}
          className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {record.title}
          </h5>

          <p className="mb-1 text-sm text-gray-700 dark:text-gray-400">
            <strong>Autor:</strong> {record.author}
          </p>

          <p className="mb-1 text-sm text-gray-700 dark:text-gray-400">
            <strong>An:</strong> {record.year}
          </p>

          <p className="mb-1 text-sm text-gray-700 dark:text-gray-400">
            <strong>Etichete:</strong>{" "}
            {record.tags && record.tags.join(", ")}
          </p>

          <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
            <strong>Creat la:</strong>{" "}
            {new Date(record.createdAt).toLocaleDateString("ro-RO")}
          </p>

          <div className="flex justify-center mt-3">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => handleUpdateRecord(record._id)}
            >
              Update
            </button>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => handleDeleteRecord(record._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
