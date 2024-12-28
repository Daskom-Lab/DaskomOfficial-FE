import { ContentAbout } from "@/components/contentAbout";
import { Footer } from "@/components/footer";

export default function AboutLayout() {
  return (
    <section className="-mt-[70px] overflow-x-hidden">
        <ContentAbout />
        <Footer />
    </section>
  );
}
