import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  let headers = data.headers.map((header, index) => (
    <th
      key={index}
      className="px-4 py-3 text-left text-sm font-semibold text-foreground bg-muted/50 border-b border-border"
    >
      {header}
    </th>
  ));
  let rows = data.rows.map((row, index) => (
    <motion.tr
      key={index}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="hover:bg-muted/30 transition-colors duration-200"
    >
      {row.map((cell, cellIndex) => (
        <td
          key={cellIndex}
          className="px-4 py-3 text-sm border-b border-border/40"
        >
          {cell}
        </td>
      ))}
    </motion.tr>
  ));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-8 overflow-x-auto rounded-lg border border-border bg-card shadow-sm"
    >
      <table className="w-full">
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </motion.div>
  );
}

function CustomLink(props: any) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        {...props}
        className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-2 hover:decoration-primary/60 transition-all duration-200"
      >
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a
        {...props}
        className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-2 hover:decoration-primary/60 transition-all duration-200"
      />
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-2 hover:decoration-primary/60 transition-all duration-200 inline-flex items-center gap-1"
    >
      {props.children}
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
          clipRule="evenodd"
        />
      </svg>
    </a>
  );
}

function RoundedImage(props: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="my-8"
    >
      <Image
        alt={props.alt}
        className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-auto"
        {...props}
      />
      {props.alt && (
        <p className="text-center text-sm text-muted-foreground mt-2 italic">
          {props.alt}
        </p>
      )}
    </motion.div>
  );
}

function CodeBlock({ children, className, ...props }: any) {
  const language = className?.replace(/language-/, "") || "text";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-6 relative group"
    >
      <div className="flex items-center justify-between bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground border-t border-l border-r border-border rounded-t-lg">
        <span>{language}</span>
        <button
          onClick={() => navigator.clipboard.writeText(children)}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs hover:text-foreground"
        >
          Copy
        </button>
      </div>
      <pre className="bg-muted/30 p-4 rounded-b-lg border border-border overflow-x-auto">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </motion.div>
  );
}

function InlineCode({ children, ...props }: any) {
  return (
    <code
      className="px-2 py-1 bg-muted/50 text-foreground rounded-md text-sm font-mono border border-border/40"
      {...props}
    >
      {children}
    </code>
  );
}

function Blockquote({ children, ...props }: any) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="my-6 border-l-4 border-primary/50 bg-muted/30 pl-6 py-4 italic text-muted-foreground rounded-r-lg"
      {...props}
    >
      {children}
    </motion.blockquote>
  );
}

// This replaces rehype-slug
function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    let slug = slugify(children as string);
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

    const headingClasses = {
      1: "text-4xl font-bold mt-8 mb-4 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent",
      2: "text-3xl font-semibold mt-8 mb-4 text-foreground",
      3: "text-2xl font-semibold mt-6 mb-3 text-foreground",
      4: "text-xl font-semibold mt-6 mb-3 text-foreground",
      5: "text-lg font-semibold mt-4 mb-2 text-foreground",
      6: "text-base font-semibold mt-4 mb-2 text-foreground",
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative"
      >
        <HeadingTag
          id={slug}
          className={`${
            headingClasses[level as keyof typeof headingClasses]
          } scroll-mt-20 group-hover:text-primary/80 transition-colors duration-200`}
        >
          <a
            href={`#${slug}`}
            className="anchor absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-primary/60 hover:text-primary"
            aria-label={`Link to ${children}`}
          >
            #
          </a>
          {children}
        </HeadingTag>
      </motion.div>
    );
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

function Paragraph({ children, ...props }: any) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-4 text-foreground/90 leading-relaxed"
      {...props}
    >
      {children}
    </motion.p>
  );
}

function UnorderedList({ children, ...props }: any) {
  return (
    <motion.ul
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-4 ml-6 list-disc space-y-2 text-foreground/90"
      {...props}
    >
      {children}
    </motion.ul>
  );
}

function OrderedList({ children, ...props }: any) {
  return (
    <motion.ol
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-4 ml-6 list-decimal space-y-2 text-foreground/90"
      {...props}
    >
      {children}
    </motion.ol>
  );
}

function ListItem({ children, ...props }: any) {
  return (
    <li
      className="leading-relaxed hover:text-foreground transition-colors duration-200"
      {...props}
    >
      {children}
    </li>
  );
}

export const globalComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  p: Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  Image: RoundedImage,
  a: CustomLink,
  code: InlineCode,
  pre: CodeBlock,
  blockquote: Blockquote,
  Table,
};
