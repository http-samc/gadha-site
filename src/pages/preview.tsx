import fs from 'fs';
import { marked } from 'marked';
import React, { useEffect, useRef } from 'react';

export function getStaticProps() {
  const content = fs.readFileSync('src/copy/preview.md', 'utf8');
  return {
    props: {
      content: marked.parse(content),
    },
  };
}

interface PreviewProps {
  content: string;
}

const Preview = ({ content }: PreviewProps) => {
  const textParent = useRef<HTMLDivElement>(null);
  useEffect(() => {
    textParent.current!.innerHTML = content;
  }, [content]);
  return (
    <div
      ref={textParent}
      className="prose relative grid w-screen overflow-y-auto rounded-xl border border-amber-50/30 bg-amber-50/10 p-8 font-mono backdrop-blur-sm transition-all scrollbar scrollbar-thumb-amber-50 md:grid-cols-2 lg:h-[600px] lg:w-[700px] lg:hover:backdrop-blur-md"
    />
  );
};

export default Preview;
