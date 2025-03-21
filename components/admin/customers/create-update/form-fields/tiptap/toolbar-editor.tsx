import { Toggle } from '@/components/ui/toggle';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from 'lucide-react';
import React from 'react';

type ToolbarEditorType = {
  editor: Editor | null;
};
export const ToolbarEditor = ({ editor }: ToolbarEditorType) => {
  if (!editor) {
    return null;
  }
  return (
    <div className=" flex gap-2 border border-input bg-transparent rounded-md  p-2">
      <Toggle
        size="sm"
        pressed={editor.isActive('heading')}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className=" h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className=" h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className=" h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className=" h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className=" h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className=" h-4 w-4" />
      </Toggle>
    </div>
  );
};
