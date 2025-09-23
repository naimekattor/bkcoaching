import Link from "next/link";

interface PageHeaderWithSwitcherProps {
  role: "brands" | "micro-influencers";
}

export default function PageHeaderWithSwitcher({
  role,
}: PageHeaderWithSwitcherProps) {
  const isBrand = role === "brands";

  return (
    <div className="text-center space-y-2 mb-8">
      <h1 className="text-2xl font-bold text-primary">
        Hi, {isBrand ? "Brands" : "Micro-influencers"} 👋
      </h1>
      <p className="text-sm text-muted-foreground">
        {isBrand ? (
          <>
            Not a brand?{" "}
            <Link
              href="/influencer-onboarding"
              className="font-medium underline hover:text-primary"
            >
              Micro-influencers click here
            </Link>
          </>
        ) : (
          <>
            Not a micro-influencer?{" "}
            <Link
              href="/brand-onboarding"
              className="font-medium underline hover:text-primary"
            >
              Brands click here
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
