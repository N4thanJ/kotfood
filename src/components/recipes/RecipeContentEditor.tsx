'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Eye, Edit, Save, Copy } from 'lucide-react';

const CKEditor = dynamic(
  async () => {
    const mod = await import('@ckeditor/ckeditor5-react');
    return mod.CKEditor;
  },
  { ssr: false },
);

interface Props {
  initialContent?: string;
  onSave: (content: string) => void;
}

const config = {
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
    'insertTable',
    '|',
    'undo',
    'redo',
  ],
  heading: {
    options: [
      {
        model: 'paragraph' as const,
        title: 'Paragraph',
        class: 'ck-heading_paragraph',
      },
      {
        model: 'heading1' as const,
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1',
      },
      {
        model: 'heading2' as const,
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2',
      },
      {
        model: 'heading3' as const,
        view: 'h3',
        title: 'Heading 3',
        class: 'ck-heading_heading3',
      },
    ],
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
};

export default function RecipeContentEditor({
  initialContent = '',
  onSave,
}: Props) {
  const [editorData, setEditorData] = useState(initialContent);
  // eslint-disable-next-line
  const [ClassicEditor, setClassicEditor] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('edit');
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{
    title: string;
    description: string;
    variant?: string;
  } | null>(null);

  useEffect(() => {
    import('@ckeditor/ckeditor5-build-classic').then((mod) => {
      const Editor = mod.default ?? mod;
      setClassicEditor(() => Editor);
    });
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (title: string, description: string, variant?: string) => {
    setToast({ title, description, variant });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(editorData);
      showToast('Recipe opgeslagen! ✅', 'Je recept is succesvol bijgewerkt.');
    } catch {
      showToast(
        'Fout bij opslaan ❌',
        'Er is iets misgegaan. Probeer het opnieuw.',
        'destructive',
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyContent = async () => {
    try {
      const textContent = editorData.replace(/<[^>]*>/g, '');
      await navigator.clipboard.writeText(textContent);
      showToast('Gekopieerd! 📋', 'Recept tekst is gekopieerd naar klembord.');
    } catch {
      showToast(
        'Kopiëren mislukt',
        'Kon tekst niet kopiëren naar klembord.',
        'destructive',
      );
    }
  };

  if (!ClassicEditor) {
    return (
      <div className='w-full rounded-lg border bg-white p-8'>
        <div className='flex items-center justify-center gap-2'>
          <div className='h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent'></div>
          <p className='text-gray-600'>Editor laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full space-y-4'>
      {/* Toast notification */}
      {toast && (
        <div className='animate-slide-in fixed top-4 right-4 z-50 max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow-lg'>
          <div className='flex flex-col gap-1'>
            <p
              className={`font-semibold ${toast.variant === 'destructive' ? 'text-red-600' : 'text-gray-900'}`}
            >
              {toast.title}
            </p>
            <p className='text-sm text-gray-600'>{toast.description}</p>
          </div>
        </div>
      )}

      {/* Header with stats and actions */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <button
            onClick={handleCopyContent}
            className='flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50'
          >
            <Copy className='h-4 w-4' />
            Kopiëren
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className='flex items-center gap-2 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50'
          >
            {isSaving ? (
              <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
            ) : (
              <Save className='h-4 w-4' />
            )}
            {isSaving ? 'Opslaan...' : 'Opslaan'}
          </button>
        </div>
      </div>

      {/* Tabbed interface */}
      <div className='w-full'>
        <div className='grid w-full grid-cols-2 overflow-hidden rounded-lg border border-gray-200 bg-gray-50'>
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex cursor-pointer items-center justify-center gap-2 border-r border-gray-200 bg-white px-3 py-2 text-sm font-medium transition ${
              activeTab === 'edit'
                ? 'text-gray-900 shadow'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <Edit className='h-4 w-4' />
            Bewerken
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex cursor-pointer items-center justify-center gap-2 bg-white px-3 py-2 text-sm font-medium transition ${
              activeTab === 'preview'
                ? 'text-gray-900 shadow'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <Eye className='h-4 w-4' />
            Voorbeeld
          </button>
        </div>

        <div className='mt-4'>
          {activeTab === 'edit' && (
            <div className='mb-16'>
              <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={(_, editor) => setEditorData(editor.getData())}
                config={config}
              />
            </div>
          )}

          {activeTab === 'preview' && (
            <>
              {editorData ? (
                <div
                  className='prose prose-slate mt-8 max-w-none'
                  dangerouslySetInnerHTML={{ __html: editorData }}
                />
              ) : (
                <div className='flex items-center justify-center py-8 text-gray-500'>
                  <p>
                    Geen inhoud om weer te geven. Begin met typen in de editor!
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
