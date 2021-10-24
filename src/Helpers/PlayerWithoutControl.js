import * as React from "react";
import { View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Audio } from "expo-av";

export default function AudioPLayer({ mp3, is_system, success, failure }) {
  // console.log(success, failure);
  const [Loaded, SetLoaded] = React.useState(false);
  const [Loading, SetLoading] = React.useState(false);

  const [isPlaying, SetIsPlaying] = React.useState(false);
  const [didJustFinish, setDidJustFinish] = React.useState(false);

  const sound = React.useRef(new Audio.Sound());

  const onPlaybackStatusUpdate = audio => {
    if (audio) {
      if (audio.didJustFinish) {
        setDidJustFinish(true);
        SetIsPlaying(false);
      }
    }
  };

  React.useEffect(() => {
    if (is_system) {
      // console.log("system");
      LoadAudioSystem();
    }
    if (!is_system) {
      // console.log("web");
      LoadAudioWeb();
    }

    sound.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    return () => Unload();
  }, [mp3]);

  const Unload = async () => {
    await sound.current.unloadAsync();
  };

  const LoadAudioSystem = async () => {
    SetLoaded(false);
    SetLoading(true);

    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = success
          ? await sound.current.loadAsync(
              require("../../assets/sounds/success.wav")
            )
          : await sound.current.loadAsync(
              require("../../assets/sounds/failure.wav")
            );

        if (result.isLoaded === false) {
          SetLoading(false);
          console.log("Error in Loading Audio");
        } else {
          SetLoading(false);
          PlayAudio();
          SetLoaded(true);
        }
      } catch (error) {
        console.log(error);
        SetLoading(false);
      }
    } else {
      SetLoading(false);
    }
  };

  const LoadAudioWeb = async () => {
    SetLoaded(false);
    SetLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync({
          uri: mp3
        });
        if (result.isLoaded === false) {
          SetLoading(false);
          console.log("Error in Loading Audio");
        } else {
          SetLoading(false);
          PlayAudio();
          SetLoaded(true);
        }
      } catch (error) {
        console.log(error);
        SetLoading(false);
      }
    } else {
      SetLoading(false);
    }
  };

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          SetIsPlaying(true);
          sound.current.playAsync();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <></>;
}
