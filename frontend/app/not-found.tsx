import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Not found – 404!</h1>
      <p>
        <Link href="/">Go back to Home</Link>
      </p>
    </main>
  );
}
