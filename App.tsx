// App.tsx
import React, { useEffect, useState } from "react";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  DevSettings,
} from "react-native";
import { ThemeProvider } from "styled-components/native";

// imports "tolerantes" (aceita default ou named exports)
import * as AuthModule from "./src_1/contexts/AuthContext";
import * as NavModule from "./src_1/navigation/AppNavigator";
import * as ThemeModule from "./src_1/styles/theme";

// resolve exports possíveis
const AuthProvider =
  AuthModule.AuthProvider || (({ children }: any) => <>{children}</>);
const AppNavigator =
  (NavModule as any).default || (NavModule as any).AppNavigator || (() => <Text>Nenhum AppNavigator exportado</Text>);
const theme = ThemeModule.default || (ThemeModule as any).theme || ThemeModule || { colors: { primary: "#000" } };

/* Error boundary para mostrar erro em tela em vez de branca */
class ErrorBoundary extends React.Component<any, { error: any; info: any }> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, info: null };
  }
  componentDidCatch(error: any, info: any) {
    console.error("ErrorBoundary caught:", error, info);
    this.setState({ error, info });
  }
  render() {
    if (this.state.error) {
      return (
        <View style={styles.center}>
          <Text style={{ color: "red", fontWeight: "700", marginBottom: 8 }}>🛑 Erro na UI</Text>
          <ScrollView style={{ maxHeight: 260, width: "100%" }}>
            <Text style={styles.errorText}>{String(this.state.error)}</Text>
            <Text style={styles.stackText}>{this.state.info?.componentStack}</Text>
          </ScrollView>
          <TouchableOpacity
            style={styles.reloadButton}
            onPress={() => {
              try {
                // reload no modo dev
                DevSettings.reload();
              } catch {
                // fallback: instruir a recarga manual
                console.log("Use o reload no Expo / reinicie o app.");
              }
            }}
          >
            <Text style={{ color: "#fff" }}>Recarregar (Dev)</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

/* App principal */
export default function App() {
  const [logs, setLogs] = useState<string[]>([]);
  useEffect(() => {
    // intercepta warnings/errors para mostrar em tela
    const origError = console.error;
    const origWarn = console.warn;

    console.error = (...args: any[]) => {
      try {
        setLogs((l) => [String(args.join(" ")), ...l].slice(0, 60));
      } catch {}
      origError(...args);
    };

    console.warn = (...args: any[]) => {
      try {
        setLogs((l) => [String(args.join(" ")), ...l].slice(0, 60));
      } catch {}
      origWarn(...args);
    };

    return () => {
      console.error = origError;
      console.warn = origWarn;
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <AuthProvider>
          <StatusBar barStyle="light-content" backgroundColor={theme?.colors?.primary || "#000"} />
          <View style={{ flex: 1 }}>
            {/* Cabeçalho simples para confirmar que o App está vivo */}
            <View style={styles.header}>
              <Text style={styles.headerText}>✓ App inicializado</Text>
            </View>

            {/* Se algo quebrar aqui, ErrorBoundary mostrará */}
            <View style={{ flex: 1 }}>
              <AppNavigator />
            </View>

            {/* Overlay de logs (pequeno) */}
            <View style={styles.logOverlay}>
              <ScrollView>
                {logs.slice(0, 6).map((l, i) => (
                  <Text key={i} style={styles.logText}>
                    {l}
                  </Text>
                ))}
              </ScrollView>
              <TouchableOpacity
                onPress={() => {
                  // limpa logs
                  setLogs([]);
                }}
                style={styles.clearBtn}
              >
                <Text style={{ color: "#fff", fontSize: 12 }}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </AuthProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, padding: 16, alignItems: "center", justifyContent: "center" },
  header: { height: 56, alignItems: "center", justifyContent: "center", backgroundColor: "#eee" },
  headerText: { fontWeight: "700" },
  errorText: { color: "#b00020", marginBottom: 8 },
  stackText: { color: "#333", fontSize: 12 },
  reloadButton: { marginTop: 12, backgroundColor: "#007AFF", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  logOverlay: {
    position: "absolute",
    right: 8,
    bottom: 8,
    width: 220,
    maxHeight: 160,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 8,
    borderRadius: 8,
  },
  logText: { color: "#fff", fontSize: 11, marginBottom: 4 },
  clearBtn: { position: "absolute", right: 8, top: 8, backgroundColor: "#d9534f", padding: 4, borderRadius: 4 },
});

