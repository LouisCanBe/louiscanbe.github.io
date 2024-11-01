// /* 自定义悬浮入口的位置 */
// #position_demo {
//     position: absolute;
//     right: 10px;
//     bottom: 20px;
//     z-index: 999;
// }
// <div id="position_demo"></div>
//     <!-- // /{{version}}/libs 为 Web SDK 的版本号，例如 0.1.0-beta.5。你可以在发布页面的安装代码中查看最新版本的version  -->
//     <script const src="https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/0.1.0-beta.6/libs/cn/index.js"></script>
//     <script>
//         const version = '0.1.0-beta.6';
//         const bot_id = '7425929770846371867';
//         // 自定义智能体名称和icon
//         const title = 'Xiao Wu';
//         const icon = 'https://lf-bot-studio-plugin-resource.coze.cn/obj/bot-studio-platform-plugin-tos/artist/image/7e813aa2c7e14ebb9e2d1a989acfb128.png';
//         const lang = 'zh-CN';
//         const layout = 'pc';
//         const width = 500;
        
//         new CozeWebSDK.WebChatClient({
//             config: {
//                 bot_id,
//             },
//             componentProps: {
//                 title,
//                 icon,
//                 width,
//             },
//             el: document.getElementById('position_demo'),
//         });
//     </script>
'use client'
// components/AiBot.tsx
import React, { useEffect } from 'react';
import styles from './AiBot.module.css';

interface CozeWebSDKType {
    WebChatClient: new (options: {
        config: {
            bot_id: string;
        };
        componentProps: {
            title: string;
            icon: string;
            width: number;
        };
        el: HTMLElement | null;
    }) => void;
}

const AiBot: React.FC = () => {
  useEffect(() => {
    const version = '0.1.0-beta.6';
    const bot_id = '7425929770846371867';
    const title = 'Xiao Wu';
    const icon = 'https://lf-bot-studio-plugin-resource.coze.cn/obj/bot-studio-platform-plugin-tos/artist/image/7e813aa2c7e14ebb9e2d1a989acfb128.png';
    // const lang = 'zh-CN';
    // const layout = 'pc';
    const width = 500;

    const script = document.createElement('script');
    script.src = `https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/${version}/libs/cn/index.js`;
    script.async = true;
    script.onload = () => {
      const CozeWebSDK = (window as unknown as { CozeWebSDK: CozeWebSDKType }).CozeWebSDK;
      if (typeof CozeWebSDK !== 'undefined') {
        new CozeWebSDK.WebChatClient({
          config: {
            bot_id,
          },
          componentProps: {
            title,
            icon,
            width,
          },
          el: document.getElementById('position_demo'),
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="AiBot" className={styles.AiBot}></div>
  );
};

export default AiBot;
