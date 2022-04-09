import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex flex-row place-content-between mb-10">
      <Link href={"/"} passHref>
        <a>
          <Image
            src="/icons/icon-home.svg"
            width={64}
            height={64}
            alt="icon-home"
          ></Image>
        </a>
      </Link>
    </header>
  );
};

export default Header;
