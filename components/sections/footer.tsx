"use client";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6 lg:px-8">
        <span className="font-serif text-xl font-bold tracking-tight text-foreground">
          Maison <span className="text-gold">Noir</span>
        </span>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Fragancias de lujo seleccionadas para quienes buscan dejar huella.
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Maison Noir. Todos los derechos
          reservados.
        </p>
        <p className="text-xs text-muted-foreground">
          Desarrollado por{" "}
          <a
            href="https://www.vanegassolutions.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gold underline underline-offset-2 hover:text-gold/80"
          >
            Vanegas Solutions
          </a>
        </p>
      </div>
    </footer>
  );
}