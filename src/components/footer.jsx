import Image from "next/image";
function Footer(props) {
  return (
    <footer className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8 bg-white">
      <div className="border-t border-slate-900/5 py-10">
        <Image
          className="mx-auto h-5 w-auto text-slate-900"
          src="/images/papaya.svg"
          width={"100"}
          height={"100"}
          alt="papaya"
        />
        <p className="mt-5 text-center text-sm leading-6 text-slate-500">
          &copy; 2023 Bank Papaya. All rights reserved.
        </p>
        <div className="mt-16 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-slate-700">
          <a href="/privacy-policy">Privacy policy</a>
          <div className="h-4 w-px bg-slate-500/20"></div>
          <a href="/changelog">Changelog</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
