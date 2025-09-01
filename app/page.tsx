"use client";
import JigsawGame from "./JigsawGame";

export default function Home() {

  return (
    <div className="w-full h-[100vh] bg-[url('https://media.discordapp.net/attachments/1360666377878372432/1411441434300776488/image.png?ex=68b6a505&is=68b55385&hm=5a79848db22da586465e86f4057659f10620bb4b9e6621ff52ef6b1140e33e4c&=&format=webp&quality=lossless&width=1152&height=768')] bg-cover bg-center">
      <JigsawGame />
    </div>
  );
}