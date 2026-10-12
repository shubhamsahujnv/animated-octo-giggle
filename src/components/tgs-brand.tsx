import tgsLogo from "@/assets/tgs-logo.png.asset.json";

export function TgsLogo({ className = "" }: { className?: string }) {
  return (
    <img
      src={tgsLogo.url}
      alt="TGS"
      width={360}
      height={271}
      className={`h-auto w-9 object-contain ${className}`}
    />
  );
}
