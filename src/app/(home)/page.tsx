
import Header from "./components/header";
import Main from "./components/main";
import ScrollToTopButton from "@/components/scrollToTop/scrollToTop";

export default function HomeComponent() {


  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <Main />
      <ScrollToTopButton />
    </div>
  );
}
