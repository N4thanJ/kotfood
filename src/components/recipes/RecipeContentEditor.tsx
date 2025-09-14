'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';

interface Props {
  initialContent?: string;
  onSave: (content: string) => void;
}

export default function RecipeContentEditor({
  initialContent = '',
  onSave,
}: Props) {
  const [editorData, setEditorData] = useState(initialContent);

  return (
    <div className='flex flex-col gap-4'>
      {/* Add top padding to account for fixed navigation */}
      <div className='pt-24'>
        {' '}
        {/* 24 = 6rem, slightly more than navigation height of 5rem (h-20) */}
        <CKEditor
          editor={ClassicEditor as any}
          data={initialContent}
          onChange={(event, editor) => {
            const data = editor.getData();
            setEditorData(data);
          }}
          onReady={(editor) => {
            const editingView = editor.editing.view;
            const editableElement = editingView.document.getRoot();

            if (editableElement) {
              editingView.change((writer) => {
                // Add custom CSS styles to the editor content area
                const style = document.createElement('style');
                style.innerHTML = `
                    .ck-content h1 {
                      font-size: 2.25rem !important;
                      font-weight: 700 !important;
                      line-height: 1.2 !important;
                      margin-top: 1.5rem !important;
                      margin-bottom: 1rem !important;
                      color: hsl(var(--foreground)) !important;
                    }
                    .ck-content h2 {
                      font-size: 1.875rem !important;
                      font-weight: 600 !important;
                      line-height: 1.3 !important;
                      margin-top: 1.25rem !important;
                      margin-bottom: 0.75rem !important;
                      color: hsl(var(--foreground)) !important;
                    }
                    .ck-content h3 {
                      font-size: 1.5rem !important;
                      font-weight: 600 !important;
                      line-height: 1.4 !important;
                      margin-top: 1rem !important;
                      margin-bottom: 0.5rem !important;
                      color: hsl(var(--foreground)) !important;
                    }
                    .ck-content p {
                      font-size: 1rem !important;
                      line-height: 1.6 !important;
                      margin-bottom: 1rem !important;
                      color: hsl(var(--foreground)) !important;
                    }
                    .ck-content ul, .ck-content ol {
                      margin-bottom: 1rem !important;
                      padding-left: 1.5rem !important;
                    }
                    .ck-content li {
                      margin-bottom: 0.5rem !important;
                      line-height: 1.6 !important;
                    }
                    .ck-content strong {
                      font-weight: 600 !important;
                    }
                    .ck-content em {
                      font-style: italic !important;
                    }
                    .ck-content blockquote {
                      border-left: 4px solid hsl(var(--primary)) !important;
                      padding-left: 1rem !important;
                      margin: 1rem 0 !important;
                      font-style: italic !important;
                      color: hsl(var(--muted-foreground)) !important;
                    }
                  `;

                // Append the style to the document head to ensure it applies
                document.head.appendChild(style);
              });
            }
          }}
          config={{
            toolbar: [
              'heading',
              '|',
              'bold',
              'italic',
              'link',
              'bulletedList',
              'numberedList',
              '|',
              'outdent',
              'indent',
              '|',
              'blockQuote',
              'undo',
              'redo',
            ],
            heading: {
              options: [
                {
                  model: 'paragraph',
                  title: 'Paragraph',
                  class: 'ck-heading_paragraph',
                },
                {
                  model: 'heading1',
                  view: 'h1',
                  title: 'Heading 1',
                  class: 'ck-heading_heading1',
                },
                {
                  model: 'heading2',
                  view: 'h2',
                  title: 'Heading 2',
                  class: 'ck-heading_heading2',
                },
                {
                  model: 'heading3',
                  view: 'h3',
                  title: 'Heading 3',
                  class: 'ck-heading_heading3',
                },
              ],
            },
          }}
        />
      </div>

      <button
        onClick={() => onSave(editorData)}
        className='bg-secondary text-background hover:bg-primary mb-8 self-start rounded-xl px-4 py-2 font-semibold transition'
      >
        Slaag op
      </button>
    </div>
  );
}
