import React, { useState } from "react";
import { useRouter } from "next/router";

const RecordForm = ({ data = {}, onSubmit }) => {
  const router = useRouter();

  const [entry, setEntry] = useState({
    title: data.title || "",
    author: data.author || "",
    year: data.year || "",
    tags: Array.isArray(data.tags) ? data.tags.join(", ") : ""
  });

  const updateEntry = (field, value) => {
    setEntry((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    router.push("/");
  };

  const handleSubmit = () => {
    const formattedEntry = {
      ...entry,
      year: parseInt(entry.year),
      tags: entry.tags.split(",").map((tag) => tag.trim()),
    };
    onSubmit(formattedEntry);
  };

  return (
    <div className="flex justify-center p-4">
      <div className="border p-4 rounded-md shadow-sm flex flex-col gap-4 w-full max-w-80">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={entry.title}
            onChange={(e) => updateEntry("title", e.target.value)}
            className="input-style"
            placeholder="Titlul cărții"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Author
          </label>
          <input
            type="text"
            id="author"
            value={entry.author}
            onChange={(e) => updateEntry("author", e.target.value)}
            className="input-style"
            placeholder="Nume autor"
            required
          />
        </div>

        {/* Year */}
        <div>
          <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Year
          </label>
          <input
            type="number"
            id="year"
            value={entry.year}
            onChange={(e) => updateEntry("year", e.target.value)}
            className="input-style"
            placeholder="Ex: 2024"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Tags (separate prin virgulă)
          </label>
          <input
            type="text"
            id="tags"
            value={entry.tags}
            onChange={(e) => updateEntry("tags", e.target.value)}
            className="input-style"
            placeholder="ex: motivație, psihologie"
          />
        </div>

        {/* Butoane */}
        <div className="w-full flex justify-center gap-4 mt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {data._id ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordForm;
