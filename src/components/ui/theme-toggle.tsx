
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  variant?: "default" | "outline" | "icon" | "switch";
  className?: string;
}

export function ThemeToggle({ 
  variant = "default", 
  className 
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // Icon-only version (for mobile menus and compact UIs)
  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className={cn("rounded-full", className)}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    );
  }

  // Toggle version (for sidebars)
  if (variant === "toggle") {
    return (
      <Toggle
        pressed={isDark}
        onPressedChange={() => toggleTheme()}
        className={cn("gap-2", className)}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <>
            <Sun className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:text-sm">Light mode</span>
          </>
        ) : (
          <>
            <Moon className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:text-sm">Dark mode</span>
          </>
        )}
      </Toggle>
    );
  }

  // Switch text version (for full text in mobile menus)
  if (variant === "switch") {
    return (
      <Button
        variant="ghost"
        onClick={toggleTheme}
        className={cn("flex w-full justify-start gap-2", className)}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <>
            <Sun className="h-5 w-5" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="h-5 w-5" />
            <span>Dark Mode</span>
          </>
        )}
      </Button>
    );
  }

  // Default version with label
  return (
    <Button
      variant={variant === "outline" ? "outline" : "ghost"}
      size="sm"
      onClick={toggleTheme}
      className={cn("gap-2", className)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <>
          <Sun className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:text-sm">Light mode</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:text-sm">Dark mode</span>
        </>
      )}
    </Button>
  );
}
