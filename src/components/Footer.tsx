import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer aria-label="Site footer" className="bg-black py-10 px-5">
      <div className="mx-auto max-w-5xl flex flex-col items-center gap-6">
        <SocialIcons size={27} />

        <p className="text-[11px] uppercase tracking-widest text-blush/70 text-center">
          &copy; Borchetta Entertainment Group, LLC d/b/a Big Machine Records.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-widest text-blush/70">
          <a
            href="https://www.bigmachinerecords.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ivory"
          >
            Terms
          </a>
          <span className="text-ivory/30">/</span>
          <a
            href="https://www.bigmachinerecords.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ivory"
          >
            Do Not Sell My Personal Information
          </a>
          <span className="text-ivory/30">/</span>
          <a
            href="https://www.bigmachinerecords.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ivory"
          >
            Privacy
          </a>
          <span className="text-ivory/30">/</span>
          <a
            href="https://www.bigmachinerecords.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ivory"
          >
            Cookie Choices
          </a>
        </div>
      </div>
    </footer>
  );
}
