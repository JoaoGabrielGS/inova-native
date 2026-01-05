"use client";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "expo-router";

const CONTENT_HEIGHT = 80;

import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import inova from "@/assets/icons/inova.png";
import { BookshelfIcon } from "../icons/bookshelf";
import { ProfileIcon } from "../icons/profile";
import { LogOutIcon } from "../icons/logout";
import useHeader from "./useHeader";
import useProfile from "@/src/_hooks/useProfile";

interface TabHeaderProps extends BottomTabHeaderProps {}

function SideMenu({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get("window");
  const menuWidth = width * 0.8;
  const position = useRef(new Animated.Value(menuWidth)).current;
  const [modalVisible, setModalVisible] = useState(isVisible);

  const { logout } = useHeader();

  const BRAND_PRIMARY_10 = "#E65100";
  const WHITE = "#FFFFFF";

  useEffect(() => {
    if (isVisible) {
      setModalVisible(true);
      Animated.timing(position, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(position, {
        toValue: menuWidth,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setModalVisible(false);
      });
    }
  }, [isVisible, menuWidth, position]);

  const handleClose = () => {
    if (isVisible) {
      onClose();
    }
  };

  if (!modalVisible) {
    return null;
  }

  const isHomeFocused = pathname === "/home";
  const isProfileFocused = pathname === "/profile";

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleClose}
    >
      <Pressable style={styles.modalBackdrop} onPress={handleClose} />
      <Animated.View
        style={[
          styles.menuContainer,
          {
            width: menuWidth,
            paddingTop: insets.top,
            transform: [{ translateX: position }],
          },
        ]}
      >
        <View className="flex-col h-full">
          <View className="flex-1">
            <TouchableOpacity
              onPress={() => router.push("/home")}
              style={styles.menuItem}
            >
              <View className="flex-row items-center gap-4">
                <BookshelfIcon
                  size={28}
                  color={isHomeFocused ? BRAND_PRIMARY_10 : WHITE}
                  isFill={isHomeFocused}
                />
                <Text
                  style={[
                    styles.menuText,
                    { color: isHomeFocused ? BRAND_PRIMARY_10 : WHITE },
                  ]}
                >
                  Meus Cursos
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/profile")}
              style={styles.menuItem}
            >
              <View className="flex-row items-center gap-4">
                <ProfileIcon
                  size={28}
                  color={isProfileFocused ? BRAND_PRIMARY_10 : WHITE}
                  isFill={isProfileFocused}
                />
                <Text
                  style={[
                    styles.menuText,
                    { color: isProfileFocused ? BRAND_PRIMARY_10 : WHITE },
                  ]}
                >
                  Conta
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => logout()} style={styles.menuItem}>
            <View className="flex-row items-center gap-4">
              <LogOutIcon size={28} color={WHITE} />
              <Text
                style={[
                  styles.menuText,
                  { color: isProfileFocused ? BRAND_PRIMARY_10 : WHITE },
                ]}
              >
                Sair
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
}

export function TabHeader({ layout }: TabHeaderProps) {
  const insets = useSafeAreaInsets();
  const totalHeaderHeight = CONTENT_HEIGHT + insets.top;
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { profileData } = useProfile();

  return (
    <>
      <View
        style={[{ height: totalHeaderHeight }, styles.headerShadow]}
        className="w-full bg-brand-grey-10"
      >
        <View
          style={{ height: CONTENT_HEIGHT, marginTop: insets.top }}
          className="flex-row items-center justify-between w-full px-6"
        >
          <View className="flex-row items-center">
            <View className="flex-1 flex-row items-center">
              <Image
                src={profileData?.avatarUrl}
                className="w-16 h-16 rounded-full border-2 border-white"
              />
              <View className="ml-3">
                <Text className="text-xl font-bold text-white">
                  {profileData?.name}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setMenuOpen(true)}>
              <Image source={inova} className="w-8 h-8 " />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <SideMenu isVisible={isMenuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  headerShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 10,

    zIndex: 99,
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
  },
  menuContainer: {
    height: "100%",
    backgroundColor: "#212121",
    padding: 20,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 2,
  },
  menuItem: {
    paddingVertical: 15,
  },
  menuText: {
    color: "white",
    fontSize: 18,
  },
});
