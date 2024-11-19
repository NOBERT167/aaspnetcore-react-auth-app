// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/Admin/source/repos/ReactApp1/reactapp1.client/node_modules/vite/dist/node/index.js";
import plugin from "file:///C:/Users/Admin/source/repos/ReactApp1/reactapp1.client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import fs from "fs";
import path from "path";
import child_process from "child_process";
import { env } from "process";
var __vite_injected_original_import_meta_url = "file:///C:/Users/Admin/source/repos/ReactApp1/reactapp1.client/vite.config.ts";
var baseFolder = env.APPDATA !== void 0 && env.APPDATA !== "" ? `${env.APPDATA}/ASP.NET/https` : `${env.HOME}/.aspnet/https`;
if (!fs.existsSync(baseFolder)) {
  fs.mkdirSync(baseFolder, { recursive: true });
}
var certificateName = "reactapp1.client";
var certFilePath = path.join(baseFolder, `${certificateName}.pem`);
var keyFilePath = path.join(baseFolder, `${certificateName}.key`);
try {
  if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    const result = child_process.spawnSync("dotnet", [
      "dev-certs",
      "https",
      "--export-path",
      certFilePath,
      "--format",
      "Pem",
      "--no-password"
    ], { stdio: "inherit" });
    if (result.status !== 0) {
      console.error("Error creating certificate:", result.error);
      throw new Error("Failed to create HTTPS certificate.");
    }
  }
} catch (err) {
  console.error("Certificate creation error:", err);
  process.exit(1);
}
var target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` : env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(";")[0] : "https://localhost:7281";
var vite_config_default = defineConfig({
  plugins: [plugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    proxy: {
      "^/weatherforecast": {
        target,
        secure: false
      },
      "^/pingauth": {
        target: "https://localhost:7281/",
        secure: false
      },
      "^/register": {
        target: "https://localhost:7281/",
        secure: false
      },
      "^/login": {
        target: "https://localhost:7281/",
        secure: false
      },
      "^/logout": {
        target: "https://localhost:7281/",
        secure: false
      }
    },
    port: 5173,
    https: fs.existsSync(certFilePath) && fs.existsSync(keyFilePath) ? {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath)
    } : void 0
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pblxcXFxzb3VyY2VcXFxccmVwb3NcXFxcUmVhY3RBcHAxXFxcXHJlYWN0YXBwMS5jbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEFkbWluXFxcXHNvdXJjZVxcXFxyZXBvc1xcXFxSZWFjdEFwcDFcXFxccmVhY3RhcHAxLmNsaWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvQWRtaW4vc291cmNlL3JlcG9zL1JlYWN0QXBwMS9yZWFjdGFwcDEuY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHBsdWdpbiBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgY2hpbGRfcHJvY2VzcyBmcm9tICdjaGlsZF9wcm9jZXNzJztcclxuaW1wb3J0IHsgZW52IH0gZnJvbSAncHJvY2Vzcyc7XHJcblxyXG5jb25zdCBiYXNlRm9sZGVyID1cclxuICAgIGVudi5BUFBEQVRBICE9PSB1bmRlZmluZWQgJiYgZW52LkFQUERBVEEgIT09ICcnXHJcbiAgICAgICAgPyBgJHtlbnYuQVBQREFUQX0vQVNQLk5FVC9odHRwc2BcclxuICAgICAgICA6IGAke2Vudi5IT01FfS8uYXNwbmV0L2h0dHBzYDtcclxuXHJcbi8vIEVuc3VyZSB0aGUgY2VydGlmaWNhdGUgZGlyZWN0b3J5IGV4aXN0c1xyXG5pZiAoIWZzLmV4aXN0c1N5bmMoYmFzZUZvbGRlcikpIHtcclxuICAgIGZzLm1rZGlyU3luYyhiYXNlRm9sZGVyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcclxufVxyXG5cclxuY29uc3QgY2VydGlmaWNhdGVOYW1lID0gXCJyZWFjdGFwcDEuY2xpZW50XCI7XHJcbmNvbnN0IGNlcnRGaWxlUGF0aCA9IHBhdGguam9pbihiYXNlRm9sZGVyLCBgJHtjZXJ0aWZpY2F0ZU5hbWV9LnBlbWApO1xyXG5jb25zdCBrZXlGaWxlUGF0aCA9IHBhdGguam9pbihiYXNlRm9sZGVyLCBgJHtjZXJ0aWZpY2F0ZU5hbWV9LmtleWApO1xyXG5cclxudHJ5IHtcclxuICAgIGlmICghZnMuZXhpc3RzU3luYyhjZXJ0RmlsZVBhdGgpIHx8ICFmcy5leGlzdHNTeW5jKGtleUZpbGVQYXRoKSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGNoaWxkX3Byb2Nlc3Muc3Bhd25TeW5jKCdkb3RuZXQnLCBbXHJcbiAgICAgICAgICAgICdkZXYtY2VydHMnLFxyXG4gICAgICAgICAgICAnaHR0cHMnLFxyXG4gICAgICAgICAgICAnLS1leHBvcnQtcGF0aCcsXHJcbiAgICAgICAgICAgIGNlcnRGaWxlUGF0aCxcclxuICAgICAgICAgICAgJy0tZm9ybWF0JyxcclxuICAgICAgICAgICAgJ1BlbScsXHJcbiAgICAgICAgICAgICctLW5vLXBhc3N3b3JkJyxcclxuICAgICAgICBdLCB7IHN0ZGlvOiAnaW5oZXJpdCcsIH0pO1xyXG5cclxuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyAhPT0gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjcmVhdGluZyBjZXJ0aWZpY2F0ZTonLCByZXN1bHQuZXJyb3IpO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gY3JlYXRlIEhUVFBTIGNlcnRpZmljYXRlLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0gY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5lcnJvcignQ2VydGlmaWNhdGUgY3JlYXRpb24gZXJyb3I6JywgZXJyKTtcclxuICAgIHByb2Nlc3MuZXhpdCgxKTtcclxufVxyXG5cclxuY29uc3QgdGFyZ2V0ID0gZW52LkFTUE5FVENPUkVfSFRUUFNfUE9SVCA/IGBodHRwczovL2xvY2FsaG9zdDoke2Vudi5BU1BORVRDT1JFX0hUVFBTX1BPUlR9YCA6XHJcbiAgICBlbnYuQVNQTkVUQ09SRV9VUkxTID8gZW52LkFTUE5FVENPUkVfVVJMUy5zcGxpdCgnOycpWzBdIDogJ2h0dHBzOi8vbG9jYWxob3N0OjcyODEnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIHBsdWdpbnM6IFtwbHVnaW4oKV0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgYWxpYXM6IHtcclxuICAgICAgICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgICAgICdeL3dlYXRoZXJmb3JlY2FzdCc6IHtcclxuICAgICAgICAgICAgICAgIHRhcmdldCxcclxuICAgICAgICAgICAgICAgIHNlY3VyZTogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJ14vcGluZ2F1dGgnOiB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IFwiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI4MS9cIixcclxuICAgICAgICAgICAgICAgIHNlY3VyZTogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJ14vcmVnaXN0ZXInOiB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IFwiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI4MS9cIixcclxuICAgICAgICAgICAgICAgIHNlY3VyZTogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJ14vbG9naW4nOiB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IFwiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI4MS9cIixcclxuICAgICAgICAgICAgICAgIHNlY3VyZTogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJ14vbG9nb3V0Jzoge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiBcImh0dHBzOi8vbG9jYWxob3N0OjcyODEvXCIsXHJcbiAgICAgICAgICAgICAgICBzZWN1cmU6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHBvcnQ6IDUxNzMsXHJcbiAgICAgICAgaHR0cHM6IGZzLmV4aXN0c1N5bmMoY2VydEZpbGVQYXRoKSAmJiBmcy5leGlzdHNTeW5jKGtleUZpbGVQYXRoKSA/IHtcclxuICAgICAgICAgICAga2V5OiBmcy5yZWFkRmlsZVN5bmMoa2V5RmlsZVBhdGgpLFxyXG4gICAgICAgICAgICBjZXJ0OiBmcy5yZWFkRmlsZVN5bmMoY2VydEZpbGVQYXRoKSxcclxuICAgICAgICB9IDogdW5kZWZpbmVkXHJcbiAgICB9XHJcbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrVyxTQUFTLGVBQWUsV0FBVztBQUNyWSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFlBQVk7QUFDbkIsT0FBTyxRQUFRO0FBQ2YsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sbUJBQW1CO0FBQzFCLFNBQVMsV0FBVztBQU42TSxJQUFNLDJDQUEyQztBQVFsUixJQUFNLGFBQ0YsSUFBSSxZQUFZLFVBQWEsSUFBSSxZQUFZLEtBQ3ZDLEdBQUcsSUFBSSxPQUFPLG1CQUNkLEdBQUcsSUFBSSxJQUFJO0FBR3JCLElBQUksQ0FBQyxHQUFHLFdBQVcsVUFBVSxHQUFHO0FBQzVCLEtBQUcsVUFBVSxZQUFZLEVBQUUsV0FBVyxLQUFLLENBQUM7QUFDaEQ7QUFFQSxJQUFNLGtCQUFrQjtBQUN4QixJQUFNLGVBQWUsS0FBSyxLQUFLLFlBQVksR0FBRyxlQUFlLE1BQU07QUFDbkUsSUFBTSxjQUFjLEtBQUssS0FBSyxZQUFZLEdBQUcsZUFBZSxNQUFNO0FBRWxFLElBQUk7QUFDQSxNQUFJLENBQUMsR0FBRyxXQUFXLFlBQVksS0FBSyxDQUFDLEdBQUcsV0FBVyxXQUFXLEdBQUc7QUFDN0QsVUFBTSxTQUFTLGNBQWMsVUFBVSxVQUFVO0FBQUEsTUFDN0M7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNKLEdBQUcsRUFBRSxPQUFPLFVBQVcsQ0FBQztBQUV4QixRQUFJLE9BQU8sV0FBVyxHQUFHO0FBQ3JCLGNBQVEsTUFBTSwrQkFBK0IsT0FBTyxLQUFLO0FBQ3pELFlBQU0sSUFBSSxNQUFNLHFDQUFxQztBQUFBLElBQ3pEO0FBQUEsRUFDSjtBQUNKLFNBQVMsS0FBSztBQUNWLFVBQVEsTUFBTSwrQkFBK0IsR0FBRztBQUNoRCxVQUFRLEtBQUssQ0FBQztBQUNsQjtBQUVBLElBQU0sU0FBUyxJQUFJLHdCQUF3QixxQkFBcUIsSUFBSSxxQkFBcUIsS0FDckYsSUFBSSxrQkFBa0IsSUFBSSxnQkFBZ0IsTUFBTSxHQUFHLEVBQUUsQ0FBQyxJQUFJO0FBRTlELElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVMsQ0FBQyxPQUFPLENBQUM7QUFBQSxFQUNsQixTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3hEO0FBQUEsRUFDSjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ0osT0FBTztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDakI7QUFBQSxRQUNBLFFBQVE7QUFBQSxNQUNaO0FBQUEsTUFDQSxjQUFjO0FBQUEsUUFDVixRQUFRO0FBQUEsUUFDUixRQUFRO0FBQUEsTUFDWjtBQUFBLE1BQ0EsY0FBYztBQUFBLFFBQ1YsUUFBUTtBQUFBLFFBQ1IsUUFBUTtBQUFBLE1BQ1o7QUFBQSxNQUNBLFdBQVc7QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLFFBQVE7QUFBQSxNQUNaO0FBQUEsTUFDQSxZQUFZO0FBQUEsUUFDUixRQUFRO0FBQUEsUUFDUixRQUFRO0FBQUEsTUFDWjtBQUFBLElBQ0o7QUFBQSxJQUNBLE1BQU07QUFBQSxJQUNOLE9BQU8sR0FBRyxXQUFXLFlBQVksS0FBSyxHQUFHLFdBQVcsV0FBVyxJQUFJO0FBQUEsTUFDL0QsS0FBSyxHQUFHLGFBQWEsV0FBVztBQUFBLE1BQ2hDLE1BQU0sR0FBRyxhQUFhLFlBQVk7QUFBQSxJQUN0QyxJQUFJO0FBQUEsRUFDUjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
