import React from "react";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Card from "@/components/Card";
import { getFileTypesParams } from "@/lib/utils";

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";

  const types = getFileTypesParams(type) as FileType[];

  const files = await getFiles({ types, searchText, sort });

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 !important">
      <section className="w-full">
        <h1 className="text-[34px] leading-[42px] font-bold capitalize">{type}</h1>

        <div className="flex mt-2 flex-col justify-between sm:flex-row sm:items-center !important">
          <p className="text-[16px] leading-[24px] font-normal">
            Total: <span className="text-[16px] leading-[24px] font-semibold">0 MB</span>
          </p>

          <div className="mt-5 flex items-center sm:mt-0 sm:gap-3 ">
            <p className=" text-[16px] leading-[24px] font-normal hidden text-[#A3B2C7] sm:block">Sort by:</p>

            <Sort />
          </div>
        </div>
      </section>

      {/* Render the files */}
      {files.total > 0 ? (
        <section className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 !important">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="text-[16px] leading-[24px] font-normal mt-10 text-center text-[#A3B2C7] !important">No files uploaded</p>
      )}
    </div>
  );
};

export default Page;