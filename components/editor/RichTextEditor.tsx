'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { useEffect, useState } from 'react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Minus, Undo, Redo, Link as LinkIcon, Image as ImageIcon
} from 'lucide-react'

const ToolbarButton = ({
  onClick, active, children,
}: {
  onClick: () => void
  active?: boolean
  children: React.ReactNode
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded hover:bg-gray-200 transition-colors ${active ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
  >
    {children}
  </button>
)

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onImageUpload?: (callback: (url: string) => void) => void
}

export default function RichTextEditor({ value, onChange, placeholder, onImageUpload }: RichTextEditorProps) {  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: placeholder || 'Write your content here...' }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose max-w-none p-4 min-h-[300px] focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // Sync value when editing existing blog
  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!mounted) return (
    <div className="border border-gray-300 rounded-lg min-h-[300px] animate-pulse bg-gray-50" />
  )

  if (!editor) return null

  const addLink = () => {
    const url = prompt('Enter URL')
    if (url) editor.chain().focus().setLink({ href: url }).run()
  }

  const addImage = () => {
     if (onImageUpload) {
       onImageUpload((url: string) => {
         editor.chain().focus().setImage({ src: url }).run()
       })
     } else {
       const url = prompt('Enter image URL')
       if (url) editor.chain().focus().setImage({ src: url }).run()
     }
   }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-300">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')}>
          <Strikethrough size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')}>
          <Code size={16} />
        </ToolbarButton>

        <div className="w-px bg-gray-300 mx-1" />

        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })}>
          <Heading1 size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
          <Heading2 size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>
          <Heading3 size={16} />
        </ToolbarButton>

        <div className="w-px bg-gray-300 mx-1" />

        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
          <ListOrdered size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>
          <Quote size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus size={16} />
        </ToolbarButton>

        <div className="w-px bg-gray-300 mx-1" />

        <ToolbarButton onClick={addLink} active={editor.isActive('link')}>
          <LinkIcon size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={addImage}>
          <ImageIcon size={16} />
        </ToolbarButton>

        <div className="w-px bg-gray-300 mx-1" />

        <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
          <Undo size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
          <Redo size={16} />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  )
}
