// components/BlogEditor.tsx
"use client";

import { useEffect } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";

import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";

import {
  ListNode,
  ListItemNode,
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from "@lexical/list";

import {
  $getRoot,
  FORMAT_TEXT_COMMAND,
} from "lexical";

import {
  List,
  ListOrdered,
} from "lucide-react";

type BlogEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

function Toolbar() {
  const [editor] = useLexicalComposerContext();

  return (
    <div
      className="flex items-center gap-1 border-b px-2 py-2"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface-2)",
      }}
    >
      <button
        type="button"
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
        }
        className="rounded px-3 py-1.5 text-sm font-bold hover:opacity-70"
        title="Bold"
      >
        B
      </button>

      <button
        type="button"
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
        }
        className="rounded px-3 py-1.5 text-sm italic hover:opacity-70"
        title="Italic"
      >
        I
      </button>

      <button
        type="button"
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
        }
        className="rounded px-3 py-1.5 text-sm underline hover:opacity-70"
        title="Underline"
      >
        U
      </button>

      <div
        className="mx-1 h-5 w-px"
        style={{ background: "var(--border)" }}
      />

      <button
        type="button"
        onClick={() =>
          editor.dispatchCommand(
            INSERT_UNORDERED_LIST_COMMAND,
            undefined
          )
        }
        className="rounded p-2 hover:opacity-70"
        title="Bullet list"
      >
        <List size={17} />
      </button>

      <button
        type="button"
        onClick={() =>
          editor.dispatchCommand(
            INSERT_ORDERED_LIST_COMMAND,
            undefined
          )
        }
        className="rounded p-2 hover:opacity-70"
        title="Numbered list"
      >
        <ListOrdered size={17} />
      </button>
    </div>
  );
}

function InitialContent({ value }: { value: string }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!value) return;

    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(value, "text/html");

      const nodes = $generateNodesFromDOM(editor, dom);

      const root = $getRoot();

      root.clear();
      root.append(...nodes);
    });

    // Load initial content only once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  return null;
}

export default function BlogEditor({
  value,
  onChange,
}: BlogEditorProps) {
  return (
    <div
      className="overflow-hidden rounded-md border"
      style={{
        background: "var(--surface-2)",
        borderColor: "var(--border)",
        color: "var(--text)",
      }}
    >
      <LexicalComposer
        initialConfig={{
          namespace: "BlogEditor",

          nodes: [
            ListNode,
            ListItemNode,
          ],

          theme: {
            paragraph: "mb-3",

            list: {
              ul: "list-disc ml-6 mb-3",
              ol: "list-decimal ml-6 mb-3",
              listitem: "mb-1",
            },

            text: {
              bold: "font-bold",
              italic: "italic",
              underline: "underline",
            },
          },

          onError(error) {
            console.error(error);
          },
        }}
      >
        <Toolbar />

        <InitialContent value={value} />

        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="min-h-[260px] px-4 py-4 outline-none text-sm leading-relaxed"
                aria-placeholder="Write your post here..."
              />
            }
            placeholder={
              <div
                className="pointer-events-none absolute left-4 top-4 text-sm"
                style={{ color: "var(--text-faint)" }}
              >
                Write your post here…
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />

          <HistoryPlugin />

          <ListPlugin />

          <OnChangePlugin
            onChange={(editorState, editor) => {
              editorState.read(() => {
                const html = $generateHtmlFromNodes(editor);
                onChange(html);
              });
            }}
          />
        </div>
      </LexicalComposer>
    </div>
  );
}