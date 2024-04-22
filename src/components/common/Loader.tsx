"use client";

export type LoaderColorType = "white" | "black";

interface IProps {
  color?: LoaderColorType;
  position?: "absolute" | "fixed";
}

export default function Loader({ color = "black", position = "fixed" }: IProps) {
  const loaderColor: Record<LoaderColorType, string> = {
    white: "bg-white",
    black: "bg-black opacity-70",
  };
  return (
    <div className={`${loaderColor[color]} ${position} cn-center left-0 top-0 z-20 h-full w-full`}>
      <span className="loader"></span>
    </div>
  );
}
