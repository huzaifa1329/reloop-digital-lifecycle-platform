import { Sparkles } from "lucide-react";
import PageContainer from "../layout/PageContainer";

function ComingSoon({ title, description }) {
  return (
    <PageContainer className="py-10">
      <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-dashed border-reloop-espresso/15 bg-white/50 px-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-reloop-neutral text-reloop-espresso/60">
          <Sparkles size={22} />
        </div>

        <h2 className="mt-4 font-display text-xl font-bold text-reloop-espresso">
          {title}
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-reloop-espresso/50">
          {description ??
            "This workflow is planned for a later build phase and isn't part of this week's frontend milestone."}
        </p>
      </div>
    </PageContainer>
  );
}

export default ComingSoon;
