"use client";

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import { MessageSquare } from "lucide-react-native";
import { FeedbackButton } from "./feedback-button";
import StarRating from "./star-rating";
import { useCourseFeedBack } from "@/src/_hooks/useCourseFeedback";

interface FeedbackDialogProps {
  courseId: number;
  feedback: any | undefined;
  isLoading?: boolean;
  enrollmentId?: number;
}

export const FeedbackDialog = ({
  courseId,
  feedback,
  isLoading,
  enrollmentId,
}: FeedbackDialogProps) => {
  const [rating, setRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    handleSubmitFeedback,
    setValue,
    errors,
    feedbackstars,
    successResult,
    errorResult,
    isLoadingSave,
  } = useCourseFeedBack(rating, courseId, enrollmentId);

  useEffect(() => {
    if (feedback) {
      setRating(Number(feedbackstars?.rating ?? 0));
    }
  }, [feedback]);

  if (isLoading) {
    return <View className="h-9 w-80 bg-gray-200 animate-pulse rounded-md" />;
  }

  return (
    <View>
      <FeedbackButton rating={rating} onPress={() => setModalVisible(true)} />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-center items-center bg-black/50"
        >
          <View className="w-[90%] bg-brand-grey-8 rounded-2xl p-6 shadow-xl">
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="mb-4 flex-row justify-center w-full">
                <StarRating
                  rating={rating}
                  onRatingChange={(val) => setRating(val)}
                  feedback={feedback}
                  hasRating={(feedbackstars?.rating ?? 0) > 0}
                />
              </View>

              <View className="relative w-full mb-4">
                <View className="absolute left-3 top-4 z-10">
                  <MessageSquare size={18} color="#FFF" />
                </View>

                <TextInput
                  multiline
                  numberOfLines={4}
                  placeholder="Deixe um comentário (opcional)"
                  placeholderTextColor="#FFF"
                  defaultValue={feedback ? feedback.comment : ""}
                  onChangeText={(text) => setValue("comment", text)}
                  editable={!feedback}
                  textAlignVertical="top"
                  className={`w-full h-40 border border-gray-200 rounded-lg pl-10 pr-4 pt-3 text-base text-white bg-transparent}`}
                />
              </View>

              {errorResult ? (
                <Text className="text-red-500 text-center mb-2">
                  {errorResult}
                </Text>
              ) : null}
              {successResult ? (
                <Text className="text-brand-success-6 font-bold text-center mb-2">
                  {successResult}
                </Text>
              ) : null}
              {errors.comment?.message && (
                <Text className="text-red-400 text-xs mb-2">
                  {errors.comment.message as string}
                </Text>
              )}

              {!feedback && (
                <TouchableOpacity
                  disabled={
                    isLoadingSave || successResult.length > 0 || rating === 0
                  }
                  onPress={handleSubmitFeedback}
                  className={`w-full p-4 rounded-xl items-center justify-center ${
                    isLoadingSave || rating === 0
                      ? "bg-gray-400"
                      : "bg-brand-primary-9"
                  }`}
                >
                  {isLoadingSave ? (
                    <ActivityIndicator color="#E65100" />
                  ) : (
                    <Text className="text-white font-bold text-lg">
                      Enviar Minha Avaliação
                    </Text>
                  )}
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="mt-4 items-center"
              >
                <Text className="text-white font-medium">Fechar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};
