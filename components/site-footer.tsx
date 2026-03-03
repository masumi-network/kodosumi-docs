export function SiteFooter() {
  return (
    <footer className="border-t bg-card/50 py-8 mt-auto">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 Kodosumi
          </p>
          <nav className="flex gap-6">
            <a
              href="https://www.kodosumi.io"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
            <a
              href="https://github.com/masumi-network/kodosumi"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}