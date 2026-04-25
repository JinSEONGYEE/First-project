import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { CheckCircle, Circle, Plus } from 'lucide-react';

const PlanGenerator: React.FC = () => {
  const { links, plans, addPlan, updatePlanStatus } = useAppStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);

  const toggleLinkSelection = (id: string) => {
    setSelectedLinks((prev) =>
      prev.includes(id) ? prev.filter((linkId) => linkId !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || selectedLinks.length === 0) return;

    addPlan({
      title,
      description,
      designLinks: selectedLinks,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setSelectedLinks([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Plan Creation Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium mb-4 flex items-center">
          <Plus className="w-5 h-5 mr-2 text-green-600" />
          새로운 업무 계획 생성
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">업무 제목</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 피그마 표지를 바탕으로 그래픽 디자인 만들기"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">상세 설명</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="어떤 디자인 에셋을 어떻게 활용할지 구체적으로 작성하세요..."
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              참조할 디자인 링크 선택 ({selectedLinks.length}개 선택됨)
            </label>
            {links.length === 0 ? (
              <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded border border-dashed">
                대시보드에서 먼저 디자인 링크를 추가해주세요.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-2 border rounded-md bg-gray-50">
                {links.map((link) => (
                  <button
                    type="button"
                    key={link.id}
                    onClick={() => toggleLinkSelection(link.id)}
                    aria-pressed={selectedLinks.includes(link.id)}
                    className={`w-full text-left cursor-pointer p-3 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      selectedLinks.includes(link.id)
                        ? 'bg-green-50 border-green-500 ring-1 ring-green-500'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                        {link.service}
                      </span>
                      <span className="text-sm font-medium truncate flex-1">{link.title}</span>
                      {selectedLinks.includes(link.id) ? (
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={links.length === 0 || selectedLinks.length === 0 || !title}
            className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            계획 추가하기
          </button>
        </form>
      </div>

      {/* Plans List */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium mb-4">업무 수행 계획 목록</h2>

        {plans.length === 0 ? (
          <p className="text-gray-500 text-sm py-8 text-center">작성된 업무 계획이 없습니다.</p>
        ) : (
          <div className="space-y-4">
            {plans.map((plan) => (
              <div key={plan.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-md font-semibold text-gray-900">{plan.title}</h3>
                  <select
                    value={plan.status}
                    onChange={(e) => updatePlanStatus(plan.id, e.target.value as 'pending' | 'in-progress' | 'completed')}
                    className={`text-sm rounded-full px-3 py-1 font-medium border-0 focus:ring-2 ${
                      plan.status === 'completed' ? 'bg-green-100 text-green-800' :
                      plan.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <option value="pending">대기 중</option>
                    <option value="in-progress">진행 중</option>
                    <option value="completed">완료됨</option>
                  </select>
                </div>

                {plan.description && (
                  <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                )}

                <div className="mt-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">참조된 디자인 에셋</h4>
                  <ul className="space-y-2">
                    {plan.designLinks.map(linkId => {
                      const linkData = links.find(l => l.id === linkId);
                      if (!linkData) return null;
                      return (
                        <li key={linkId} className="flex flex-col sm:flex-row sm:items-center text-sm bg-white p-2 rounded border border-gray-200">
                          <span className="font-medium text-gray-900 min-w-32">[{linkData.service}] {linkData.title}</span>
                          <a href={linkData.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate ml-0 sm:ml-2 mt-1 sm:mt-0">
                            {linkData.url}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanGenerator;
