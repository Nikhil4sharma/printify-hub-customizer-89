
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeIn, scaleIn } from "@/utils/transitions";
import { Button } from "@/components/ui/button";
import FloatingAstronaut from "@/components/ui/FloatingAstronaut";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background overflow-hidden">
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
            className="mb-8"
          >
            <FloatingAstronaut />
          </motion.div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Lost in Space?
          </h1>
          
          <p className="text-lg text-muted-foreground">
            Houston, we have a problem! This page seems to have drifted into a black hole.
          </p>

          <motion.div
            variants={fadeIn}
            className="pt-6"
          >
            <Link to="/">
              <Button variant="default" size="lg" className="font-medium">
                Return to Earth
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
