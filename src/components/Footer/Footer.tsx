// components/Footer.tsx

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Minimal Library Management System. All
        rights reserved.
      </div>
    </footer>
  );
};
