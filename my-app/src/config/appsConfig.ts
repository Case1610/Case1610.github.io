import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Created from '../pages/Created/Created';
import Grouper from '../pages/Created/Grouper/Grouper';
import SocialStyle from '../pages/Created/SocialStyle/SocialStyle';

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
    image: "/image/app-image/home.jpg",
  },
  {
    path: "/about",
    name: "About",
    component: About,
    description: "メンバーをグループにするアプリです",
    image: "/image/app-image/grouper.jpg",
  },
  {
    path: "/created",
    name: "Created",
    component: Created,
    description: "ツール集",
    image: "/images/app-image/grouper.jpg",
  },
  {
    path: "/grouper",
    name: "Grouper",
    component: Grouper,
    description: "メンバーをグループにするアプリです",
    image: "/image/app-image/grouper.jpg",
  },
  {
    path: "/socialstyle",
    name: "Social Style",
    component: SocialStyle,
    description: "ソーシャルスタイル診断ツール",
    image: "/images/app-image/grouper.jpg",
  },
];

export default appsConfig;
