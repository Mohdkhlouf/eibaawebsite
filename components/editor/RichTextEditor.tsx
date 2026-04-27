'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { useEffect, useState } from 'react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { NodeSelection } from '@tiptap/pm/state'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Minus, Undo, Redo, Link as LinkIcon, Image as ImageIcon
} from 'lucide-react'
import TextAlign from '@tiptap/extension-text-align'
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react'


const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute('style'),
        renderHTML: (attributes) => {
          if (!attributes.style) return {}
          return { style: attributes.style }
        },
      },
    }
  },
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const img = document.createElement('img')
      img.src = node.attrs.src
      img.alt = node.attrs.alt || ''
      if (node.attrs.style) img.style.cssText = node.attrs.style

      img.style.cursor = 'pointer'
      img.style.maxWidth = '100%'

      img.addEventListener('click', () => {
        const pos = typeof getPos === 'function' ? getPos() : null
        if (pos == null || typeof pos !== 'number') return
        editor.view.dispatch(
          editor.view.state.tr.setSelection(
            NodeSelection.create(editor.view.state.doc, pos)
          )
        )
      })

      return {
        dom: img,
        update: (updatedNode) => {
          if (updatedNode.type !== node.type) return false
          if (updatedNode.attrs.style) img.style.cssText = updatedNode.attrs.style
          img.src = updatedNode.attrs.src
          return true
        },
      }
    }
  },
})

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
  const [isImageSelected, setIsImageSelected] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      StarterKit,
      CustomImage,
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
    onSelectionUpdate: ({ editor }) => {
      setIsImageSelected(editor.isActive('image'))
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

        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })}>
          <AlignLeft size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })}>
          <AlignCenter size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })}>
          <AlignRight size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })}>
          <AlignJustify size={16} />
        </ToolbarButton>

        <div className="w-px bg-gray-300 mx-1" />

        <ToolbarButton onClick={addLink} active={editor.isActive('link')}>
          <LinkIcon size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={addImage}>
          <ImageIcon size={16} />
        </ToolbarButton>

        {isImageSelected && (
          <>
            <div className="w-px bg-gray-300 mx-1" />
            <ToolbarButton onClick={() => editor.chain().focus().updateAttributes('image', { style: 'display: block; margin-left: 0; margin-right: auto;' }).run()}>
              <AlignLeft size={16} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().updateAttributes('image', { style: 'display: block; margin-left: auto; margin-right: auto;' }).run()}>
              <AlignCenter size={16} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().updateAttributes('image', { style: 'display: block; margin-left: auto; margin-right: 0;' }).run()}>
              <AlignRight size={16} />
            </ToolbarButton>
          </>
        )}

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
