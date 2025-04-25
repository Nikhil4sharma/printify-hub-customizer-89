
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

const FloatingAstronaut = () => {
  return (
    <div className="relative w-full h-64">
      {/* Stars background */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/40 rounded-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
      
      {/* Floating astronaut */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          {/* Rocket trail */}
          <motion.div
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-6 h-6 bg-primary/20 rounded-full blur-md" />
          </motion.div>

          {/* Rocket */}
          <motion.div
            className="bg-primary/10 backdrop-blur-lg rounded-full p-6 border border-primary/20"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Rocket className="w-12 h-12 text-primary" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FloatingAstronaut;
