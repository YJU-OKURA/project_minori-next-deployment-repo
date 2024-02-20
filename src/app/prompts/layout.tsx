import React, {FC, ReactNode} from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({children}: LayoutProps) => (
  <div className="flex flex-col items-center space-y-4">{children}</div>
);

export default Layout;
