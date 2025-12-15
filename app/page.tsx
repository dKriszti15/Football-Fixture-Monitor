import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-4xl font-bold">Football Fixture Monitor</h1>
      <Link href="/upcoming">
        <Button className="text-lg px-8 py-6">View upcoming fixtures</Button>
      </Link>
    </div>
  );
}
