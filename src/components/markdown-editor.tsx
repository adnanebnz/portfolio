"use client";

import { useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import {
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Image,
  Eye,
  Edit3,
  LucideIcon,
} from "lucide-react";

interface ToolbarButton {
  type?: "divider";
  icon?: LucideIcon;
  label?: string;
  action?: () => void;
}

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your content in Markdown...",
  className,
  minHeight = "400px",
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const insertMarkdown = useCallback(
    (prefix: string, suffix: string = "", placeholder: string = "") => {
      const textarea = document.querySelector(
        'textarea[data-markdown-editor="true"]'
      ) as HTMLTextAreaElement;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = value.substring(start, end);
      const textToInsert = selectedText || placeholder;

      const newValue =
        value.substring(0, start) +
        prefix +
        textToInsert +
        suffix +
        value.substring(end);

      onChange(newValue);

      // Set cursor position after insertion
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = start + prefix.length + textToInsert.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    },
    [value, onChange]
  );

  const toolbarButtons: ToolbarButton[] = [
    {
      icon: Bold,
      label: "Bold",
      action: () => insertMarkdown("**", "**", "bold text"),
    },
    {
      icon: Italic,
      label: "Italic",
      action: () => insertMarkdown("*", "*", "italic text"),
    },
    { type: "divider" },
    {
      icon: Heading1,
      label: "Heading 1",
      action: () => insertMarkdown("# ", "", "Heading 1"),
    },
    {
      icon: Heading2,
      label: "Heading 2",
      action: () => insertMarkdown("## ", "", "Heading 2"),
    },
    {
      icon: Heading3,
      label: "Heading 3",
      action: () => insertMarkdown("### ", "", "Heading 3"),
    },
    { type: "divider" },
    {
      icon: List,
      label: "Bullet List",
      action: () => insertMarkdown("- ", "", "List item"),
    },
    {
      icon: ListOrdered,
      label: "Numbered List",
      action: () => insertMarkdown("1. ", "", "List item"),
    },
    { type: "divider" },
    {
      icon: Quote,
      label: "Quote",
      action: () => insertMarkdown("> ", "", "Quote"),
    },
    {
      icon: Code,
      label: "Code",
      action: () => insertMarkdown("`", "`", "code"),
    },
    {
      icon: Link,
      label: "Link",
      action: () => insertMarkdown("[", "](url)", "link text"),
    },
    {
      icon: Image,
      label: "Image",
      action: () => insertMarkdown("![", "](url)", "alt text"),
    },
  ];

  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b bg-muted/50 flex-wrap">
        {toolbarButtons.map((button, index) =>
          button.type === "divider" ? (
            <div
              key={index}
              className="w-px h-6 bg-border mx-1 hidden sm:block"
            />
          ) : (
            <Button
              key={index}
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={button.action}
              title={button.label}
            >
              {button.icon && <button.icon className="w-4 h-4" />}
            </Button>
          )
        )}

        <div className="flex-1" />

        {/* Tab Toggle */}
        <div className="flex items-center gap-1 bg-background rounded-md p-1 border">
          <Button
            type="button"
            variant={activeTab === "write" ? "default" : "ghost"}
            size="sm"
            className="h-7 px-3 text-xs"
            onClick={() => setActiveTab("write")}
          >
            <Edit3 className="w-3 h-3 mr-1" />
            Write
          </Button>
          <Button
            type="button"
            variant={activeTab === "preview" ? "default" : "ghost"}
            size="sm"
            className="h-7 px-3 text-xs"
            onClick={() => setActiveTab("preview")}
          >
            <Eye className="w-3 h-3 mr-1" />
            Preview
          </Button>
        </div>
      </div>

      {/* Editor / Preview */}
      <div style={{ minHeight }}>
        {activeTab === "write" ? (
          <Textarea
            data-markdown-editor="true"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="border-0 rounded-none resize-none focus-visible:ring-0 h-full font-mono text-sm"
            style={{ minHeight }}
          />
        ) : (
          <div
            className="p-4 prose prose-sm max-w-none dark:prose-invert overflow-auto"
            style={{ minHeight }}
          >
            {value ? (
              <Markdown>{value}</Markdown>
            ) : (
              <p className="text-muted-foreground italic">
                Nothing to preview yet...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Code block insertion helper
export function insertCodeBlock(
  value: string,
  onChange: (value: string) => void,
  language: string = ""
) {
  const textarea = document.querySelector(
    'textarea[data-markdown-editor="true"]'
  ) as HTMLTextAreaElement;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = value.substring(start, end);
  const codeContent = selectedText || "// your code here";

  const codeBlock = `\n\`\`\`${language}\n${codeContent}\n\`\`\`\n`;

  const newValue = value.substring(0, start) + codeBlock + value.substring(end);
  onChange(newValue);
}
