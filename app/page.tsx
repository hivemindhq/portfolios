/* eslint-disable @next/next/no-async-client-component */
"use client";

import PortfolioCard from "@/components/PortfolioCard";
import { SelectDemo } from "@/components/SelectDemo";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Portfolio } from "@/hooks/types/portfolios";
import { pb, sudo } from "@/lib/db/pocketbase";
import Image from "next/image";
import Link from "next/link";
import { stringify } from "querystring";
import { toast } from "sonner";
import JSXStyle from "styled-jsx/style";

export default async function Home() {
  await sudo();
  const portfolios: Portfolio[] = await pb
    .collection("portfolios")
    .getFullList({
      sort: "@random",
      fields:
        "id, team_name, region, team_number, award_ranking, award, field, file, thumbnail",
    });

  return (
    <>
      <main className="justify-items-center overflow-x-hidden border-b border-black/5 pb-8 md:py-8">
        <header className="max-w-screen-xl mx-auto w-full px-4 grid items-end justify-items-center gap-4 md:grid-cols-2 md:justify-items-start">
          <div className="grid max-w-lg content-start justify-items-center gap-3.5 py-16 md:max-w-md md:justify-items-start md:py-0">
            <h1 className="overflow-auto bg-gradient-to-r from-neutral-500 to-black bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent">
              Portfolios
            </h1>
            <p className="text-2xl font-medium tracking-tight md:text-left text-center">
              Award-winning FIRST Tech Challenge Portfolios
            </p>
            <Button
              onClick={() => toast.info("This feature is coming soon!")}
              variant={"outline"}
            >
              Submit yours
            </Button>
          </div>
          <div className="grid w-full gap-2">
            <div className="flex items-center justify-between">
              <p className="text-sm opacity-40">{portfolios[0].team_number}</p>
              <Link
                href={`https://portfolioutility.pockethost.io/api/files/c11hpwzuzyy3nbm/${portfolios[0].id}/${portfolios[0].file}`}
                target="_blank"
              >
                <Button variant={"outline"}>Open</Button>
              </Link>
            </div>
            <a
              className="group relative block"
              href={`/portfolios/${portfolios[0].id}`}
            >
              <Image
                src={`https://portfolioutility.pockethost.io/api/files/c11hpwzuzyy3nbm/${portfolios[0].id}/${portfolios[0].thumbnail}`}
                className="rounded-2xl relative w-full"
                alt={""}
                width={1280}
                height={720}
              />
              <div className="ease  rounded-2xl pointer-events-none absolute inset-0 border border-black/5 transition duration-150 group-hover:bg-black/20"></div>
            </a>
            <h1 className="truncate font-medium">{portfolios[0].team_name}</h1>
          </div>
        </header>
      </main>
      <div className="overflow-x-hidden transition-all duration-300 ease-smooth">
        <div className="max-w-screen-xl mx-auto w-full px-4 my-5">
          <div className="grid gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolios.map((portfolio: Portfolio) => {
              // eslint-disable-next-line react/jsx-key
              return <PortfolioCard portfolio={portfolio} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
