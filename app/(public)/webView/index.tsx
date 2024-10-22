import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import WebView from "react-native-webview";

import { useAppTheme } from "@/context/theme-context";
import Appbar from "@/components/ui/appBar";

const ViewPdf = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{
    link: string | any;
  }>();

  const webViewRef = useRef<any>();

  const { Colors } = useAppTheme();

  // State untuk mengatur retry
  const [retry, setRetry] = useState(0);

  const [loading, setLoading] = useState(true); // State untuk mengatur loading
  const [error, setError] = useState(false); // State untuk mengatur error

  const uri = params.link;

  useEffect(() => {
    if (retry > 0) {
      setLoading(true);
      setError(false);
    }
  }, [retry]);

  if (!params.link) return router.back();

  return (
    <View style={styles.container}>
      <Appbar backIconPress={() => router.back()} title={""} />
      {loading && !error && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}
      {error && <Text style={styles.errorText}>Failed to load</Text>}
      <WebView
        ref={webViewRef}
        source={{ uri }}
        style={{ flex: 1 }}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        renderError={() => (
          <View style={[styles.container, { marginHorizontal: 20, gap: 20 }]}>
            <Text style={styles.errorText}>
              Gagal memuat situs. Silakan coba lagi.
            </Text>
            <Button title="Retry" onPress={() => setRetry(retry + 1)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default ViewPdf;
