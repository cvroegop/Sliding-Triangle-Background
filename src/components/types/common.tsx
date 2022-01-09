export interface Component {
    _id: string;
    name: string;
    menuName: string;
    title: string;
    paragraph: string;
};

export interface BackgroundProps {
    triangleColor: string;
    movingBackgroundColor: string;
    staticBackgroundColor: string;
}

export interface SwipeIndicatorProps {
    pageIndex: number;
    componentsLength: number;
  }
