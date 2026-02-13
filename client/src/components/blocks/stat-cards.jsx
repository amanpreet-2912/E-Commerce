export function StatCard({
  title,
  value,
  footerText,
  description,
}) {
  return (
    <div className="bg-card rounded-2xl shadow-md border border-border p-6 
                    hover:shadow-xl transition-all duration-300 
                    hover:-translate-y-1">

      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-primary">
            {title}
          </h3> 
          <p className="text-3xl font-bold text-muted-foreground mt-2">
            {value ?? 0}
          </p>
        </div>

      
      </div>

      <p className="text-muted-foreground text-sm mt-3">
        {description}
      </p>

      <p className="text-xs text-accent font-medium mt-2">
        {footerText}
      </p>
    </div>
  );
}
