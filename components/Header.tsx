import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-3 font-bold text-xl text-primary">
          {/* Logo image directly, without gradient container */}
          <img
            src="/Aspira Edge-all/Aspira Edge/Aspira Edge -png/2.png"
            alt="Aspira Edge Logo"
            className="w-16 h-16" 
          />
          <span className="hidden sm:inline">ASPIRA EDGE</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            to="/"
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Features
          </Link>
          <Link
            to="/support"
            className="btn-secondary text-sm"
          >
            Get Support
          </Link>

          <Link 
          to="/purchase" 
  className="text-foreground hover:text-primary transition-colors font-medium"
>
  Buy Books
</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-muted rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b border-border md:hidden">
            <div className="container px-4 py-4 flex flex-col gap-4">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/support"
                className="btn-secondary text-sm justify-center"
                onClick={() => setIsOpen(false)}
              >
                Get Support
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}