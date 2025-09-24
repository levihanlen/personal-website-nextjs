import { Libre_Franklin, EB_Garamond } from "next/font/google";
const libreFranklin = Libre_Franklin({ subsets: ["latin"] });
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export { libreFranklin, ebGaramond };
