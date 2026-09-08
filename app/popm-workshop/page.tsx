import HideCrispChat from "./HideCrispChat";
import PopmWorkshopBoard from "./PopmWorkshopBoard";

export const metadata = {
  title: "POPM class board | Agile36",
  description: "Live shared Product Owner / Product Manager workshop board for Agile36 class activities.",
  robots: "noindex, nofollow",
};

export default function PopmWorkshopPage() {
  return (
    <>
      <HideCrispChat />
      <PopmWorkshopBoard />
    </>
  );
}
