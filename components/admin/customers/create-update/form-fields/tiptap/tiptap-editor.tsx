import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ToolbarEditor } from './toolbar-editor';

type TiptapEditorType = {
  content: string;
  onChange: (content: string) => void;
};

export const TiptapEditor = ({ content, onChange }: TiptapEditorType) => {
  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    content: content,
    editorProps: {
      attributes: {
        class: ' rounded-md min-h-[150px] border border-input bg-blak p-4 ',
      },
    },
    immediatelyRender: false,
  });
  return (
    <div className=" flex flex-col gap-1 justify-stretch min-h-[250px]">
      <ToolbarEditor editor={editor} />
      <EditorContent editor={editor} style={{ whiteSpace: 'pre-line' }} />
    </div>
  );
};
