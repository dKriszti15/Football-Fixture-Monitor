import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        Helo
      </div>

      <Link href="/todaysfixtures">
        <Button>Fixtures</Button>
      </Link>
    </>
  );
}
