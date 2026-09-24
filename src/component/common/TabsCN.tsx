// TabsCN.tsx
import React, { ReactNode, useState } from "react";

// TabProps interface includes a disabled prop
interface TabProps {
  label: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;  // Add the disabled prop
  onChange?: any;
}

const Tab: React.FC<TabProps> = ({
  label,
  icon,
  children,
  onClick,
  disabled,  // Extract the disabled prop
  className,
  ...props
}) => {
  return (
    <div {...props} onClick={onClick} className={`p-4 ${className} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}>
      {children}
    </div>
  );
};

// TabsProps includes children as an array of Tab elements and other styling props
interface TabsProps {
  children: React.ReactElement<TabProps>[];  // Ensure TabProps includes disabled
  containerClassName?: string;
  tabListClassName?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  contentClassName?: string;
  Gap?: string;
}

const Tabs: React.FC<TabsProps> = ({
  children,
  containerClassName,
  tabListClassName,
  tabClassName,
  activeTabClassName,
  contentClassName,
  Gap,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={containerClassName}>
      <div className={tabListClassName}>
        <ul className={`flex gap-2 border-b border-gray-300 ${Gap}`}>
          {children.map((tab, index) => {
            const isDisabled = tab.props.disabled;  // Extract the disabled prop

            return (
              <li
                {...props}
                key={index}
                className={`cursor-pointer px-3 text-center transition-colors duration-300 ${
                  activeTab === index
                    ? `${activeTabClassName} `
                    : `${tabClassName} hover:text-orange-500`
                } ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}  // Apply disabled styles
                onClick={() => {
                  if (!isDisabled) {
                    setActiveTab(index);
                    if (tab.props.onClick) {
                      tab.props.onClick();
                    }
                  }
                }}
              >
                <div {...props} className="flex items-center flex-col justify-center space-x-2 p-3 w-full">
                  {tab.props.icon && <span>{tab.props.icon}</span>}
                  <span>{tab.props.label}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={contentClassName}>
        {children.map((tab, index) => (
          <div key={index} className={activeTab === index ? 'block' : 'hidden'}>
            {tab.props.children}
          </div>
        ))}
      </div>
    </div>
  );
};

export { Tabs, Tab };
