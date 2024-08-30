import Home from '../pages/Home';
import GroupingApp from '../pages/Grouper/Grouper';

interface AppConfig {
  path: string;
  name: string;
  component: React.FC;
  description: string;  // 説明を追加
  image: string;  // 画像のURLを追加
}

const appsConfig: AppConfig[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
    description: "This is the home page.",
    image: "/image/home.jpg",
  },
  {
    path: "/grouper",
    name: "Grouper",
    component: GroupingApp,
    description: "メンバーをグループにするアプリです",
    image: "/image/grouper.jpg",
  },
  {
    path: "/socialstyle",
    name: "Social Style",
    component: () => {
      window.location.href = '/socialstyle/index.html';
      return null;
    },
    description: "ソーシャルスタイル診断ツール",
    image: "/images/grouper.jpg",
  },
  // 他のアプリケーションも同様に追加
];

export default appsConfig;
