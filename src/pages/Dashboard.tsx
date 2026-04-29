import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import type { DesignService } from '../types';
import { Link as LinkIcon, Plus, Trash2 } from 'lucide-react';

const SERVICES: DesignService[] = ['Figma', 'Adobe', 'Canva', 'Nanobanana', 'Other'];

const Dashboard: React.FC = () => {
  const { links, addLink, removeLink } = useAppStore();
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [service, setService] = useState<DesignService>('Figma');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !title) return;

    addLink({ url, title, service, description });

    // Reset form
    setUrl('');
    setTitle('');
    setDescription('');
    setService('Figma');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium mb-4 flex items-center">
          <LinkIcon className="w-5 h-5 mr-2 text-blue-600" />
          디자인 링크 추가하기
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">서비스</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value as DesignService)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">제목 (무엇인지)</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 메인 페이지 UI"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">링크 (URL)</label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">설명 (선택사항)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="어떤 페이지나 요소가 있는지 메모..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            링크 추가
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium mb-4">수집된 디자인 링크</h2>
        {links.length === 0 ? (
          <p className="text-gray-500 text-sm py-4 text-center">아직 추가된 링크가 없습니다.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {links.map((link) => (
              <li key={link.id} className="py-4 flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                      {link.service}
                    </span>
                    <h3 className="text-sm font-medium text-gray-900">{link.title}</h3>
                  </div>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mt-1 block break-all">
                    {link.url}
                  </a>
                  {link.description && (
                    <p className="text-sm text-gray-500 mt-1">{link.description}</p>
                  )}
                </div>
                <button
                  onClick={() => removeLink(link.id)}
                  aria-label="링크 삭제"
                  title="링크 삭제"
                  className="text-red-500 hover:text-red-700 p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
