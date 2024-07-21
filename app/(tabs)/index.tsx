import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { ICoverAnimeType } from "@/types/animeType";
import SliderCard from "@/components/SliderCard";
import { useTheme } from "@react-navigation/native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeScreen() {
  const { colors } = useTheme();

  const API_URL = "https://api.jikan.moe/v4/top/anime";
  const [animeList, setAnimeList] = useState<ICoverAnimeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        setAnimeList(data.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00f" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-red-500">Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-full">
      <ScrollView className="flex-1" stickyHeaderIndices={[2]}>
        <View className="flex flex-row items-center justify-between px-4 pt-6">
          <View className="flex flex-row gap-2 items-center">
            <Image
              source={require("../../assets/images/profile.jpg")}
              className="w-10 h-10 rounded-full bg-white"
            />
            <View className="flex">
              <Text className="text-gray-400 dark:text-gray-600">marmdhn</Text>
              <View className="flex flex-row gap-2 items-center">
                <Text style={{ color: colors.text }} className="font-semibold">
                  Hey, There!
                </Text>
                <TabBarIcon
                  name="cube-outline"
                  size={18}
                  color={colors.text}
                  className="opacity-50"
                />
              </View>
            </View>
          </View>
        </View>
        <View className="px-4 mt-6">
          <Text className="text-lg text-gray-400">Explore</Text>
          <Text className="text-4xl font-bold" style={{ color: colors.text }}>
            Anime
          </Text>
        </View>
        <View className="flex flex-row justify-around bg-light dark:bg-dark pb-4 pt-6">
          <TouchableOpacity className="flex w-auto">
            <Text style={{ color: colors.text }}>Popular</Text>
            <View className="border-b-2 w-1/2 mx-auto mt-2 dark:border-white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ color: colors.text }}>Latest</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ color: colors.text }}>Recommendation</Text>
          </TouchableOpacity>
        </View>
        <View className="px-4 mt-4">
          {animeList.map((anime) => (
            <View
              key={anime.mal_id}
              className="mb-4 flex flex-row items-center"
            >
              <Image
                source={{ uri: anime.images.jpg.image_url }}
                className="w-24 h-24 rounded-lg"
              />
              <View className="flex-1 ml-4">
                <Text
                  className="text-lg font-semibold"
                  style={{ color: colors.text }}
                >
                  {anime.title}
                </Text>
                <Text className="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {/*<SliderCard datas={animeList} />*/}
      </ScrollView>
    </SafeAreaView>
  );
}
