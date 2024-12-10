import { ContentProject } from "@/components/contentProject";
import { Footer } from "@/components/footer";

export default function ProjectLayout() {
  return (
    <section className="-mt-[130px] overflow-x-hidden">
        <ContentProject />
        <Footer />
    </section>
  );
}
