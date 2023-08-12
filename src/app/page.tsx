import { queries } from "@/lib/api/queries";
import { UpdateDate } from "./UpdateDate";
import { notFound } from "next/navigation";

export default async function Home() {
  const now = await queries.date.query();
  if (!now.data) return notFound();
  return (
    <main className="p-8">
      <div className="flex gap-4 items-center">
        <p className="">{now.data.datum}</p>
        <UpdateDate />
      </div>
    </main>
  );
}
