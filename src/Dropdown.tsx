import { FC, ReactElement, useRef, useState } from 'react';
import { useClickOutside } from 'react-utils-jave';

interface IChildrenProps {
  isActive: boolean;
  onClose: VoidFunction;
  onOpen: VoidFunction;
  toggle: VoidFunction;
}

interface IProps {
  isAutoClose?: boolean;
  content: ((props: IChildrenProps) => ReactElement) | ReactElement;
  children: ((props: IChildrenProps) => ReactElement) | ReactElement;
}

export const Dropdown: FC<IProps> = ({
  isAutoClose = false,
  children,
  content,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    if (!isAutoClose) {
      return;
    }

    setIsActive(false);
  });

  const childrenProps: IChildrenProps = {
    isActive,
    onClose: () => setIsActive(false),
    onOpen: () => setIsActive(true),
    toggle: () => setIsActive((prev) => !prev),
  };

  const contentElement =
    typeof content === 'function' ? content(childrenProps) : content;
  const childrenElement =
    typeof children === 'function' ? children(childrenProps) : children;

  return (
    <div ref={ref}>
      {contentElement}
      {isActive && childrenElement}
    </div>
  );
};
