import Link from "next/link";

export default function HeaderHashLink({ className, to }) {

  return (
    <Link
      className={className}
      href={`/${to}`}
    ></Link>
  );
}
