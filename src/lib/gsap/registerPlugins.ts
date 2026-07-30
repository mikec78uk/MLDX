import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // ScrollTrigger measures each trigger's start/end once, at setup. Images on
  // these pages finish loading afterwards and grow the document, which leaves
  // those measurements pointing at the wrong scroll offsets — far enough out
  // that an element can sit on screen while ScrollTrigger still thinks its
  // start hasn't been reached, so a `from` tween never plays and its content
  // stays at opacity 0. Re-measuring once the page has settled keeps every
  // trigger honest.
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger };
