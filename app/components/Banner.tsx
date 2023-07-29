const Banner = () => {
  return (
    <section
      id="home"
      className="max-w-contentContainer mx-auto py-24 flex flex-col gap-4 lgl:gap-5 mdl:px-10 xl:px-4"
    >
      <h3 className="text-lg font-titleFont tracking-wide text-textBlue">
        Hi, my name is
      </h3>
      <h1 className="text-4xl lgl:text-6xl font-titleFont font-semibold flex flex-col">
        Benzerdjeb Adnane.{" "}
        <span className="text-textDark mt-2 lgl:mt-4">
          I am a Software Engineer
        </span>
      </h1>
      <p className="text-base md:max-w-[650px] text-textDark font-medium">
        I am a highly motivated and skilled software engineer with a passion for
        software development. With a strong addiction to technology,I specialize
        in web development using ReactJS and NodeJS and mobile development using
        React Native and Flutter. I am also a big fan of UI/UX design and I am a
        self-taught designer.
      </p>
      <button className="w-52 h-14 text-sm font-titleFont border border-textBlue rounded-md text-textBlue tracking-wide hover:bg-hoverColor duration-300">
        Check out my Projects!
      </button>
    </section>
  );
};

export default Banner;
