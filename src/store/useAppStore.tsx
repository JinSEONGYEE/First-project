import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { DesignLink, TaskPlan } from '../types';

interface AppContextType {
  links: DesignLink[];
  plans: TaskPlan[];
  addLink: (link: Omit<DesignLink, 'id'>) => void;
  removeLink: (id: string) => void;
  addPlan: (plan: Omit<TaskPlan, 'id' | 'status'>) => void;
  updatePlanStatus: (id: string, status: TaskPlan['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [links, setLinks] = useState<DesignLink[]>([]);
  const [plans, setPlans] = useState<TaskPlan[]>([]);

  const addLink = (link: Omit<DesignLink, 'id'>) => {
    const newLink = { ...link, id: crypto.randomUUID() };
    setLinks((prev) => [...prev, newLink]);
  };

  const removeLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const addPlan = (plan: Omit<TaskPlan, 'id' | 'status'>) => {
    const newPlan: TaskPlan = { ...plan, id: crypto.randomUUID(), status: 'pending' };
    setPlans((prev) => [...prev, newPlan]);
  };

  const updatePlanStatus = (id: string, status: TaskPlan['status']) => {
    setPlans((prev) =>
      prev.map((plan) => (plan.id === id ? { ...plan, status } : plan))
    );
  };

  return (
    <AppContext.Provider
      value={{ links, plans, addLink, removeLink, addPlan, updatePlanStatus }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppStore = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};
