
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function StatCard({
  title,
  value,
  footerText,
  description,
  icon: Icon,
  link = "#",
}) {
  return (
    <div
      className="bg-card rounded-2xl shadow-md border border-border p-6
      hover:shadow-xl transition-all duration-300 hover:-translate-y-1
      flex flex-col justify-between"
    >
    
      <div className="flex justify-between items-start">

        <div>
          <h3 className="text-sm font-medium text-muted-foreground">
            {title}
          </h3>

          <p className="text-3xl font-bold mt-2">
            {value ?? 0}
          </p>
        </div>

        {Icon && (
          <div className="bg-primary/10 p-3 rounded-xl">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        )}

      </div>


  
      <div className="mt-4">
        <p className=" text-sm text-accent font-medium  ">
          {description}
        </p>

      </div>


      
      <Link
        to={link}
        className="flex items-center justify-between mt-4 text-sm font-medium text-primary"
      >
        Manage

        <ArrowRight className="w-4 h-4" />
      </Link>

    </div>
  );
}
