import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ICoverAnimeType } from "@/types/animeType";
import { BlurView } from "expo-blur";
import Carousel from "react-native-reanimated-carousel/src/Carousel";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import React from "react";

const renderItem = ({ item }: { item: ICoverAnimeType }) => (
  <View
    key={item.mal_id}
    className="w-full h-full bg-white rounded-[65px] flex items-center justify-end relative overflow-hidden shadow-xl shadow-black"
  >
    <ImageBackground
      source={{ uri: item.images.jpg.large_image_url }}
      className="absolute z-0 w-full h-full"
      resizeMode="cover"
    ></ImageBackground>
    <View className="flex justify-center items-center mb-4 px-4 w-full">
      <BlurView
        intensity={70}
        tint="dark"
        style={{
          width: "100%",
          borderRadius: 65,
          overflow: "hidden",
        }}
        experimentalBlurMethod="dimezisBlurView"
      >
        <TouchableOpacity className="bg-[#1F2228]/90 px-6 py-4">
          <View className="flex flex-row items-center justify-between">
            <View>
              <Text className="text-white text-lg">{item.title}</Text>
              <Text className="text-gray-400">{item.year}</Text>
            </View>
            <TabBarIcon name="chevron-forward" className="text-white" />
          </View>
        </TouchableOpacity>
      </BlurView>
    </View>
  </View>
);

const SliderCard = ({ datas }: { datas: ICoverAnimeType[] }) => {
  const { width, height } = Dimensions.get("window");
  return (
    <View>
      <Carousel
        mode="parallax"
        width={width}
        height={height * 0.7}
        data={datas}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={renderItem}
      />
    </View>
  );
};

export default SliderCard;
