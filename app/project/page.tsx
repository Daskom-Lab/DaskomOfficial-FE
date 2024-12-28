import { ContentProject } from "@/components/contentProject";
import { Footer } from "@/components/footer";

export default function ProjectLayout() {
  return (
    <section className="-mt-[60px] overflow-x-hidden">
        <ContentProject />
        <Footer />
    </section>
  );
}
