import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-main">
      <h2>Error 404: Page Not Found</h2>
      <h3 className="h6">Oops! It seems like you&rsquo;ve stumbled upon a missing scene.</h3>

      <Link href="/">
        <button>Go back to homepage</button>
      </Link>
    </main>
  );
}
