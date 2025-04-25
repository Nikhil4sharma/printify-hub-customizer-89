
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeIn, scaleIn } from "@/utils/transitions";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md mx-auto px-4">
        <motion.div
          className="text-center space-y-6"
          variants={fadeIn}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div
            variants={scaleIn}
            className="relative mx-auto w-40 h-40 mb-8"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping" />
            <div className="relative flex items-center justify-center w-full h-full bg-primary/20 rounded-full">
              <span className="text-6xl font-bold text-primary">404</span>
            </div>
          </motion.div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Page not found
          </h1>
          
          <p className="text-lg text-muted-foreground">
            Sorry, we couldn't find the page you're looking for.
          </p>

          <motion.div
            variants={fadeIn}
            className="pt-6"
          >
            <Link to="/">
              <Button variant="default" size="lg" className="font-medium">
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
