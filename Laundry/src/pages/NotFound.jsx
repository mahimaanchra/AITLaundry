import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
        Error 404
      </span>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        This page isn&rsquo;t in the register.
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <div className="mt-8">
        <Button href="/" showIcon={false} variant="primary">
          Back to Home
        </Button>
      </div>
    </div>
  );
}
