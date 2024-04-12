import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-main">
      <h2>Error 404: Page Not Found</h2>
      <h6>Oops! It seems like you&rsquo;ve stumbled upon a missing scene.</h6>

      <Link href="/">
        <button>Go back to home</button>
      </Link>
    </main>
  );
}
