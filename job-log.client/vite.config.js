import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';
var baseFolder = env.APPDATA !== undefined && env.APPDATA !== ''
    ? "".concat(env.APPDATA, "/ASP.NET/https")
    : "".concat(env.HOME, "/.aspnet/https");
var certificateName = "job-log.client";
var certFilePath = path.join(baseFolder, "".concat(certificateName, ".pem"));
var keyFilePath = path.join(baseFolder, "".concat(certificateName, ".key"));
if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit', }).status) {
        throw new Error("Could not create certificate.");
    }
}
var target = env.ASPNETCORE_HTTPS_PORT ? "https://localhost:".concat(env.ASPNETCORE_HTTPS_PORT) :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7036';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '^/weatherforecast': {
                target: target,
                secure: false
            }
        },
        port: 5173,
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
    }
});
