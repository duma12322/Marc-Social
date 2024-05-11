import Link from "next/link";
import HashIcon from "@/components/common/icons/hash";
import FallbackCard from "@/components/common/fallback-card";

const HomeFallbackCard = () => (
  <FallbackCard>
    <Link href="/explore">
      <a className="text-blue-500 font-bold mr-1 group relative flex items-center font-poppins">
        <HashIcon className="fill-blue-500" />
        <span>Explorar</span>
        <div className="group-hover:opacity-100 opacity-0 w-full h-[3px] bg-blue-500 transition-opacity duration-100 absolute bottom-0" />
      </a>
    </Link>
    y encontrar algo para ti
  </FallbackCard>
);

export default HomeFallbackCard;
