export interface Component {
  _id: string;
  name: string;
  menuName: string;
  title: string;
  paragraph: string;
}
export interface DynamicComponentProps {
  className: string
  pageIndex: number;
  delay: number;
  components: Component[];
}
export interface BackgroundProps2 {
  index: number;
  prevIndex: number;
  setPrevIndex: (index: number) => void;
  forwardDirection: boolean;
}
export interface BackgroundProps {
  triangleColor: string;
  movingBackgroundColor: string;
  staticBackgroundColor: string;
}
export interface MenuItemsProps {
  components: Component[];
  pageIndex: number;
  setPageIndex: (index: number) => void;
};
export interface SwipeIndicatorProps {
  pageIndex: number;
  componentsLength: number;
}
