import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import PlaceholderPage from "@/components/PlaceholderPage";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <PlaceholderPage
      title="Page Not Found"
      description="The page you're looking for doesn't exist. Let's get you back to your students."
      backText="Back to Students"
    />
  );
};

export default NotFound;
