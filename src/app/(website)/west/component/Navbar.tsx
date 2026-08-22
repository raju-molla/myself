import { FiArrowRight } from "react-icons/fi"; 

type SectionKey =

| "home"

| "about"

| "projects"

| "experience"

| "skills"

| "testimonials"

| "contact";



type NavItem = {

id: SectionKey;

label: string;

};
type NavbarProps = {

onSelect: (id: SectionKey) => void;

};
const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

const Navbar: React.FC<NavbarProps> = ({ onSelect }) => {
  return (
    <nav className="w-64 h-screen fixed top-0 left-0 flex flex-col bg-gradient-to-b from-gray-900 via-purple-800 to-indigo-800 text-white shadow-lg">
      <div className="p-6 text-3xl font-extrabold tracking-wide border-b border-purple-700">
        Molla Dev
      </div>
      <ul className="mt-12 flex flex-col space-y-5 px-6">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onSelect(item.id)}
              className="
                w-full
                text-left
                text-lg
                font-medium
                py-2
                px-4
                flex              
                items-center      
                group            
                transition-all
                duration-300
                ease-in-out
                hover:bg-purple-700/40
                rounded-md
                focus:outline-none
                focus:ring-2
                focus:ring-pink-500
                focus:ring-opacity-75
              "
            >
              <span
                className="
                  bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300
                  bg-clip-text
                  text-transparent
                  group-hover:from-pink-100 group-hover:via-purple-100 group-hover:to-indigo-100 /* Lighter gradient on hover */
                  transition-all duration-300 ease-in-out
                "
              >
                {item.label}
              </span>
              <FiArrowRight
                className="
                  ml-3               /* Margin left to separate from text */
                  text-pink-400
                  opacity-0          /* Initially hidden */
                  group-hover:opacity-100 /* Visible on hover */
                  group-hover:translate-x-1 /* Moves right on hover */
                  transition-all
                  duration-300
                  ease-out
                "
                size={20}
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;