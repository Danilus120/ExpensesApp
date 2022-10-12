import Image from "next/image";
import Link from "next/link";

export default function LogoLink() {
  return (
    <Link href="/">
      <a>
        <Image
          src="/logo.svg"
          alt="Logo of expenses app"
          objectFit="contain"
          layout="fill"
        />
      </a>
    </Link>
  );
}
