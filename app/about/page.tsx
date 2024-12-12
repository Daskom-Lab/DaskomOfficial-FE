import { ContentAbout } from "@/components/contentAbout";
import { Footer } from "@/components/footer";

export default function AboutLayout() {
  return (
    <section className="-mt-[130px] overflow-x-hidden">
        <ContentAbout />
        <Footer />
    </section>
  );
}
