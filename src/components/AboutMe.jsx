function AboutMe() {
  return (
    <div
      className="flex flex-col max-w-7xl items-center"
      style={{ gap: "calc(var(--space-phi) * 0.75)", marginTop: "var(--space-phi2)" }}
    >
      <h1 className="text-4xl italic font-bold text-center">About Me</h1>
      <div
        className="w-full max-w-6xl bg-transparent border-y-2"
        style={{ padding: "calc(var(--space-phi) * 0.65)", marginTop: "calc(var(--space-phi) * 0.6)" }}
      >
        <h1 className="text-3xl font-bold">Hi I am Colin Fink</h1>
        <div className="space-y-3 text-xl leading-relaxed mt-3">
          <p>Hello and welcome to my page! My name is Colin Fink, and I’m a filmmaker based in Pittsburgh, Pennsylvania. I’m currently studying at the University of Pittsburgh, pursuing a degree in Film and Media Production.</p>
          <p>Over the past several years—from high school through college—I’ve written and directed a range of short films for festivals and independent release (many of which are featured on this site). I’m always working on new projects, and I’m especially passionate about collaborating with peers and local productions whenever possible.</p>
          <p>My work is genre-driven and story-first, focusing on stylized and camp-leaning thrillers, while always using an imagine-first (then find practical solutions second) approach as a key part of my storytelling philosophy.</p>
          <p>I’m inspired by filmmakers and Pittsburgh legends who’ve helped shape the city’s creative identity, from George A. Romero to Fred Rogers, as well as Pittsburgh-area artists and icons like Dave Filoni, Michael Keaton, Jimmy Stewart, Gene Kelly, August Wilson, Andy Warhol, Billy Porter, Jeff Goldblum, and Ming-Na Wen. I see Pittsburgh as a city in transition, one rich with history and full of untapped potential—a new film capital of the world, even. After all, it was home to the first Nickelodeon. I want my work to help push it in that direction.</p>
          <p>At my core, I’m drawn to filmmaking because storytelling and watching movies, both in theaters and at home, have been integral to my childhood and have shaped who I am. What I enjoy most is being part of production: working on sets and helping turn an idea into something real.</p>
          <p>I’ve been fortunate to earn recognition through Pittsburgh’s 48 Hour Film Project (including nominations and awards), contribute to larger productions such as the indie feature film House of Tears (2024), and currently serve as the Social Chair of SCENE at Pitt, where I help build community and networking opportunities for student filmmakers.</p>
          <p>I’m currently looking to collaborate on productions in the Pittsburgh, PA, and New York City, NY areas, and I’m especially excited by projects that are creative and ambitious—bound only by the vision and grit of the people making them. If you’d like to work together, please reach out.</p>
        </div>
      </div>
    </div>
  );
}
export default AboutMe;
