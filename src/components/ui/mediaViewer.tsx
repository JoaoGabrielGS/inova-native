import React from "react";
import {
  View,
  Text,
  useWindowDimensions,
  Linking,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";
import RenderHtml, {
  defaultHTMLElementModels,
  HTMLContentModel,
} from "react-native-render-html";
import YouTubePlayer from "react-native-youtube-iframe";

const customHTMLElementModels = {
  oembed: defaultHTMLElementModels.div.extend({
    contentModel: HTMLContentModel.mixed,
  }),
};

const VideoEmbed = ({
  videoUrl,
  width,
}: {
  videoUrl: string;
  width: number;
}) => {
  const isYoutube =
    videoUrl.includes("youtube") || videoUrl.includes("youtu.be");
  const getYoutubeId = (url: string) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = isYoutube
    ? getYoutubeId(videoUrl)
    : videoUrl.split("/").pop();
  if (!videoId) return null;

  const videoHeight = (width * 9) / 16;

  return (
    <View style={{ width, height: videoHeight }} className="mb-6">
      {isYoutube ? (
        <YouTubePlayer
          height={videoHeight}
          width={width}
          play={false}
          videoId={videoId}
        />
      ) : (
        <WebView
          source={{ uri: `https://player.vimeo.com/video/${videoId}` }}
          allowsFullscreenVideo
        />
      )}
    </View>
  );
};

const PDFViewer = ({
  pdfUrl,
  pdfTitle,
  height,
}: {
  pdfUrl: string;
  pdfTitle: string;
  height: number;
}) => {
  return (
    <View className="mb-10">
      <Text className="text-white font-bold text-lg mb-2 underline uppercase">
        {pdfTitle}
      </Text>
      <View
        style={{ height }}
        className="w-full rounded-lg overflow-hidden border border-gray-700"
      >
        <WebView
          originWhitelist={["*"]}
          source={{
            uri: `https://docs.google.com/viewer?embedded=true&url=${pdfUrl}`,
          }}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
};

const VideoAndPdfViewer = ({ content }: { content: string }) => {
  const { width } = useWindowDimensions();
  const contentWidth = width - 100;

  const renderers = {
    oembed: (props: any) => (
      <VideoEmbed videoUrl={props.tnode.attributes.url} width={contentWidth} />
    ),
    iframe: (props: any) => (
      <VideoEmbed videoUrl={props.tnode.attributes.src} width={contentWidth} />
    ),

    a: (props: any) => {
      const href = props.tnode.attributes.href;
      const textContent =
        props.tnode.init.domNode.children[0]?.data || "Clique aqui";

      if (href?.endsWith(".pdf")) {
        return <PDFViewer pdfUrl={href} pdfTitle={textContent} height={500} />;
      }

      return (
        <TouchableOpacity
          onPress={() => Linking.openURL(href)}
          className="mb-6"
        >
          <Text className="text-white font-bold text-lg underline uppercase">
            {textContent}
          </Text>
        </TouchableOpacity>
      );
    },
  };

  return (
    <View className="px-5 py-4">
      <RenderHtml
        contentWidth={contentWidth}
        source={{ html: content }}
        renderers={renderers}
        customHTMLElementModels={customHTMLElementModels}
        tagsStyles={{
          body: { color: "white" },
          p: {
            color: "white",
            marginBottom: 10,
            fontWeight: "bold",
            fontSize: 18,
            textTransform: "uppercase",
          },
          h2: { color: "white", fontWeight: "bold", marginBottom: 5 },
        }}
      />
    </View>
  );
};

export default VideoAndPdfViewer;
