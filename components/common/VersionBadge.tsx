import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface VersionDisplayProps {
  version: string;
  githubRelease: string;
}

export default function VersionDisplay({
  version,
  githubRelease,
}: VersionDisplayProps) {
  return (
    <div className="flex m-4 md:m-0 md:fixed md:bottom-4 md:left-4 md:z-10">
      <Link href={githubRelease}>
        <Badge variant="outline" className="text-xs font-mono">
          {version}
        </Badge>
      </Link>
    </div>
  );
}
