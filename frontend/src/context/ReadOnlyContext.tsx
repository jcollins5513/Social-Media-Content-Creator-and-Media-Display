import React, { createContext, useContext, ReactNode } from 'react';

interface ReadOnlyContextType {
  isReadOnly: boolean;
}

const ReadOnlyContext = createContext<ReadOnlyContextType>({ isReadOnly: true });

export const ReadOnlyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // In a real app, this could be determined by an API call or environment variable
  const isReadOnly = true;

  return (
    <ReadOnlyContext.Provider value={{ isReadOnly }}>
      {children}
    </ReadOnlyContext.Provider>
  );
};

export const useReadOnly = (): ReadOnlyContextType => {
  const context = useContext(ReadOnlyContext);
  if (context === undefined) {
    throw new Error('useReadOnly must be used within a ReadOnlyProvider');
  }
  return context;
};

// Helper component to conditionally render content based on read-only mode
type ReadOnlyProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export const ReadOnly: React.FC<ReadOnlyProps> = ({ children, fallback = null }) => {
  const { isReadOnly } = useReadOnly();
  return isReadOnly ? <>{fallback}</> : <>{children}</>;
};

export const Editable: React.FC<ReadOnlyProps> = ({ children, fallback = null }) => {
  const { isReadOnly } = useReadOnly();
  return isReadOnly ? <>{fallback}</> : <>{children}</>;
};
