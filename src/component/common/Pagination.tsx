import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  // Function to generate the page numbers with ellipses
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Max number of visible page numbers
    const delta = 2; // Number of pages before and after the current page to show

    if (totalPages <= maxVisiblePages) {
      // If total pages are fewer than max visible, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= delta + 1) {
        // Show first few pages
        for (let i = 1; i <= delta + 2; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - delta) {
        // Show last few pages
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - (delta + 1); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show pages around the current page
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-end px-5 py-2 items-center space-x-2">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-1 border rounded-lg ${
          currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-200"
        }`}
      >
        Previous
      </button>

      {/* Page Number Buttons */}
      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {page === "..." ? (
            <span className="px-4 py-1">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={`px-4 py-1 border rounded-lg ${
                page === currentPage
                  ? "bg-orange-400 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-1 border rounded-lg ${
          currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-200"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;




// import React from "react";

// interface PaginationProps {
//   totalPages: number;
//   currentPage: number;
//   itemsPerPage: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   totalPages,
//   currentPage,
//   itemsPerPage,
//   onPageChange,
// }) => {
//   const getVisiblePages = () => {
//     const pages: (number | string)[] = [];

//     // Always show the first page
//     pages.push(1);

//     // If there are only 4 or fewer total pages, show all pages
//     if (totalPages <= 4) {
//       for (let i = 2; i < totalPages; i++) {
//         pages.push(i);
//       }
//       if (totalPages > 1) pages.push(totalPages);
//       return pages;
//     }

//     // Handle the middle pages with dots
//     if (currentPage <= 3) {
//       // Close to the start: show first 3 pages, then dots, then last page
//       pages.push(2, 3, "...", totalPages);
//     } else if (currentPage >= totalPages - 2) {
//       // Close to the end: show first page, dots, then the last 3 pages
//       pages.push("...", totalPages - 2, totalPages - 1, totalPages);
//     } else {
//       // In the middle: show first page, dots, current page +/- 1, dots, last page
//       pages.push(
//         "...",
//         currentPage - 1,
//         currentPage,
//         currentPage + 1,
//         "...",
//         totalPages
//       );
//     }

//     return pages;
//   };

//   const visiblePages = getVisiblePages();

//   // Handlers for previous and next buttons
//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       onPageChange(currentPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       onPageChange(currentPage + 1);
//     }
//   };

//   return (
//     <div className="flex justify-center px-1">
//       {/* Previous Button */}
//       <button
//         onClick={handlePrevious}
//         disabled={currentPage === 1}
//         className={`px-4 py-1 border ${
//           currentPage === 1
//             ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//             : "bg-white text-gray-800 hover:bg-gray-300"
//         }`}
//       >
//         {"<"}
//       </button>

//       {/* Page Numbers with Dots */}
//       {visiblePages.map((page, index) =>
//         typeof page === "number" ? (
//           <button
//             key={index}
//             onClick={() => onPageChange(page)}
//             className={`px-4 py-1 border ${
//               page === currentPage
//                 ? "bg-orange-400 text-white"
//                 : "bg-white text-gray-800 hover:bg-gray-300"
//             }`}
//           >
//             {page}
//           </button>
//         ) : (
//           <span key={index} className="px-4 py-1 text-gray-500">
//             {page}
//           </span>
//         )
//       )}

//       {/* Next Button */}
//       <button
//         onClick={handleNext}
//         disabled={currentPage === totalPages}
//         className={`px-4 py-1 border ${
//           currentPage === totalPages
//             ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//             : "bg-white text-gray-800 hover:bg-gray-300"
//         }`}
//       >
//         {">"}
//       </button>
//     </div>
//   );
// };

// export default Pagination;
