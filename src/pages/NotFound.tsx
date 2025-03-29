
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-primary mb-6">404</h1>
        <p className="text-xl md:text-2xl text-gray-800 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you're trying to access may have been moved, deleted, or never existed.
        </p>
        <Button 
          onClick={() => navigate('/')} 
          size="lg"
          className="px-8"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
