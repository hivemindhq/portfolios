import { Portfolio } from "@/hooks/types/portfolios";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
export default function PortfolioCard(props: { portfolio: Portfolio }) {
  const portfolio = props.portfolio;
  return (
    <>
      <article className="grid w-full gap-2">
        <div className="flex items-center justify-between">
          <span className="opacity-40 my-auto">
            {portfolio.team_number} &bull; {portfolio.award}{" "}
            {portfolio.award_ranking}
          </span>
          <Link
            href={`https://portfolioutility.pockethost.io/api/files/c11hpwzuzyy3nbm/${portfolio.id}/${portfolio.file}`}
            target="_blank"
          >
            <Button variant={"outline"}>Open</Button>
          </Link>
        </div>
        <a
          className="group relative block"
          href={`/portfolios/${portfolio.id}`}
        >
          <Image
            src={`https://portfolioutility.pockethost.io/api/files/c11hpwzuzyy3nbm/${portfolio.id}/${portfolio.thumbnail}`}
            className="rounded-2xl relative w-full"
            alt={""}
            width={1280}
            height={720}
          />
          <div className="ease rounded-2xl pointer-events-none absolute inset-0 border border-black/5 transition duration-150 group-hover:bg-black/20"></div>
        </a>
        <h1 className="truncate font-medium">
          {portfolio.team_name} &bull; {portfolio.field}
        </h1>
      </article>
    </>
  );
}
