import fs from 'fs';
import { marked } from 'marked';
import React, { useEffect, useRef } from 'react';

export function getStaticProps() {
  const content = fs.readFileSync('src/copy/about.md', 'utf8');
  return {
    props: {
      content: marked.parse(content),
    },
  };
}

interface AboutProps {
  content: string;
}

const About = ({ content }: AboutProps) => {
  const textParent = useRef<HTMLDivElement>(null);
  useEffect(() => {
    textParent.current!.innerHTML = content;
  }, [content]);
  return (
    <div
      ref={textParent}
      className="prose relative w-screen overflow-y-auto rounded-xl border border-amber-50/30 bg-amber-50/10 p-8 font-mono backdrop-blur-sm transition-all scrollbar scrollbar-thumb-amber-50 lg:h-[600px] lg:w-[700px] lg:hover:backdrop-blur-md"
    />
  );
};

export default About;
